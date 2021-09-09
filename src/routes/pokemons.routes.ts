import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import RolesRepository from '../repositories/RolesRepository';

import CreatePokemonService from '../services/CreatePokemonService';

const pokemonsRouter = Router();

pokemonsRouter.get('/:name', async (request, response) => {
  const { name } = request.params;
  const pokemonsRepository = getCustomRepository(RolesRepository);
  const pokemonOnCache = await pokemonsRepository.findOne({
    where: { name },
  });

  if (!pokemonOnCache) {
    const createPokemon = new CreatePokemonService();
    const newPokemon = await createPokemon.execute({ name });
    if (!newPokemon) {
      return response.status(404).json({ error: 'Role does not exists' });
    }
    return response.json(newPokemon);
  }

  return response.json(pokemonOnCache);
});

export default pokemonsRouter;
