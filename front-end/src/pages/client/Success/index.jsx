import { Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBasket } from "../../../redux/BasketSlice";
import { useEffect, useState } from "react";
import controller from "../../../API/requests";
import styles from './index.module.scss'
const Success = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const myBasket = useSelector((state) => state.basket);
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user.id != null) {
      controller.getOne('/api/users', user.id)
        .then((res) => {
          setOrders(res.data.orders);
          setUserDetails(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user.id]);

  useEffect(() => {
    if (userDetails && myBasket.basket.length > 0) {
      const order = [...orders, ...myBasket.basket];
      const newUser = { ...userDetails, orders: order };
      controller.patch('/api/users', user.id, newUser)
        .then((res) => {
          dispatch(setBasket([]));
          localStorage.setItem('basket', JSON.stringify([]));
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
        });
    }
  }, [userDetails, myBasket.basket, user.id]);

  useEffect(() => {
    if (myBasket.basket.length > 0) {
      const tick = {
        cinemaId: myBasket.basket[0].cinemaId,
        movie: myBasket.basket[0].movie,
        tag: myBasket.basket[0].hall,
        time: myBasket.basket[0].time,
        seats: myBasket.basket[0].tickets
      };
      controller.post('/api/tickets', tick)
        .catch((error) => {
          console.error('Error posting ticket data:', error);
        });
    }
  }, [myBasket.basket]);

  return (
    <div className={styles.sc}>
      <div className="container">
        <Result
          status="success"
          title="Payment completed successfully!"
          subTitle="Your order has been successfully completed"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Home Page</Button>
            </Link>,
            <Link to={"/orders"} key="orders">
              <Button>My Orders</Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
