import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokedexController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokedexController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [
        {
          name: Pokemon.name,
          schema: PokemonSchema
        }
      ]
    )
  ],
  exports: [MongooseModule]
})
export class PokedexModule {}
