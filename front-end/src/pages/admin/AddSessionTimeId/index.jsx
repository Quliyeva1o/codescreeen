import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../../redux/MoviesSlice';
import { useGetCinemasQuery } from '../../../redux/CinemasSlice';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import controller from '../../../API/requests';
import { useGetTagsQuery } from '../../../redux/TagsSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import Select from 'react-select';
import { useGetTimesQuery } from '../../../redux/TimesSlice';
import styles from './index.module.scss'
const AddSessionTimeId = () => {
    const { id } = useParams();
    const { data: movie } = useGetMovieByIdQuery(id);
    const { data: cinemas } = useGetCinemasQuery();
    const { data: tags } = useGetTagsQuery();
    const { data: times } = useGetTimesQuery();
    const [myTime, setMyTime] = useState(null);
    const [myMovie, setMyMovie] = useState(null);
    const [cinemasData, setCinemasData] = useState(null);
    const [value, setValue] = useState(dayjs());
    const [sessions, setSessions] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        if (tags) {
            setTagsList(tags.data);
        }
    }, [tags]);

    useEffect(() => {
        if (movie) {
            setMyMovie(movie.data);
        }
    }, [movie]);

    useEffect(() => {
        if (cinemas) {
            setCinemasData(cinemas.data);
        }
    }, [cinemas]);

    useEffect(() => {
        if (times && myMovie) {
            const myTime = times.data.find(x => x.movieId === myMovie._id);
            setMyTime(myTime)
            if (myTime && myTime.showTimes) {
                const initialSessions = myTime.showTimes.map(showTime => ({
                    cinemaId: showTime.cinemaId,
                    cinemaName: showTime.cinemaName,
                    showTime: showTime.showTime.map(time => ({
                        formattedTime: time.formattedTime,
                        tags: { label: time.tag }
                    }))
                }));
                setSessions(initialSessions);
            }
        }
    }, [times, myMovie]);

    const formik = useFormik({
        initialValues: {
            ...(() => {
                let initialValues = {};
                sessions.forEach((session, sessionIndex) => {
                    session.showTime.forEach((showtime, index) => {
                        initialValues[`tags-${session.cinemaId}-${index}`] = { "label": showtime.tags.label } || '';
                    });
                });
                return initialValues;
            })()
        },
        validationSchema: Yup.object().shape({
            ...(() => {
                const validationSchema = {};
                sessions.forEach((session, sessionIndex) => {
                    session.showTime.forEach((showtime, index) => {
                        validationSchema[`tags-${session.cinemaId}-${index}`] = Yup.object()
                            .nullable(true)
                            .required('Please select a tag');
                    });
                });
                return validationSchema;
            })()
        }),
        onSubmit: (values) => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            handleSaveSessions(values);

        },
    });


    useEffect(() => {

        let initialValues = {};
        sessions.forEach((session, sessionIndex) => {
            session.showTime.forEach((showtime, index) => {
                initialValues[`tags-${session.cinemaId}-${index}`] = { "label": showtime.tags.label } || '';
            });
        });
        formik.setValues(initialValues);
    }, [sessions, formik.setValues]);

    const handleInputChange = (cinemaId, cinemaName, selectedValue) => {
        const formattedTime = selectedValue.format('LLL');
        const existingSessionIndex = sessions.findIndex(session => session.cinemaId === cinemaId);

        if (existingSessionIndex !== -1) {
            const updatedSessions = sessions.map((session, index) => {
                if (index === existingSessionIndex) {
                    return {
                        ...session,
                        showTime: [
                            ...session.showTime,
                            { cinemaId, cinemaName, formattedTime, tags: { label: '' } }
                        ]
                    };
                }
                return session;
            });
            setSessions(updatedSessions);
        } else {
            const newSession = {
                cinemaId,
                cinemaName,
                showTime: [{ cinemaId, cinemaName, formattedTime, tags: { label: '' } }]
            };
            setSessions([...sessions, newSession]);
        }
    };



    const handleDeleteSession = (cinemaId, showtimeToDelete) => {
        const updatedSessions = sessions.map(session => {
            if (session.cinemaId === cinemaId) {
                const updatedShowTime = session.showTime.filter(showtime =>
                    showtime !== showtimeToDelete
                );
                if (updatedShowTime.length > 0) {
                    return {
                        ...session,
                        showTime: updatedShowTime
                    };
                } else {
                    return null;
                }
            } else {
                return session;
            }
        }).filter(Boolean);

        setSessions(updatedSessions);
    };

    const handleTagChange = (cinemaId, index, selectedOption) => {
        formik.setFieldValue(`tags-${cinemaId}-${index}`, selectedOption ? { label: selectedOption.label } : null);
    };


    const getTagValue = (cinemaId, index) => {
        return formik.values[`tags-${cinemaId}-${index}`] ? { label: formik.values[`tags-${cinemaId}-${index}`].label } : null;
    };


    const handleSaveSessions = (values) => {
        const formattedSessions = sessions.map(session => ({
            cinemaId: session.cinemaId,
            cinemaName: session.cinemaName,
            showTime: session.showTime.map(time => ({
                formattedTime: time.formattedTime,
                tag: formik.values[`tags-${session.cinemaId}-${session.showTime.indexOf(time)}`]?.label || formik.values[`tags-${session.cinemaId}-${session.showTime.indexOf(time)}`] || null
            }))
        }));

        const sessionData = {
            movieId: myMovie && myMovie._id,
            movie: myMovie && myMovie.movie,
            showTimes: formattedSessions
        };

        console.log("sessionData", sessionData);
        console.log('myt',myTime);

        if (myTime) {
            controller.patch('/api/times', myTime._id, sessionData)
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
        }
        else {
            controller.post('/api/times', sessionData)
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
        }
    };


    return (
        <div className={styles.sessad}>
            <h1>{myMovie && myMovie.name}</h1>
            <div>
                {cinemasData &&
                    cinemasData.map(cinema => (
                        <div className={styles.divv}>
                            <div key={cinema._id} className={styles.div}>
                                <span className={styles.cinemaname}>{cinema.name}</span>
                                <span>
                                    <DateTimePicker
                                        className={styles.datePicker}
                                        label="Select Date and Time"
                                        value={value}
                                        onAccept={value => {
                                            handleInputChange(cinema._id, cinema.name, value);
                                        }}
                                        renderInput={props => <TextField {...props} />}
                                    />
                                </span>
                                {sessions.filter(session => session.cinemaId === cinema._id).map((session, sessionIndex) => (
                                    <div key={sessionIndex}>
                                        {session.showTime.map((showtime, index) =>
                                        (
                                            <div key={index}>
                                                <div>  <span>{showtime.formattedTime}</span>
                                                    <button onClick={() => handleDeleteSession(cinema._id, showtime)}>
                                                        Delete
                                                    </button>
                                                </div>
                                                <Select
                                                    className={styles.select}
                                                    id={`tags-${cinema._id}-${index}`}
                                                    name={`tags-${cinema._id}-${index}`}
                                                    onChange={(selectedOption) => {
                                                        handleTagChange(cinema._id, index, selectedOption);
                                                    }}
                                                    value={getTagValue(cinema._id, index)}
                                                    options={tagsList.map(tag => ({ value: tag._id, label: tag.title }))}
                                                    isMulti={false}
                                                    placeholder="Select a tag"
                                                />

                                                {


                                                    formik.touched[`tags-${cinema._id}-${index}`] && formik.errors[`tags-${cinema._id}-${index}`] && (
                                                        <span style={{ color: 'red' }}>{formik.errors[`tags-${cinema._id}-${index}`]}</span>
                                                    )}
                                            </div>
                                        )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
            <button className={styles.btn} type="submit" onClick={formik.handleSubmit}>Save Sessions</button>
        </div>
    );
};

export default AddSessionTimeId;
