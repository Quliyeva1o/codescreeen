import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Select from "react-select";
import controller from "../../../API/requests.js";
import styles from "./index.module.scss";
import { useGetTagsQuery } from "../../../redux/TagsSlice.jsx";
import * as Yup from 'yup';

const AddCinema = () => {
  const states = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "QLD", label: "QLD" },
    { value: "SA", label: "SA" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];

  const user = useSelector((state) => state.user);
  const [cinemas, setCinemas] = useState([]);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { data: tags } = useGetTagsQuery();

  const [tagsList, setTagsList] = useState([]);
  useEffect(() => {
    if (tags) {
      setTagsList(tags.data);
    }
  }, [tags]);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    controller.getAll("/api/halls", token).then((res) => {
      if (res && res.data) {
        setCinemas(
          res.data.map((cinema) => ({
            value: cinema._id,
            label: cinema.name,
          }))
        );
      }
    });
  }, [token]);

  const formik = useFormik({
    initialValues: {
      name: "",
      location: null,
      img: null,
      coverImg: null,
      address: "",
      parking: "",
      tags: [],
      map: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Name is required'),
      address: Yup.string()
        .required('Address is required'),
      parking: Yup.string()
        .required('Parking information is required'),
      img: Yup.mixed()
        .required('Image is required'),
      coverImg: Yup.mixed()
        .required('Image is required'),
      location: Yup.object()
        .shape({
          value: Yup.string().required('Location is required'),
          label: Yup.string().required('Location is required'),
        }),
      tags: Yup.array()
        .min(1, 'Select at least one tag')
        .required('Tags are required'),
      map: Yup.string()
        .required('Map information is required'),
      phone: Yup.string()
        .matches(/^\d+$/, 'Invalid phone number')
        .required('Phone number is required'),
    }),
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("img", values.img);
      formData.append("coverImg", values.coverImg);
      formData.append("address", values.address);
      formData.append("parking", values.parking);
      formData.append("location", values.location.value);
      formData.append("tags", values.tags.map(tag => tag.label));
      formData.append("map", values.map);
      formData.append("phone", values.phone);
      console.log(formData);
      try {
        await controller.post("/api/halls", formData, token)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Cinema Added",
          showConfirmButton: false,
          timer: 1000,
        });
        actions.resetForm();
      } catch (error) {
        console.error("Error adding hall:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("img", event.currentTarget.files[0]);
  };

  const handlecovImageChange = (event) => {
    formik.setFieldValue("coverImg", event.currentTarget.files[0]);
  };

  return (
    <div className={styles.add}>
      <h3 style={{ textAlign: "center", marginBottom: "14px" }}>
        Add New Cinema
      </h3>
      <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          id="name"
          type="text"
          label="Name"
          variant="outlined"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          id="address"
          type="text"
          label="Address"
          variant="outlined"
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          name="parking"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.parking}
          id="parking"
          type="text"
          label="Parking"
          variant="outlined"
          error={formik.touched.parking && Boolean(formik.errors.parking)}
          helperText={formik.touched.parking && formik.errors.parking}
        />
        <TextField
          name="img"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
          id="img"
          type="file"
          label="Image"
          variant="outlined"
          accept="image/*"
          error={formik.touched.img && Boolean(formik.errors.img)}
          helperText={formik.touched.img && formik.errors.img}
        />
         <TextField
          name="coverImg"
          onChange={handlecovImageChange}
          onBlur={formik.handleBlur}
          id="coverImg"
          type="file"
          label="Image"
          variant="outlined"
          accept="image/*"
          error={formik.touched.coverImg && Boolean(formik.errors.coverImg)}
          helperText={formik.touched.coverImg && formik.errors.coverImg}
        />
        <Select
          name="location"
          onChange={(selectedOption) => {
            formik.setFieldValue("location", selectedOption);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.location}
          options={states}
          placeholder="Select location"
          isClearable={true} // Allow clearing the selection
        />
        {formik.touched.location && formik.errors.location && (
          <span style={{ color: "red" }}>{formik.errors.location}</span>
        )}
        <Select
          id="tags"
          name="tags"
          onChange={(selectedOptions) => {
            formik.setFieldValue("tags", selectedOptions);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.tags}
          options={tagsList.map((tag) => ({ value: tag._id, label: tag.title }))}
          isMulti
          placeholder="Select tags"
        />
        {formik.touched.tags && formik.errors.tags && (
          <span style={{ color: "red" }}>{formik.errors.tags}</span>
        )}
        <TextField
          name="map"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.map}
          id="map"
          type="text"
          label="Map"
          variant="outlined"
          error={formik.touched.map && Boolean(formik.errors.map)}
          helperText={formik.touched.map && formik.errors.map}
        />

        <TextField
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          id="phone"
          type="tel"
          label="phone number"
          variant="outlined"
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddCinema;
