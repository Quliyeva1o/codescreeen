import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCinemaByIdQuery } from '../../../redux/CinemasSlice';
import { useGetTimesQuery } from '../../../redux/TimesSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import controller from '../../../API/requests';
import { useDispatch } from 'react-redux';
import  { setTicketModalIsActive } from '../../../redux/TicketModal';
import { setSelectedTickets } from '../../../redux/TicketSlice';
import TicketModall from '../../../Layout/TicketModal';

const CinemaDetail = () => {
  const { id } = useParams();
  const { data: cinema } = useGetCinemaByIdQuery(id);
  const { data: times } = useGetTimesQuery();
  const [myCinema, setMyCinema] = useState(null); 
  const [myTimes, setMyTimes] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const dispatch = useDispatch()

  const handleTicket = (moviee, timee, cinemaa) => {
    dispatch(setSelectedTickets({ time: timee, movie: moviee, cinema: cinemaa }));
    dispatch(setTicketModalIsActive(true));
  };
  
  useEffect(() => {
    if (cinema) {
      setMyCinema(cinema.data);
      const filteredTimes = times?.data.filter(movie => (
        movie.showTimes.some(showTime => showTime.cinemaId === cinema.data._id)
      ));
      setMyTimes(filteredTimes);
      fetchData(filteredTimes);
    }
  }, [cinema, times]);

  async function fetchData(filteredTimes) {
    try {
      const promises = filteredTimes.map(async (x) => {
        const res = await controller.getOne('/api/movies', x.movieId);
        return res.data;
      });
      const results = await Promise.all(promises);
      setFilteredMovies(results);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
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

  const [value, setValue] = useState(0);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  if (!myCinema) {
    return null; // or render a loading indicator if needed
  }

  return (
    <>
      <div>
        <div className={styles.hero}>
          <div className={styles.foreground}>
            <div className={styles.wrapper}>
              <h1>{myCinema.name}</h1>
              <p>{myCinema.address}</p>
              <div>
                <a href={myCinema.map} target="_blank" rel="noopener noreferrer">
                  <span>Get directions</span>
                </a>
              </div>
            </div>
          </div>
          <span className={styles.scrim}></span>
          <img src={myCinema.img} alt="" />
        </div>
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Sessions" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ul className={styles.sessionTimes}>
            {filteredMovies.map((movie, index) => (
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
                      <span className={styles.min}>{movie.runTime} min |</span>
                      <span className={styles.min}>{movie.releaseDate}</span>
                    </span>
                    <span>{movie.cast}</span>
                  </div>
                </div>
                {/* Display show times for the movie */}
                {myTimes.filter((x)=>x.movieId==movie._id).map((time, ii) => {
                  return (
                    time.showTimes.map((show, idxx) => {
                      
                      return (
                        show.cinemaId == myCinema._id ? 
                        <div className={styles.times} key={idxx}>
                          <ul >
                           {show.showTime.map((s)=>{return(
                             <li key={s._id}>
                             <a
                               onClick={() => {
                                 handleTicket(movie, s, show);
                               }}
                               style={{ display: 'flex', flexDirection: 'column' }}
                             >
                               <span>{s.formattedTime}</span>
                               <span>{s.tag}</span>
                             </a>
                           </li>
                           )})}
                          </ul>
                        </div> : <></>
                      )
                    })
                  )
                })}
              </li>
            ))}
          </ul>
        </CustomTabPanel>
     
        <CustomTabPanel value={value} index={1}>
          <div className={styles.det}>
            <div>
              <div className={styles.cont}>
                <div className={styles.map}>
                  <div className={styles.mapembed}>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d51398.91544229753!2d151.15498143645755!3d-33.88157738364286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d-33.8850327!2d151.1949378!4m3!3m2!1d-33.883258999999995!2d151.19404!5e0!3m2!1sen!2saz!4v1719742441220!5m2!1sen!2saz" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                  </div>
                  <div className={styles.mapdetails}>
                    <div>
                      <h2>Where to find us</h2>
                      <p>{myCinema.address}</p>
                      <p>
                        <a href={`tel:${myCinema.phone}`}>{myCinema.phone}</a>
                        <br />
                        <a href={myCinema.map}>Get Directions</a>
                      </p>
                      <h3>Parking</h3>
                      <p>{myCinema.parking}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
      <TicketModall/>
    </>
  );
};

export default CinemaDetail;
