import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { Pokemon } from './../pokedex/entities/pokemon.entity';
import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/seed.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class SeedService {


  


  constructor(
    // Para inyectar el modelo de mongoose
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,

        private readonly http: AxiosAdapter
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

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
