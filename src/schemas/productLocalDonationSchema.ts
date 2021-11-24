import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  donation_id: Yup.string().required(),
  product_id: Yup.string().required(),
  expiration_date: Yup.string(),
  ncm_id: Yup.string().required(),
  amount: Yup.number().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  donation_id: Yup.string().required(),
  product_id: Yup.string().required(),
  ncm_id: Yup.string().required(),
  expiration_date: Yup.string(),
  active: Yup.boolean().required(),
});
