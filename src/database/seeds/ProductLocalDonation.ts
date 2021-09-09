import { createConnection } from 'typeorm';

export default async function create(
  productLocalDonation1Id: string,
  productLocalDonation2Id: string,
  productLocalDonation3Id: string,
  productLocalDonation4Id: string,
  productLocalDonation5Id: string,
  productLocalDonation6Id: string,
  productLocalDonation1DonationId: string,
  productLocalDonation2DonationId: string,
  productLocalDonation3DonationId: string,
  productLocalDonation4DonationId: string,
  productLocalDonation5DonationId: string,
  productLocalDonation6DonationId: string,
  productLocalDonation1LocalId: string,
  productLocalDonation2LocalId: string,
  productLocalDonation3LocalId: string,
  productLocalDonation4LocalId: string,
  productLocalDonation5LocalId: string,
  productLocalDonation6LocalId: string,
  productLocalDonation1ProductId: string,
  productLocalDonation2ProductId: string,
  productLocalDonation3ProductId: string,
  productLocalDonation4ProductId: string,
  productLocalDonation5ProductId: string,
  productLocalDonation6ProductId: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date) 
  values ('${productLocalDonation1Id}', '${productLocalDonation1DonationId}','${productLocalDonation1LocalId}', '${productLocalDonation1ProductId}', 'now()');
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date) 
  values ('${productLocalDonation2Id}', '${productLocalDonation2DonationId}','${productLocalDonation2LocalId}', '${productLocalDonation2ProductId}', 'now()');
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date) 
  values ('${productLocalDonation3Id}', '${productLocalDonation3DonationId}','${productLocalDonation3LocalId}', '${productLocalDonation3ProductId}', 'now()');
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id) 
  values ('${productLocalDonation4Id}', '${productLocalDonation4DonationId}','${productLocalDonation4LocalId}', '${productLocalDonation4ProductId}');
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id, expiration_date) 
  values ('${productLocalDonation5Id}', '${productLocalDonation5DonationId}','${productLocalDonation5LocalId}', '${productLocalDonation5ProductId}', 'now()');
  `);

  await connection.query(`
  INSERT INTO PRODUCT_LOCAL_DONATION(id, donation_id, local_id, product_id) 
  values ('${productLocalDonation6Id}', '${productLocalDonation6DonationId}','${productLocalDonation6LocalId}', '${productLocalDonation6ProductId}');
  `);

  await connection.close();

  console.log('Product Local Donation created!');
}
