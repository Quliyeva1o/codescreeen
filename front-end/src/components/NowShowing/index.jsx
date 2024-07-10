import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.module.scss";
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from '../../redux/MoviesSlice';
import { setCinemaModalIsActive } from '../../redux/CinemaModal';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTimesQuery } from '../../redux/TimesSlice';

const NowShowing = () => {
  const selectedCinemas = useSelector((state) => state.selectedCinemas);

  const cinemaModal = useSelector((state) => state.cinemaModal);
  const dispatch = useDispatch()
  const { data: movies } = useGetMoviesQuery();
  const { data: times } = useGetTimesQuery();
  const [myMovies, setMyMovies] = useState([])
  useEffect(() => {
    movies && setMyMovies(movies.data)
  }, [movies]);
  const handleCinemas = () => {
    dispatch(setCinemaModalIsActive(!cinemaModal.cinemaModalIsActive));

  }

  return (
    <>
      <div className="heading">
        <h2>Now Showing</h2>
        {/* <button onClick={handleCinemas}><span>Add cinemas</span></button> */}
      </div>
      <div className="slider">
        <Swiper

          slidesPerView={7}
          spaceBetween={15}
          navigation={true}

          modules={[Navigation]}
          className={`mySwiper ${styles.swiper}`}
        >
          {myMovies && myMovies.map((movie) => (
            <SwiperSlide className={styles.swiperSlide} key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <div >
                  <div className={styles.img}>
                    <img src={movie.coverImg} alt={movie.title} />
                  </div>
                  <div className={styles.textContent}>
                    <h2>
                      <Link>
                        {movie.name}
                      </Link>
                    </h2>
                  </div>
                </div></Link>
            </SwiperSlide>
          ))}


        </Swiper>

      </div>

    </>
  )
}

export default NowShowing
