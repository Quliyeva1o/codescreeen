import React, { useEffect, useState } from 'react';
import { useGetMovieByIdQuery } from '../../../redux/MoviesSlice';
import { Link, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import { useGetGenreByIdQuery } from '../../../redux/GenresSlice';
import controller from '../../../API/requests';
import CinemasModal from '../../../Layout/CinemasModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCinemaModalIsActive } from '../../../redux/CinemaModal';
import { useGetTimesQuery } from '../../../redux/TimesSlice';
import { setSelectedTickets } from '../../../redux/TicketSlice';
import { setTicketModalIsActive } from '../../../redux/TicketModal';
import TicketModall from '../../../Layout/TicketModal';
import { setLoginIsActive } from '../../../redux/LoginActiveBtnSlice';

const MovieDetail = () => {
    const user = useSelector((state) => state.user);
    const { id } = useParams();
    const { data: movie } = useGetMovieByIdQuery(id);
    const [myMovie, setMyMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [myGenres, setMyGenres] = useState([]);
    const [value, setValue] = useState(0);
    const [trailersData, setTrailersData] = useState([]);
    const [trailerdata, setTrailerdata] = useState([]);
    const [trailerModal, setTrailerModal] = useState(false);
    const selectedCinemas = useSelector((state) => state.selectedCinemas);
    const { data: times } = useGetTimesQuery();
    const [myTimes, setMyTimes] = useState([]);
    const [sessionTimes, setSessionTimes] = useState([]);
    const selectedTickets = useSelector((state) => state.selectedTickets);
    const ticketModal = useSelector((state) => state.ticketModal);
    const dispatch = useDispatch();
    const cinemaModal = useSelector((state) => state.cinemaModal);
    const [myUser, setMyUser] = useState(null);

    useEffect(() => {
        if (movie) {
            setMyMovie(movie.data);
            setGenres(movie.data.genres ? JSON.parse(movie.data.genres) : movie.data.genre);
            times && setMyTimes(times.data.find((x) => x.movieId === movie.data._id)?.showTimes);
        }
    }, [movie, times]);

    useEffect(() => {
        if (times && myMovie) {
            const selectedCinemaIds = selectedCinemas.cinemas;
            const filteredTimes = myTimes?.filter((time) => selectedCinemaIds.includes(time.cinemaId));
            setSessionTimes(filteredTimes);
        }
    }, [times, myMovie, selectedCinemas]);

    useEffect(() => {
        if (genres.length > 0) {
            Promise.all(genres.map((id) => controller.getOne('/api/genres', id)))
                .then((responses) => {
                    const genresData = responses.map((res) => res.data);
                    setMyGenres(genresData);
                })
                .catch((error) => {
                    console.error('Error fetching genres:', error);
                });
        }
    }, [genres]);

    useEffect(() => {
        const fetchTrailersData = async () => {
            if (myMovie?.trailers) {
                try {
                    const fetchedData = await Promise.all(
                        myMovie.trailers.map((trailer) =>
                            fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(trailer.url)}&format=json`)
                                .then((response) => response.json())
                        )
                    );
                    setTrailersData(fetchedData);
                } catch (error) {
                    console.error('Error fetching trailers:', error);
                }
            }
        };

        fetchTrailersData();
    }, [myMovie]);

    useEffect(() => {
        if (user.id) {
            controller.getOne('/api/users', user.id).then((res) => {
                setMyUser(res.data);
            });
        }
    }, [user]);

    const handleTicket = (moviee, timee, cinemaa) => {
        dispatch(setSelectedTickets({ time: timee, movie: moviee, cinema: cinemaa }));
        dispatch(setTicketModalIsActive(true));
    };

    const handleCinemas = () => {
        dispatch(setCinemaModalIsActive(!cinemaModal.cinemaModalIsActive));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleWishlist = () => {
        if (user.id && user.role === 'client') {
            let updatedWishlist;
            if (myUser.favorites.includes(myMovie._id)) {
                updatedWishlist = myUser.favorites.filter((fav) => fav !== myMovie._id);
            } else {
                updatedWishlist = [...myUser.favorites, myMovie._id];
            }
            const updatedUser = {
                ...myUser,
                favorites: updatedWishlist
            };
            controller
                .patch(`/api/users`, user.id, updatedUser)
                .then((res) => {
                    setMyUser(updatedUser);
                })
                .catch((error) => {
                    console.error('Error updating user wishlist:', error);
                });
        } else {
            dispatch(setLoginIsActive(true));
        }
    };

    const handletrailer = (data) => {
        setTrailerdata(data);
        setTrailerModal(true);
    };



    const CustomTabPanel = (props) => {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    };

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };
    return (
        <>
            <div className={styles.movieHero}>
                <div className={styles.bgi}>
                    <img src={myMovie.bgImg} alt="" />
                </div>
                <div className={styles.film}>
                    <img src={myMovie.coverImg} alt="" />
                    <div>
                        <span>Now Showing</span>
                        <h1>{myMovie.name}</h1>
                        <div>
                            <span>{myMovie.runTime} min</span>
                            <span>|</span>
                            <span>{myMovie.releaseDate}</span>
                        </div>
                        <p>{myMovie.rating}</p>
                        <button className={styles.icons} onClick={() => handletrailer(trailersData[0])}>
                            <span className={styles.icon}><PlayArrowIcon className={styles.play} /></span>
                            <span className={styles.soz}>Trailer</span>
                        </button>
                        <button className={styles.icons} onClick={handleWishlist}>
                            <span className={`${styles.icon} ${myUser?.favorites.includes(myMovie._id) ? styles.favoriteActive : ''}`}>
                                <FavoriteIcon className={styles.heart} />
                            </span>
                            <span className={styles.soz}>Watchlist</span>
                        </button>
                    </div>
                </div>
                <div className={styles.spann}></div>
            </div>
            <div className={styles.mobile}>
                <div>
                    <div className="heading">
                        <h2>Times & Tickets</h2>
                        <button onClick={handleCinemas}>
                            {sessionTimes && sessionTimes.length > 0 ? sessionTimes.map((time) => (
                                <span style={{ marginRight: "5px" }}>{time.cinemaName}</span>
                            )) : <span>Add cinemas</span>}
                        </button>
                    </div>
                    <div>
                        {sessionTimes && sessionTimes.length > 0 &&
                            sessionTimes.map((cinemaaa) => (
                                <div key={cinemaaa.cinemaId} className={styles.times}>
                                    <h2>{cinemaaa.cinemaName}</h2>
                                    <ul>
                                        {cinemaaa.showTime.map((time, index) => (
                                            <li key={index}>
                                                <a onClick={() => { handleTicket(myMovie, time, cinemaaa) }}>
                                                    <span>{time.formattedTime}</span>
                                                    <span>{time.tag}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>

                <div>
                    <div className="heading">
                        <h2>Teasers & Trailers</h2>
                    </div>
                    <div className={styles.trailers}>
                        {trailersData.map((data, idx) => (
                            <div key={idx}>
                                <a onClick={() => handletrailer(data)}>
                                    <span>{data.title}</span>
                                    <span className={styles.scrim}></span>
                                    <img src={data.thumbnail_url} alt="" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.trailers}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Synopsis" {...a11yProps(0)} />
                                <Tab label="Details" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div>
                                <p>{myMovie.description}</p>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div>
                                <dl>
                                    <dt>Director</dt>
                                    <dd>{myMovie.director}</dd>
                                    <dt>Cast</dt>
                                    <dd>{myMovie.cast}</dd>
                                    <dt>Genre</dt>
                                    {myGenres.map((genre, idxx) => (
                                        <span key={idxx}>{genre.name}, </span>
                                    ))}
                                    <dt>Rating</dt>
                                    <dd>{myMovie.rating}</dd>
                                    <dt>Release Date</dt>
                                    <dd>{myMovie.releaseDate}</dd>
                                    <dt>Runtime</dt>
                                    <dd>{myMovie.runTime} min</dd>
                                </dl>
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>

                {trailerModal && (
                    <div className={styles.trailModal}>
                        <button onClick={() => setTrailerModal(false)}>
                            <CancelIcon />
                        </button>
                        <div dangerouslySetInnerHTML={{ __html: trailerdata.html }} />
                    </div>
                )}

                <CinemasModal />
            </div>
            <TicketModall />
        </>
    );
};

export default MovieDetail;
