import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.module.scss";
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useGetEventsQuery } from '../../redux/EventsSlice';
import React, { useEffect, useState } from 'react';
const EventsFestivals = () => {
  const { data: events, error, isLoading, refetch } = useGetEventsQuery();
  const navigate = useNavigate()
  const [myEvents, setMyEvents] = useState([])
  useEffect(() => {
    events && setMyEvents(events.data)
  }, [events]);
  return (
    <>
      <div className="heading">
        <h2>
          Events & Festivals</h2>
        <button onClick={()=>{navigate("/events")}}>
          <span>Browse all</span>
        </button>
      </div>
      <div className="slider">
        <Swiper

          slidesPerView={3}
          spaceBetween={15}
          navigation={true}

          modules={[Navigation]}
          className={`mySwiper ${styles.swiper}`}
        >
          {myEvents && myEvents.map((event) => (
            <SwiperSlide className={styles.swiperSlide} key={event._id}>
              <Link to={`/events/${event._id}`}>
                <div>
                  <div className={styles.img}>
                    <img src={event.coverImg} alt={event.title} />
                  </div>
                  <div className={styles.textContent}>
                    <span style={{ maxHeight: '67px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {event.description}
                    </span>
                  </div>
                </div>
                <span className={styles.span}></span>
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </>
  )
}

export default EventsFestivals
