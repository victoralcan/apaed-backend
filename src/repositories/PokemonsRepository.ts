import { EntityRepository, Repository } from 'typeorm';

import Role from '../models/Role';

@EntityRepository(Role)
class PokemonsRepository extends Repository<Role> {}

export default PokemonsRepository;
