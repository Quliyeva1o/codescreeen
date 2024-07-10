import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss'
const Tickets = () => {
    const myBasket = useSelector((state) => state.basket);

    const handleCheckout = async () => {
        try {
            const basketItems = myBasket.basket.map(item => ({
                tickets: item.tickets,
                hall: item.hall,
                time: item.time,
                movie: item.movie,
                location: item.location,
                cinemaId: item.cinemaId,
                price: item.price,
                movieId: item.movieId
            }));

            const response = await fetch('http://localhost:5050/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products: basketItems }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const session = await response.json();
            window.location = `${session.url}`;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className={styles.tickets}>
            {
                myBasket.basket.length > 0 ? myBasket.basket.map((item, index) => (
                    <div key={index}>
                        <p>
                            <span>Hall:</span>
                            <span>{item.hall}</span>
                        </p>
                        <p>
                            <span>Location:</span>
                            <span>{item.location}</span>
                        </p>
                        <p>
                            <span>Movie:</span>
                            <span>{item.movie}</span>
                        </p>
                        <p>
                            <span>Session Time:</span>
                            <span>{item.time}</span>
                        </p>
                        <p>
                            <span>Price:</span>
                            <span>{item.price}</span>
                        </p>
                        <p>
                            tickets:{
                                item.tickets.map((t) => {
                                    return (<span className={styles.seat}>{t}</span>)
                                })
                            }
                        </p>
                    </div>
                ))
                    : <>
                    <h1>you haven't any tickets...</h1>
                    </>
            }
            {myBasket.basket.length > 0 && <button onClick={handleCheckout}>Proceed to Checkout</button>}
        </div >
    );
};

export default Tickets;
