import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../../Layout/AppBar';
import Header from '../../Layout/SearchBar';
import { selectLoginIsActive } from '../../redux/LoginActiveBtnSlice';
import LoginRegister from '../../Layout/LoginRegister';
import styles from "./index.module.scss"
import { useSelector } from 'react-redux';
import Chat from '../../Layout/Chat';
const RootPage = () => {
    const loginIsActive = useSelector(selectLoginIsActive);
    const [menu, setMenu] = useState(false)
    return (
        <>
            <div className={styles.root}>
                <div className={styles.df}>
                    <AppBar className={styles.appbar} menu={menu} setMenu={setMenu} />
                    <div className={styles.out}>
                        <Header menu={menu} setMenu={setMenu}/>
                        <Outlet />
                    </div>

                </div> 
                <div className={loginIsActive ? styles.log:""} >
                    <LoginRegister />
                </div>
                {/* <div className={styles.chat}>
                    <Chat />
                </div> */}
            </div>
        </>
    );
};

export default RootPage;
