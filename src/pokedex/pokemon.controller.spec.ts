import { Test, TestingModule } from '@nestjs/testing';
import { PokedexController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokedexController', () => {
  let controller: PokedexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [PokemonService],
    }).compile();

    controller = module.get<PokedexController>(PokedexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
