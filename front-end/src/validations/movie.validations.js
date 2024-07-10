import * as yup from 'yup';

const movieValidations = yup.object({
  name: yup.string().required(),
  director: yup.string().required(),
  bgImg: yup.string().required(),
  cast: yup.string().required(),
  genres: yup.array().required().default([]),
  rating: yup.string().required(),
  description: yup.string().required(),
  runTime: yup.number().required(),
  releaseDate: yup.string().required(),
  coverImg: yup.string().required(),
  ageRes: yup.number().required(),
});

export default movieValidations;