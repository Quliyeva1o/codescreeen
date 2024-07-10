    import React, { useState } from 'react'
    import { Link } from "react-router-dom"
    import { TbMovie } from "react-icons/tb";
    import { IoTicketOutline } from "react-icons/io5";
    import { BiCameraMovie } from "react-icons/bi";
    import { IoCalendarOutline } from "react-icons/io5";
    import CloseIcon from '@mui/icons-material/Close';

    import { CiStar } from "react-icons/ci";
    import MenuIcon from '@mui/icons-material/Menu';
    import PermIdentityIcon from '@mui/icons-material/PermIdentity';
    import styles from './index.module.scss'
    import { useSelector, useDispatch } from "react-redux";

    const AdminAppBar = () => {
        const user = useSelector((state) => state.user);
        const [menu, setmenu] = useState(false)
        const dispatch = useDispatch()
        const handleLogOut = () => {
            dispatch(logout());
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'log out successfully!',
                showConfirmButton: false,
                timer: 1000,
            })
        }
        return (
            <>
                <nav className={menu ? `${styles.navactive}` : `${styles.nav}`}>
                    <div className={styles.close}>
                        <CloseIcon onClick={() => { setmenu(!menu) }} />
                    </div>
                    <div className={styles.logo}>
                        <Link onClick={() => setmenu(false)}>
                            <h1>CODESCREEN</h1>
                        </Link>
                    </div>
                    <ul >
                        <li>
                            <Link onClick={() => setmenu(false)} to="add-movie">
                                <TbMovie />
                                <span >ADD MOVIE</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="edit-movie">
                                <TbMovie />
                                <span >EDIT MOVIE</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="add-session-times">
                                <IoTicketOutline />

                                <span >ADD SESSION TIME</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="add-cinema">
                                <BiCameraMovie />

                                <span >ADD CINEMA</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="add-event">
                                <IoCalendarOutline />

                                <span > ADD EVENT</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="add-trailer">
                                <BiCameraMovie />

                                <span > ADD TRAILER</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setmenu(false)} to="/admin">
                                <CiStar />

                                <span > DASHBOARD</span>
                            </Link>
                        </li>
                    </ul>
        
                </nav>

                <div className={styles.mobile}>
                    <div className={styles.mobilemenu}>
                        <div className={styles.burger}>
                            <MenuIcon onClick={() => { setmenu(!menu) }} />
                        </div>
                    </div>
                    <div className={styles.mobilelogo}>
                        <img src='http://localhost:5050/uploads/codemobile.png' alt="" />
                    </div>
                    <div className={styles.login}>
                        <button onClick={handleLogOut}>
                            <PermIdentityIcon />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </>
        )
    }

    export default AdminAppBar
