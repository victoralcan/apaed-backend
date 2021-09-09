import { v4 as uuidV4 } from 'uuid';

import createRoles from './Roles';
import createContacts from './Contacts';
import createLocals from './Locals';
import createUsers from './Users';
import createDonors from './Donors';
import createDonations from './Donations';
import createUnitsMeasure from './UnitsMeasure';
import createTypes from './Types';
import createNcm from './Ncm';
import createProducts from './Product';
import createProductLocalDonation from './ProductLocalDonation';

const adminRoleId = uuidV4();
const userRoleId = uuidV4();

const contact1Id = uuidV4();
const contact2Id = uuidV4();

const local1Id = uuidV4();
const local2Id = uuidV4();
const local3Id = uuidV4();

const userId = uuidV4();
const adminId = uuidV4();

const donor1Id = uuidV4();
const donor2Id = uuidV4();

const donation1Id = uuidV4();
const donation2Id = uuidV4();

const unityMeasurement1Id = uuidV4();
const unityMeasurement2Id = uuidV4();
const unityMeasurement3Id = uuidV4();
const unityMeasurement4Id = uuidV4();
const unityMeasurement5Id = uuidV4();

const type1Id = uuidV4();
const type2Id = uuidV4();
const type3Id = uuidV4();

const ncm1Id = uuidV4();
const ncm2Id = uuidV4();
const ncm3Id = uuidV4();
const ncm4Id = uuidV4();
const ncm5Id = uuidV4();

const product1Id = uuidV4();
const product2Id = uuidV4();
const product3Id = uuidV4();
const product4Id = uuidV4();
const product5Id = uuidV4();
const product6Id = uuidV4();

const productLocalDonation1Id = uuidV4();
const productLocalDonation2Id = uuidV4();
const productLocalDonation3Id = uuidV4();
const productLocalDonation4Id = uuidV4();
const productLocalDonation5Id = uuidV4();
const productLocalDonation6Id = uuidV4();

async function execute() {
  try {
    await createRoles(adminRoleId, userRoleId);
    await createContacts(contact1Id, contact2Id);
    await createLocals(
      local1Id,
      local2Id,
      local3Id,
      contact1Id,
      contact2Id,
      contact1Id,
    );
    await createUsers(
      adminId,
      userId,
      local1Id,
      local2Id,
      adminRoleId,
      userRoleId,
    );
    await createDonors(donor1Id, donor2Id, contact1Id, contact2Id);
    await createDonations(donation1Id, donation2Id, donor1Id, donor2Id);
    await createUnitsMeasure(
      unityMeasurement1Id,
      unityMeasurement2Id,
      unityMeasurement3Id,
      unityMeasurement4Id,
      unityMeasurement5Id,
    );
    await createTypes(type1Id, type2Id, type3Id);
    await createNcm(
      ncm1Id,
      ncm2Id,
      ncm3Id,
      ncm4Id,
      ncm5Id,
      type1Id,
      type1Id,
      type2Id,
      type3Id,
      type2Id,
      unityMeasurement1Id,
      unityMeasurement1Id,
      unityMeasurement5Id,
      unityMeasurement4Id,
      unityMeasurement5Id,
    );
    await createProducts(
      product1Id,
      product2Id,
      product3Id,
      product4Id,
      product5Id,
      product6Id,
      ncm1Id,
      ncm2Id,
      ncm3Id,
      ncm5Id,
      ncm4Id,
      ncm1Id,
    );
    await createProductLocalDonation(
      productLocalDonation1Id,
      productLocalDonation2Id,
      productLocalDonation3Id,
      productLocalDonation4Id,
      productLocalDonation5Id,
      productLocalDonation6Id,
      donation1Id,
      donation1Id,
      donation1Id,
      donation2Id,
      donation2Id,
      donation2Id,
      local1Id,
      local1Id,
      local1Id,
      local1Id,
      local1Id,
      local1Id,
      product1Id,
      product2Id,
      product2Id,
      product3Id,
      product1Id,
      product4Id,
    );
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}

execute()
  .then(() => console.log('Seed complete!'))
  .catch(() => console.log('Seed error!'));
