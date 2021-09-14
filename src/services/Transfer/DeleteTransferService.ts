import { getCustomRepository } from 'typeorm';
import TransferRepository from '../../repositories/TransferRepository';

interface IRequestDTO {
  id: string;
}

class DeleteTransferService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const transferRepository = getCustomRepository(TransferRepository);
    await transferRepository.delete({
      id,
    });
  }
}

export default DeleteTransferService;
