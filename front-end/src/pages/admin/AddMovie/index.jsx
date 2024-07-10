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
import Movie from "../../../classes/Movie.js";
import styles from "./index.module.scss";
import { useGetGenresQuery } from "../../../redux/GenresSlice.jsx";
import movieValidations from "../../../validations/movie.validations.js";

const AddMovie = () => {
    const user = useSelector((state) => state.user);
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const { data: genres } = useGetGenresQuery();

    const [genress, setgenres] = useState([]);
    const [myGenres, setMyGenres] = useState([])
    useEffect(() => {
        genres && setMyGenres(genres.data)
    }, [genres]);


    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/admin/login");
        }
    }, [navigate, user]);


    useEffect(() => {
        controller.getAll("/api/genres", token).then((res) => {
            setgenres(
                res?.data.map((genre) => ({
                    value: genre._id,
                    label: genre.name,
                }))
            );
        });
    }, [token]);
    const formik = useFormik({
        initialValues: {
            name: "",
            director: "",
            bgImg: null,
            cast: "",
            genres: "",
            rating: "",
            description: "",
            runTime: "",
            releaseDate: "",
            coverImg: null,
            ageRes: "",
        },
        validationSchema:movieValidations,
        onSubmit: async (values, actions) => {
            const genreIds = values.genres.map((genre) => genre.value);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("director", values.director);
            formData.append("bgImg", values.bgImg);
            formData.append("cast", values.cast);
            formData.append("genres", JSON.stringify(genreIds));
            formData.append("rating", values.rating);
            formData.append("description", values.description);
            formData.append("runTime", values.runTime);
            formData.append("releaseDate", values.releaseDate);
            formData.append("coverImg", values.coverImg);
            formData.append("ageRes", values.ageRes);
            console.log(values);

            try {
                await controller.post("/api/movies", formData, token);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "New Movie Added",
                    showConfirmButton: false,
                    timer: 1000,
                });
                actions.resetForm();
            } catch (error) {
                console.error("Error adding movie:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        },
    });

    const handleImageChange = (event) => {
        formik.setFieldValue("bgImg", event.currentTarget.files[0]);
    };
    const handleImageChangee = (event) => {
        formik.setFieldValue("coverImg", event.currentTarget.files[0]);
    };
    return (
        <div className={styles.add}>
            <h3 style={{ textAlign: "center", marginBottom: "14px" }}>
                Add New Movie
            </h3>
            <form
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}

            >
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
                    name="director"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.director}
                    id="director"
                    type="text"
                    label="Director"
                    variant="outlined"
                    error={formik.touched.director && Boolean(formik.errors.director)}
                    helperText={formik.touched.director && formik.errors.director}
                />
                <TextField
                    name="bgImg"
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    id="bgImg"
                    type="file"
                    label="bgImg"
                    variant="outlined"
                    accept="image/*"
                    error={formik.touched.bgImg && Boolean(formik.errors.bgImg)}
                    helperText={formik.touched.bgImg && formik.errors.bgImg}
                />

                <TextField
                    name="cast"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cast}
                    id="cast"
                    type="text"
                    label="Cast"
                    variant="outlined"
                    error={formik.touched.cast && Boolean(formik.errors.cast)}
                    helperText={formik.touched.cast && formik.errors.cast}
                />

                <Select
                    id="genres"
                    name="genres"
                    onChange={(selectedOptions) => {
                        formik.setFieldValue("genres", selectedOptions);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.genres}
                    options={genress}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select genres"
                    
                />
                {formik.touched.genres && formik.errors.genres && (
                    <span style={{ color: "red" }}>{formik.errors.genres}</span>
                )}
                <TextField
                    name="rating"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rating}
                    id="rating"
                    type="text"
                    label="Rating"
                    variant="outlined"
                    error={formik.touched.rating && Boolean(formik.errors.rating)}
                    helperText={formik.touched.rating && formik.errors.rating}
                />
                <TextField
                className={styles.desc}
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    id="description"
                    multiline
                    rows={10}
                    placeholder="Description"
                    variant="outlined"
                    error={
                        formik.touched.description && Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />
                <TextField
                    name="runTime"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.runTime}
                    id="runTime"
                    type="number"
                    label="Run Time (minutes)"
                    variant="outlined"
                    error={formik.touched.runTime && Boolean(formik.errors.runTime)}
                    helperText={formik.touched.runTime && formik.errors.runTime}
                />
                <TextField
                    name="releaseDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.releaseDate}
                    id="releaseDate"
                    type="text"
                    label="Release Date"
                    variant="outlined"
                    error={
                        formik.touched.releaseDate && Boolean(formik.errors.releaseDate)
                    }
                    helperText={
                        formik.touched.releaseDate && formik.errors.releaseDate
                    }
                />
           
                <TextField
                    name="coverImg"
                    onChange={handleImageChangee}
                    onBlur={formik.handleBlur}
                    id="coverImg"
                    type="file"
                    label="coverImg"
                    variant="outlined"
                    accept="image/*"
                    error={formik.touched.coverImg && Boolean(formik.errors.coverImg)}
                    helperText={formik.touched.coverImg && formik.errors.coverImg}
                />

                <TextField
                    name="ageRes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ageRes}
                    id="ageRes"
                    type="number"
                    label="Age Restriction"
                    variant="outlined"
                    error={formik.touched.ageRes && Boolean(formik.errors.ageRes)}
                    helperText={formik.touched.ageRes && formik.errors.ageRes}
                />
           
                <Button variant="contained" color="primary" type="submit">
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddMovie;
