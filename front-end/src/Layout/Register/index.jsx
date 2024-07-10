import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useGetCinemasQuery } from '../../redux/CinemasSlice';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import controller from '../../API/requests';
import styles from './index.module.scss';

const Register = ({setLogin}) => {
    const { data: cinemas } = useGetCinemasQuery();
    const [myCinemas, setMyCinemas] = useState([]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeat_password: '',
            firstName: '',
            lastName: '',
            mobile: '',
            dateOfBirth: null,
            postCode: '',
            gender: '',
            preferredCinema: '',
            receiveOffers: false,
            agreeTerms: false,
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, "Password must contain at least one letter and one number, minimum 5 characters")
                .required('Password is required'),
            repeat_password: yup.string().oneOf(
                [yup.ref("password"), null],
                "Passwords must match"
            ),
            firstName: yup.string().required('First name is required'),
            lastName: yup.string().required('Last name is required'),
            mobile: yup.string().required('Mobile number is required'),
            dateOfBirth: yup.date().nullable().required('Date of birth is required'),
            postCode: yup.string().required('Postal code is required'),
            gender: yup.string().required('Gender is required'),
            preferredCinema: yup.string().required('Preferred cinema is required'),
            agreeTerms: yup.boolean().oneOf([true], 'You must agree to terms and conditions'),
        }),
        onSubmit: async (values, actions) => {

            const response = await controller.post('/api/users', values);
            console.log("res",response);
            if (response.response && response.response.data.error == true || response.error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.response.data.message,
                    showConfirmButton: false,
                    timer: 1000,
                });
            } if (response.error == false) {
                actions.resetForm();
                setLogin(true)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User signed up successfully!",
                    showConfirmButton: false,
                    timer: 1000,
                })

            }
        },
    });

    useEffect(() => {
        if (cinemas) {
            setMyCinemas(cinemas.data);
        }
    }, [cinemas]);

    return (
        <div className={styles.register}>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="email"
                    name="email"
                    label="Email address"
                    variant="outlined"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    id="repeat_password"
                    name="repeat_password"
                    label="Repeat Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formik.values.repeat_password}
                    onChange={formik.handleChange}
                    error={formik.touched.repeat_password && Boolean(formik.errors.repeat_password)}
                    helperText={formik.touched.repeat_password && formik.errors.repeat_password}
                />
                <TextField 
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <DatePicker
                    label="Date of Birth"
                    inputVariant="outlined"
                    value={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
                <TextField
                    id="postCode"
                    name="postCode"
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    value={formik.values.postCode}
                    onChange={formik.handleChange}
                    error={formik.touched.postCode && Boolean(formik.errors.postCode)}
                    helperText={formik.touched.postCode && formik.errors.postCode}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {formik.touched.gender && formik.errors.gender && (
                        <span>{formik.errors.gender}</span>
                    )}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="preferredCinema-label">Preferred Cinema</InputLabel>
                    <Select
                   className={styles.select}
                        labelId="preferredCinema-label"
                        id="preferredCinema"
                        name="preferredCinema"
                        value={formik.values.preferredCinema}
                        onChange={formik.handleChange}
                        error={formik.touched.preferredCinema && Boolean(formik.errors.preferredCinema)}
                        variant="outlined"
                        fullWidth
                    >
                        {myCinemas.map((cinema) => (
                            <MenuItem key={cinema._id} value={cinema._id}>{cinema.name}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.preferredCinema && formik.errors.preferredCinema && (
                        <span>{formik.errors.preferredCinema}</span>
                    )}
                </FormControl>
                <FormControlLabel
                 className={styles.check}
                    control={<Checkbox
                        name='receiveOffers'
                        checked={formik.values.receiveOffers}
                        onChange={formik.handleChange}
                    />}
                    label="I want to receive offers from HOYTS"
                />
                <FormControlLabel
                 className={styles.check}
                    control={<Checkbox
                        name='agreeTerms'
                        checked={formik.values.agreeTerms}
                        onChange={formik.handleChange}
                    />}
                    label={(
                        <span>
                            <a href="/terms-and-conditions" target="_blank">I have read and agree to the Terms and Conditions</a>
                        </span>
                    )}
                    error={formik.touched.agreeTerms && Boolean(formik.errors.agreeTerms)}
                    helperText={formik.touched.agreeTerms && formik.errors.agreeTerms}
                />
                <Button
                className={styles.btn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Register;
