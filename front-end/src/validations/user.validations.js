import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, 'Password must contain at least 5 characters, including one letter and one number')
    .required('Password is required'),
  repeat_password: yup.string().oneOf(
    [yup.ref("password"), null],
    "Passwords must match"
  ),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  mobile: yup.string().required('Mobile is required'),
  dateOfBirth: yup.date().nullable().required('Date of birth is required'),
  postCode: yup.string().required('Post code is required'),
  gender: yup.string().required('Gender is required'),
  preferredCinema: yup.string().required('Preferred cinema is required'),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to terms and conditions'),
  src: yup.mixed().required('File upload is required'),
});

export default userValidationSchema;
