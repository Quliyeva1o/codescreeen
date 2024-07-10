import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import controller from '../../../API/requests';
import styles from './index.module.scss'
const Orders = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user.id != null) {
            controller.getOne('/api/users', user.id)
                .then((res) => {
                    setOrders(res.data.orders);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user.id]);
    console.log(orders);
    return (
        <div className={styles.orders}>
            <h1>tickets</h1>
            {orders.length > 0 && orders.map((order) => {
                return (
                    <div>
                        <p><span>time:</span><span>{order.time}</span></p>
                        <p><span>movie:</span><span>{order.movie}</span></p>
                        <p><span>location:</span><span>{order.location}</span></p>
                        <p><span>price:</span><span>{order.price}</span></p>
                        <p><span>hall:</span><span>{order.hall}</span></p>
                        <p> <span>seats:</span>{order.tickets.map((t) => {
                            return (
                                <>
                                    <span className={styles.seat}>{t}</span>
                                    </>
                            )
                        })}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Orders
