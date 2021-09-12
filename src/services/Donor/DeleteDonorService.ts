import { getCustomRepository } from 'typeorm';
import DonorsRepository from '../../repositories/DonorsRepository';

interface IRequestDTO {
  id: string;
}

class DeleteDonorService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const donorsRepository = getCustomRepository(DonorsRepository);
    await donorsRepository.delete({
      id,
    });
  }
}

export default DeleteDonorService;
