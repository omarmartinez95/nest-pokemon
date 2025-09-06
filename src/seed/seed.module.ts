import { CommonModule } from '../common/common.module';

import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokedexModule } from 'src/pokedex/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokedexModule, CommonModule]
})
export class SeedModule {}
