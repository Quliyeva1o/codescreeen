import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { useGetEventByIdQuery } from '../../../redux/EventsSlice';
import { useGetTimesQuery } from '../../../redux/TimesSlice';
import controller from '../../../API/requests';
import { setSelectedTickets } from '../../../redux/TicketSlice';
import { setTicketModalIsActive } from '../../../redux/TicketModal';
import { useDispatch } from 'react-redux';
import TicketModal from '../../../Layout/TicketModal';

const EventDetail = () => {
    const { id } = useParams();
    const { data: times } = useGetTimesQuery();
    const { data: event } = useGetEventByIdQuery(id);
    const dispatch = useDispatch();

    const [myEvent, setMyEvent] = useState(null);
    const [sessionTimes, setSessionTimes] = useState([]);

    useEffect(() => {
        if (event) {
            setMyEvent(event.data);
        }
    }, [event]);

    useEffect(() => {
        if (event && times) {
            const myTimes = times.data.filter(time => event.data.movies.includes(time.movieId));

            const fetchMovies = async () => {
                try {
                    const moviesPromises = myTimes.map(time =>
                        controller.getOne('/api/movies', time.movieId)
                    );
                    const moviesData = await Promise.all(moviesPromises);
                    setSessionTimes(moviesData.map(res => res.data));
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };

            if (myTimes.length > 0) {
                fetchMovies();
            }
        }
    }, [event, times]);

    const handleTicket = (movie, time, cinema) => {
        dispatch(setSelectedTickets({ time, movie, cinema }));
        dispatch(setTicketModalIsActive(true));
    };

    if (!myEvent || !sessionTimes) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.hero}>
                <img src={myEvent.img} alt={myEvent.title} />
                <div className={styles.heading}>
                    <h2>{myEvent.title}</h2>
                </div>
            </div>
            <div className={styles.event}>
                <p>{myEvent.description}</p>
            </div>
            <div>
                <ul className={styles.sessionTimes}>
                    {sessionTimes.map((movie, index) => (
                        <li key={index}>
                            <div className={styles.movie}>
                                <a style={{ width: "156px" }}>
                                    <img src={movie.coverImg} alt="" />
                                </a>
                                <div>
                                    <h2>
                                        <a href="#">{movie.name}</a>
                                    </h2>
                                    <span style={{ display: "flex" }}>
                                        <span className={styles.min}>{movie.runTime} min | </span>
                                        <span className={styles.min}>{movie.releaseDate}</span>
                                    </span>
                                    <span>{movie.cast}</span>
                                </div>
                            </div>
                            {times.data
                                .find(x => x.movieId === movie._id)
                                .showTimes.map((showTime, ii) => (
                                    <div className={styles.times} key={ii}>
                                        <h2>{showTime.cinemaName}</h2>
                                        <ul>
                                            {showTime.showTime.map((s, idxx) => (
                                                <li key={idxx}>
                                                    <a onClick={() => handleTicket(movie, s, showTime)}>
                                                        <span>{s.formattedTime}</span>
                                                        <span>{s.tag}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </li>
                    ))}
                </ul>
            </div>
            <TicketModal />
        </>
    );
};

export default EventDetail;
