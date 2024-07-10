import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
const FoodsDrinks = () => {
    return (
        <div>
            <div className={styles.hero}>

                <img src="https://imgix.hoyts.com.au/food-and-beverage/treatcity-overlayheader-4000x3000.png?fit=crop&auto=compress%2cformat&crop=focalpoint&fp-x=0.48&fp-y=0.45&w=1400&h=400" />
                <div className={styles.heading}>
                    <h2>
                        Food & Drink
                    </h2>
                    <span>
                    </span>
                </div>
            </div>

            <div className={styles.desc}>
                <p>
                    A trip to the movies is nothing without all your favourite Candy Bar treats. We’ve got something for every tastebud. Discover our food and beverage offers today.
                </p>
            </div>
            <div className={styles.partners}>
                <h2>
                    Our Partners
                </h2>
                <div className={styles.cards}>
                <div className={styles.gap}>
                <Link to={`/events/ben-and-jerrys`}>
                <Card sx={{ maxWidth: 345 }} className={styles.card}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image="https://imgix.hoyts.com.au/experiences/thumbnails/bjresize--media-releases-thumbnail-image-v1.png?fit=crop&auto=compress%2cformat&w=592&h=400"
                    title="Ben & Jerry's"
                  />
                  <CardContent className={styles.content}>
                    <h5>
                    Ben & Jerry's
                      </h5>
                    <Typography variant="body2" color="text.secondary">
                    Visit a Ben & Jerry's Scoop Store before or after your movie at HOYTS!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Find out more</Button>
                  </CardActions>
                </Card></Link>
                </div>
                <div className={styles.gap}>
                <Link to={`/events/ben-jerrys-ice-cream-cakes`}>
                <Card sx={{ maxWidth: 345 }} className={styles.card}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image="https://imgix.hoyts.com.au/experiences/fb-bj-pageheromobile-v2.png?fit=crop&auto=compress%2cformat&w=592&h=400"
                    title="Ben & Jerry's Ice Cream Cakes"
                  />
                  <CardContent className={styles.content}>
                    <h5>
                    Ben & Jerry's Ice Cream Cakes
                      </h5>
                    <Typography variant="body2" color="text.secondary">
                    Looking to bring the WOW to your next event?
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Find out more</Button>
                  </CardActions>
                </Card></Link>
                </div>
                <div className={styles.gap}>
                <Link to={`/events/baskin-robbins`}>
                <Card sx={{ maxWidth: 345 }} className={styles.card}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image="https://imgix.hoyts.com.au/experiences/baskin-robbins-thumbnail.png?fit=crop&auto=compress%2cformat&w=592&h=400"
                    title="Baskin Robbins - the world's favourite ice cream"
                  />
                  <CardContent className={styles.content}>
                    <h5>
                    Baskin Robbins - the world's favourite ice cream
                      </h5>
                    <Typography variant="body2" color="text.secondary">
                    Baskin Robbins specialty stores are now available at select HOYTS locations.
                    </Typography>
                  </CardContent >
                  <CardActions>
                    <Button size="small">Find out more</Button>
                  </CardActions>
                </Card></Link>
                </div>
                <div className={styles.gap}>
                <Link to={`/events/ben-and-jerrys`}>
                <Card sx={{ maxWidth: 345 }} className={styles.card}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image="https://imgix.hoyts.com.au/experiences/chur-burger--card.jpg?fit=crop&auto=compress%2cformat&w=592&h=400"
                    title="Chur Burger at HOYTS Chadstone"
                  />
                  <CardContent className={styles.content}>
                    <h5>
                    Chur Burger at HOYTS Chadstone
                      </h5>
                    <Typography variant="body2" color="text.secondary">
                    Dine in at Chur Burger Chadstone before or after your movie or even take it into the cinema with you!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Find out more</Button>
                  </CardActions>
                </Card></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default FoodsDrinks
