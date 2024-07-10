import React from 'react'
import { Link } from "react-router-dom"
import { TbMovie } from "react-icons/tb";
import { IoTicketOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginIsActive } from '../../redux/LoginActiveBtnSlice';
const AppBar = ({ menu, setMenu }) => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const handle = () => {
        dispatch(setLoginIsActive(true))
    }
    return (
        <>
            <nav className={menu ? `${styles.navactive}` : `${styles.nav}`}>

                <div style={{ position: "fixed" }}>
                    <div className={styles.logo}>
                        <Link onClick={() => setMenu(false)}>
                            <img src="http://localhost:5050/uploads/code.png" alt="" />
                        </Link>
                    </div>
                    <div className={styles.close}>
                        <CloseIcon onClick={() => { setMenu(!menu) }} />
                    </div>
                    <ul >
                        <li>
                            <Link onClick={() => setMenu(false)} to="movies">
                                <TbMovie />

                                <span >MOVIES</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenu(false)} to="session-times">
                                <IoTicketOutline />

                                <span >SESSION TIMES</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenu(false)} to="cinemas">
                                <BiCameraMovie />

                                <span >CINEMAS</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenu(false)} to="events">
                                <IoCalendarOutline />

                                <span >EVENTS & FESTIVALS</span>
                            </Link>
                        </li>

                        {user.id != null && <li>
                            <Link onClick={() => setMenu(false)} to="info">
                                <PermIdentityIcon />
                                <span >PROFILE</span>
                            </Link>
                        </li>}



                    </ul>
                    <ul className={styles.secondUl}>
                        {user.id != null ? <li>
                            <Link onClick={() => setMenu(false)} to="tickets">

                                <span >Tickets</span>
                            </Link>
                        </li> : <li><Link onClick={handle}> <span >Tickets</span></Link></li>
                        }
                        {user.id != null ? <li>
                            <Link to="orders">
                                <span >Orders</span>
                            </Link>
                        </li> : <li> <Link onClick={handle}> <span >Orders</span></Link></li>
                        }

                        <li>
                            <Link  onClick={() => setMenu(false)} to="food-and-drinks">
                                <span >Food & Drink</span>
                            </Link>
                        </li>
                        <li>
                            <Link  onClick={() => setMenu(false)} to="events">
                                <span >Functions & Parties</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </nav>
        </>
    )
}

export default AppBar
