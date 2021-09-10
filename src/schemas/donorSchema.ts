import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  email: Yup.string().required(),
  name: Yup.string().required(),
  contact_id: Yup.string().required(),
  document: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  email: Yup.string().required(),
  name: Yup.string().required(),
  contact_id: Yup.string().required(),
  document: Yup.string().required(),
});
