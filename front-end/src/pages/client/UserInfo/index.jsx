import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import controller from '../../../API/requests';
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
const UserInfo = () => {
  const user = useSelector((state) => state.user); 
  const navigate=useNavigate()
  const [userr, setUser] = useState(null); 
  useEffect(() => {

    if (user.id) {
      controller.getOne('/api/users', user.id)
        .then((res) => {
          setUser(res.data); 
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
    else{
      navigate('/')
    }
  }, [user]); 
  return (
    <div className={styles.info}>
      {userr && ( 
        <div>
          <h2>User Information</h2>
          <p><strong>Username:</strong> {userr.username}</p>
          <p><strong>Email:</strong> {userr.email}</p>
          <p><strong>Role:</strong> {userr.role}</p>
          <p><strong>Registration Date:</strong> {new Date(userr.createdAt).toLocaleDateString()}</p>
          <p><strong>Receive Offers:</strong> {userr.receiveOffers ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
