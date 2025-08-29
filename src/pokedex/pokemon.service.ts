import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PokemonService {

  constructor(

    // Para inyectar el modelo de mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>


  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {

      this.handleExceptions(error);

    }
  }

  findAll() {
    return `This action returns all pokedex`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      // Buscar por numero
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      // Buscar por MongoID 
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      // Buscar por nombre
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase() });
    }

    // Busqueda fallida
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`)


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    try {
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      await pokemon.updateOne(updatePokemonDto); // Actualiza el pokemon


      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }


  }

  async remove(id: string) {
    // await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return;
  }


  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }


}
