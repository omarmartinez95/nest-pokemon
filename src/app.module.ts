import { Module } from '@nestjs/common';
import { PokedexModule } from './pokedex/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    PokedexModule,
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
