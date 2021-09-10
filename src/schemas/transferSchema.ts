import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const cadastroSchema = Yup.object().shape({
  destiny_id: Yup.string().required(),
  product_id: Yup.string().required(),
  description: Yup.string().required(),
  amount: Yup.string().required(),
});
