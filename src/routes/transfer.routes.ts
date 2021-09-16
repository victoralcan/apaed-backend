import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema } from '../schemas/transferSchema';

import TransferRepository from '../repositories/TransferRepository';
import CreateTransferService from '../services/Transfer/CreateTransferService';
import DeleteTransferService from '../services/Transfer/DeleteTransferService';

const transferRouter = Router();

transferRouter.get('/', async (request, response) => {
  const transferRepository = getCustomRepository(TransferRepository);
  const transfer = await transferRepository.find();

  return response.json(transfer);
});

transferRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const transferRepository = getCustomRepository(TransferRepository);
  const transfer = await transferRepository.findOne({
    where: { id },
  });

  if (!transfer) {
    return response.status(404).json({ error: 'Transfer does not exists' });
  }
  return response.json(transfer);
});

transferRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;

  const {
    destiny_id,
    product_id,
    description,
    amount,
    active,
    expiration_date,
  } = request.body;

  const createTransfer = new CreateTransferService();

  try {
    const transfers = await createTransfer.execute({
      origin_id: localId,
      destiny_id,
      product_id,
      description,
      active,
      expiration_date,
      amount,
    });
    if (!transfers || transfers.length === 0)
      return response
        .status(500)
        .json({ error: 'An error ocurred. Please try again!' });
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  return response.json({ message: 'Transaction added successfully!' });
});

transferRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteTransfer = new DeleteTransferService();
  await deleteTransfer.execute({ id });

  return response.status(204).send();
});

export default transferRouter;
