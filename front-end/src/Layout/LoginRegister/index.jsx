import React, { useState } from 'react'
import styles from './index.module.scss'
import Login from '../Login'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginIsActive, setLoginIsActive } from '../../redux/LoginActiveBtnSlice';
import Register from '../Register';
const LoginRegister = () => {
  const loginIsActive = useSelector(selectLoginIsActive);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setLoginIsActive(!loginIsActive));
  }
  const [login, setLogin] = useState(true)
  return (
    <>
      <div className={styles.modall}>
        <div className={styles.modal} style={{ transform: loginIsActive ? "translateX(0%)" : "translateX(100%)" }}>
          <div>
            <button className={styles.close} onClick={handleClose}>
              <CloseIcon />
            </button>
            <h1>CODESCREEN</h1>
            <div>
              {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginRegister
