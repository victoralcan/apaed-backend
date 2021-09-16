import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import {
  cadastroSchema,
  updateSchema,
} from '../schemas/productLocalDonationSchema';

import ProductLocalDonationRepository from '../repositories/ProductLocalDonationRepository';
import CreateProductLocalDonationService from '../services/ProductLocalDonation/CreateProductLocalDonationService';
import DeleteProductLocalDonationService from '../services/ProductLocalDonation/DeleteProductLocalDonationService';
import UpdateProductLocalDonationService from '../services/ProductLocalDonation/UpdateProductLocalDonationService';

const productLocalDonationRouter = Router();

productLocalDonationRouter.get('/', async (request, response) => {
  const productLocalDonationRepository = getCustomRepository(
    ProductLocalDonationRepository,
  );

  // const productLocalDonation = await productLocalDonationRepository
  //   .createQueryBuilder('pld')
  //   .leftJoinAndSelect('pld.product', 'p', 'pld.product_id = p.id')
  //   .leftJoinAndSelect('p.ncm', 'ncm', 'p.ncm_id = ncm.id')
  //   .leftJoinAndSelect(
  //     'ncm.unity_measurement',
  //     'um',
  //     'ncm.unity_measurement_id = um.id',
  //   )
  //   .addGroupBy('product_id')
  //   .addGroupBy('expiration_date')
  //   .addGroupBy('pld.id')
  //   .addGroupBy('p.id')
  //   .addGroupBy('ncm.id')
  //   .addGroupBy('um.id')
  //   .getMany();
  //
  const productLocalDonation = await productLocalDonationRepository.query(
    'select count(*), MIN(pld.id) as id, n.ncm_code, expiration_date, p.name, p.brand, product_id, um.unity_measurement' +
      ' from product_local_donation pld' +
      ' left outer join product p on pld.product_id = p.id' +
      ' left outer join ncm n on p.ncm_id = n.id' +
      ' left outer join units_measure um on n.unity_measurement_id = um.id' +
      ' where local_id = $1' +
      'group by product_id, expiration_date, n.ncm_code, p.name, p.brand, um.unity_measurement;',
    // @ts-ignore
    [request.localId],
  );

  const productLocalDonationWithTotalAmount = await Promise.all(
    // @ts-ignore
    productLocalDonation.map(async product => {
      const count = await productLocalDonationRepository
        .createQueryBuilder('product_local_donation')
        .where(
          'product_local_donation.local_id = :local_id',
          // @ts-ignore
          { local_id: request.localId },
        )
        .andWhere('product_local_donation.product_id = :product_id', {
          product_id: product.product_id,
        })
        .groupBy('product_id')
        .getCount();
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      product.totalAmount = count;
      return product;
    }),
  );

  return response.json(productLocalDonationWithTotalAmount);
});

productLocalDonationRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const productLocalDonationRepository = getCustomRepository(
    ProductLocalDonationRepository,
  );
  const productLocalDonation = await productLocalDonationRepository.findOne({
    where: { id },
  });

  if (!productLocalDonation) {
    return response
      .status(404)
      .json({ error: 'ProductLocalDonation does not exists' });
  }
  return response.json(productLocalDonation);
});

productLocalDonationRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;
  const {
    product_id,
    expiration_date,
    donation_id,
    amount,
    active,
  } = request.body;

  const createProductLocalDonation = new CreateProductLocalDonationService();

  try {
    for (let i = 0; i < amount; i++) {
      const productLocalDonation = await createProductLocalDonation.execute({
        local_id: localId,
        product_id,
        expiration_date,
        donation_id,
        active,
      });
      if (!productLocalDonation)
        return response
          .status(500)
          .json({ error: 'An error ocurred. Please try again!' });
    }
  } catch (e) {
    console.log(e);
    throw new Error();
  }

  return response.json({ message: 'Products added successfully!' });
});

productLocalDonationRouter.put('/', async (request, response) => {
  if (!(await updateSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  // @ts-ignore
  const { localId } = request;
  const { id, product_id, expiration_date, donation_id, active } = request.body;

  const productLocalDonationToUpdate = {
    id,
    product_id,
    expiration_date,
    donation_id,
    active,
    local_id: localId,
  };

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }

  const updateProductLocalDonation = new UpdateProductLocalDonationService();
  const updatedProductLocalDonation = await updateProductLocalDonation.execute(
    productLocalDonationToUpdate,
  );

  if (!updatedProductLocalDonation) {
    return response
      .status(500)
      .json({ error: 'Something went wrong. Please try again' });
  }

  return response.json(updatedProductLocalDonation);
});

productLocalDonationRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const deleteProductLocalDonation = new DeleteProductLocalDonationService();
  await deleteProductLocalDonation.execute({ id });

  return response.status(204).send();
});

export default productLocalDonationRouter;
