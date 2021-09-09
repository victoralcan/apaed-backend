import { EntityRepository, Repository } from 'typeorm';

import Transfer from '../models/Transfer';

@EntityRepository(Transfer)
class TransfersRepository extends Repository<Transfer> {}

export default TransfersRepository;
