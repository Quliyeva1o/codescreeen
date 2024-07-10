import React, { useEffect, useState } from 'react';
import { useGetTimesQuery } from '../../../redux/TimesSlice';
import controller from '../../../API/requests';
import styles from './index.module.scss'
import { useDispatch } from 'react-redux';
import { setTicketModalIsActive } from '../../../redux/TicketModal';
import TicketModall from '../../../Layout/TicketModal';
import { setSelectedTickets } from '../../../redux/TicketSlice';

const SessionTimes = () => {
  const { data: times, error, isLoading, refetch } = useGetTimesQuery();
  const [sessionTimes, setSessionTimes] = useState([]);
  const dispatch = useDispatch()

  const handleTicket = (moviee, timee, cinemaa) => {
    dispatch(setSelectedTickets({ time: timee, movie: moviee, cinema: cinemaa }));
    dispatch(setTicketModalIsActive(true));
  };
  

  useEffect(() => {
    if (times) {
      const fetchMovies = async () => {
        try {
          const moviesPromises = times.data.map(time =>
            controller.getOne('/api/movies', time.movieId)
          );
          const moviesData = await Promise.all(moviesPromises);
          setSessionTimes(moviesData.map(res => res.data));
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      };

      fetchMovies();
    }
  }, [times]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div> <ul className={styles.sessionTimes}>
        {sessionTimes.map((movie, index) => (

          <li key={index} >
            <div className={styles.movie}>
              <a style={{
                width: "156px"
              }}>
                <img src={movie.coverImg} alt="" />
              </a>
              <div>
                <h2>
                  <a href="">
                    {movie.name}
                  </a>
                </h2>
                <span style={{ display: "flex" }}><span className={styles.min}>
                  {movie.runTime} min |
                </span>
                  <span className={styles.min}>
                    {movie.releaseDate}
                  </span></span>
                <span>{movie.cast}</span>

              </div>
            </div>
            {
              times.data.find((x) => (x.movieId == movie._id)).showTimes.map((x, ii) =>
              (
                <div className={styles.times} key={ii}>
                  <h2>{x.cinemaName}</h2>
                  <ul>
                    {x.showTime.map((s, idxx) => (
                      <li key={idxx}>
                        <a onClick={() => { handleTicket(movie, s, x) }} style={{ display: "flex", flexDirection: "column" }}>
                          <span>
                            {s.formattedTime}
                          </span>
                          <span>{s.tag}</span>
                        </a>
                      </li>
                    )
                    )}
                  </ul>
                </div>
              )
              )
            }
          </li>
        ))}
      </ul></div>
      <div>
        <TicketModall />
      </div>
    </>

  );
};

export default SessionTimes;
