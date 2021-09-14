import { getCustomRepository } from 'typeorm';
import TransferRepository from '../../repositories/TransferRepository';
import Transfer from '../../models/Transfer';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';

interface IRequestDTO {
  origin_id: string;
  destiny_id: string;
  product_id: string;
  description: string;
  expiration_date: string;
  active: boolean;
}

class CreateTransferService {
  public async execute({
    origin_id,
    description,
    destiny_id,
    product_id,
    active,
    expiration_date,
  }: IRequestDTO): Promise<Transfer[] | undefined> {
    const transfersRepository = getCustomRepository(TransferRepository);
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );

    const transfers: Transfer[] = [];

    try {
      const productsToTransfer = await productLocalDonationRepository.find({
        where: {
          local_id: origin_id,
          expiration_date,
          product_id,
        },
      });
      for (const productToTransfer of productsToTransfer) {
        const newTransfer = transfersRepository.create({
          origin_id,
          description,
          destiny_id,
          product_local_donation_id: productToTransfer.id,
          active,
        });
        await transfersRepository.save(newTransfer);
        await productLocalDonationRepository.update(
          {
            id: productToTransfer.id,
          },
          {
            local_id: destiny_id,
          },
        );
        transfers.push(newTransfer);
      }
    } catch (e) {
      return undefined;
    }
    return transfers;
  }
}

export default CreateTransferService;