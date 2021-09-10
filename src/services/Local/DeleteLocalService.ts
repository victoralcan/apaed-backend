import { getCustomRepository } from 'typeorm';
import LocalsRepository from '../../repositories/LocalsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteLocalService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const localsRepository = getCustomRepository(LocalsRepository);
    await localsRepository.delete({
      id,
    });
  }
}

export default DeleteLocalService;
