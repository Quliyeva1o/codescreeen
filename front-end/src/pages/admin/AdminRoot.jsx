import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminAppBar from '../../Layout/Admin/AdminAppBar';
import styles from './index.module.scss';

const AdminRoot = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate, user]);

  return (
    <>
     <div style={user.role === "admin" ? {display:"flex"}:{}}>
     {user.role === "admin" && <AdminAppBar className={styles.appbar} />}
      <div className={user.role === "admin" ? styles.aa : {}}>
        {/* <Header /> */}
        <Outlet />
      </div>
     </div>
    </>
  );
}

export default AdminRoot;
