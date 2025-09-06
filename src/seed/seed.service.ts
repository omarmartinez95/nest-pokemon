import { Pokemon } from './../pokedex/entities/pokemon.entity';
import { Injectable } from '@nestjs/common';
import  axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/seed.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios;


  constructor(
    // Para inyectar el modelo de mongoose
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany();
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert:{name:string, no:number}[] = [];
    
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      // await this.pokemonService.create({name, no});
      pokemonToInsert.push({name, no});
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    const pokemon = data.results;
    return pokemon;
  }
}
