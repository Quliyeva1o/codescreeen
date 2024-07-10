import TextField from "@mui/material/TextField";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import controller from "../../../API/requests.js";
import Swal from "sweetalert2";
import loginValidation from "../../../validations/login.validations.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/UserSlice.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./index.module.scss"

const AdminLogin = () => {
  const user = useSelector((state) => state.user);
  const navigate= useNavigate("")
  const dispatch = useDispatch();
 

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async ({ email, password }, actions) => {
      const response = await controller.post('/login', { email: email, password: password });
      console.log(response);

      if (response.auth) {
        if(response.user.role=="admin"){
        actions.resetForm();
        dispatch(login(response.user));
        //token
        const token = response.token;
        Cookies.set('token', token, { expires: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/admin");
        });
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "email or password is incorrect",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });

  return (
    <div className={styles.login}>
      <h2>Sign in Hoyts Admin</h2>
      <div className={styles.form}>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
          }}>
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
          <div>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </div></form>
      </div>
     

    </div>

  );
};

export default AdminLogin;
