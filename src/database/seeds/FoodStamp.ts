import { createConnection } from 'typeorm';

export default async function create(
  foodStamp1Id: string,
  product1Id: string,
  product2Id: string,
  product3Id: string,
): Promise<void> {
  const connection = await createConnection();

  await connection.query(`
  INSERT INTO FOOD_STAMP(id, type, open, product_id) 
  values ('${foodStamp1Id}', 'Completa', true, '${product1Id}');
  `);

  //   await connection.query(`
  //   INSERT INTO FOOD_STAMP(id, type, open, product_id)
  //   values ('${foodStamp1Id}', 'Completa', true, '${product2Id}');
  //   `);

  //   await connection.query(`
  //   INSERT INTO FOOD_STAMP(id, type, open, product_id)
  //   values ('${foodStamp1Id}', 'Completa', true, '${product3Id}');
  //   `);

  await connection.close();

  console.log('FoodStamp created!');
}
