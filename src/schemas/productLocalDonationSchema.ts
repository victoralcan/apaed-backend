import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  donation_id: Yup.string().required(),
  product_id: Yup.string().required(),
  expiration_date: Yup.string(),
  amount: Yup.number().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  donation_id: Yup.string().required(),
  local_id: Yup.string().required(),
  product_id: Yup.string().required(),
  expiration_date: Yup.string(),
});
