import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import { cadastroSchema } from '../schemas/contactSchema';

import ContactsRepository from '../repositories/ContactsRepository';
import CreateContactService from '../services/CreateContactService';

const contactsRouter = Router();

contactsRouter.get('/', async (request, response) => {
  const contactsRepository = getCustomRepository(ContactsRepository);
  const contacts = await contactsRepository.find();

  return response.json(contacts);
});

contactsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid Id' });
  }
  const contactsRepository = getCustomRepository(ContactsRepository);
  const contact = await contactsRepository.findOne({
    where: { id },
  });

  if (!contact) {
    return response.status(404).json({ error: 'Contact does not exists' });
  }
  return response.json(contact);
});

contactsRouter.post('/', async (request, response) => {
  if (!(await cadastroSchema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const {
    public_place,
    complement,
    number,
    district,
    city,
    state,
    country,
    zip_code,
    phone,
  } = request.body;

  const createContact = new CreateContactService();

  let newContact;

  try {
    newContact = await createContact.execute({
      public_place,
      complement,
      number,
      district,
      city,
      state,
      country,
      zip_code,
      phone,
    });
  } catch (e) {
    return response.status(500).json({
      error: `Contact with zip code already registered in the database`,
    });
  }

  if (!newContact) {
    return response
      .status(500)
      .json({ error: 'An error ocurred. Please try again!' });
  }
  return response.json(newContact);
});

export default contactsRouter;
