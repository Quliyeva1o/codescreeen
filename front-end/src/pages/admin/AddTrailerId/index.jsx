import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../../redux/MoviesSlice';
import controller from '../../../API/requests';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import styles from './index.module.scss';
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';

const AddTrailerId = () => {
    const { id } = useParams();
    const { data: movie } = useGetMovieByIdQuery(id);
    const [myMovie, setMyMovie] = useState(null);
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
        if (movie) {
            setMyMovie(movie.data);
            setTrailers(movie.data.trailers || []);
        }
    }, [movie]);

    const handleDeleteTrailer = (index) => {
        const updatedTrailers = [...trailers];
        updatedTrailers.splice(index, 1);
        setTrailers(updatedTrailers);
    };

    const handleSave = () => {
        const updatedMovie = {
            ...myMovie,
            trailers: trailers,
        };
        console.log(updatedMovie);
        controller.patch("/api/movies", id, updatedMovie);
    };

    const validationSchema = Yup.object().shape({
        newTrailerUrl: Yup.string()
            .url('Invalid URL format')
            .required('URL is required'),
    });

    return (
        <>
            {myMovie && (
                <div className={styles.addtr}>
                    <div>
                        <h2>{myMovie.name}</h2>
                        <h3>Add Trailers</h3>
                        <Formik
                            initialValues={{ newTrailerUrl: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                const newTrailer = { url: values.newTrailerUrl };
                                setTrailers([...trailers, newTrailer]);
                                resetForm();
                            }}
                        >
                            {({ handleSubmit, handleChange, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="newTrailerUrl"
                                            placeholder="Enter trailer URL"
                                            value={values.newTrailerUrl}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage name="newTrailerUrl" component="div" className="error" />
                                    </div>
                                    <Button type="submit">Add Trailer</Button>
                                </Form>
                            )}
                        </Formik>

                        <h3>Existing Trailers:</h3>
                        {trailers.length > 0 ? (
                            <ul>
                                {trailers.map((trailer, index) => (
                                    <li key={index}>
                                       <div style={{display:'flex' , alignItems:"center"}}> 
                                       <div>{trailer.url}</div>
                                        <Button style={{color:"red", marginLeft:"10px"}} onClick={() => handleDeleteTrailer(index)}>
                                            Delete
                                        </Button>
                                       </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No trailers added yet.</p>
                        )}
                        <Button className={styles.btn} onClick={handleSave}>Save</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTrailerId;
