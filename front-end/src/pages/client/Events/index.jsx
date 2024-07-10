import React from 'react'
import { useGetEventsQuery } from '../../../redux/EventsSlice';
import Hero from '../../../components/Hero'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'
import { Link } from 'react-router-dom';
const Events = () => {
  const { data: events, error, isLoading, refetch } = useGetEventsQuery();
  return (
    <div>
      <Hero />
      <div className="heading">
        <h2>Something for everyone</h2>
        <div className={styles.cards}>
          {
            events && events.data.map((event, idx) => {
              return (
                <div className={styles.gap} key={idx}>
                <Link to={`/events/${event._id}`}>
                <Card sx={{ maxWidth: 345 }} key={idx} className={styles.card}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image={event.coverImg}
                    title={event.title}
                  />
                  <CardContent>
                    <h5>
                      {event.title}
                      </h5>
                    <Typography variant="body2" color="text.secondary">
                      {event.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Find out more</Button>
                  </CardActions>
                </Card></Link>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}

export default Events
