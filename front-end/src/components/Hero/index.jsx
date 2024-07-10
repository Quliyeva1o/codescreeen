import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.module.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from '../../redux/MoviesSlice';
const Hero = () => {

  const { data: movies, error, isLoading, refetch } = useGetMoviesQuery();
  const [myMovies, setMyMovies] = useState([])
  useEffect(() => {
    movies && setMyMovies(movies.data)
  }, [movies]);


  return (
    <>
      <div className={styles.hero}>
        <div className={styles.paginationContainer}>

          <Swiper
            slidesPerView={'auto'}
            spaceBetween={20}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}

            modules={[Navigation, Pagination]}

            className={`mySwiper ${styles.swiper}`}
            navigation={true}
          >
            {myMovies && myMovies.filter((x) => (x._id != "6683315e1a2c7772e29fe059" && x._id != '668330191a2c7772e29fe044')).map((movie) => (
              <SwiperSlide className={styles.swiperSlide} key={movie._id}>
                <Link to={`/movies/${movie._id}`}>
                  <div >
                    <div className={styles.textContent}>
                      <h1>
                        {movie.name}
                      </h1>
                      <p>
                        {movie.description}
                      </p>
                    </div>
                    <div className="img">
                      <img src={movie.bgImg} alt={movie.name} />
                    </div>
                  </div>
                  <div className={styles.span}></div></Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-pagination-custom"></div>
      </div>
    </>
  )
}

export default Hero
