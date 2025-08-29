import { Module } from '@nestjs/common';
import { PokedexModule } from './pokedex/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    PokedexModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
