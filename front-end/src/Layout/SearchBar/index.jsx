import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useGetMoviesQuery } from '../../redux/MoviesSlice';
import { useGetCinemasQuery } from '../../redux/CinemasSlice';
import { useSelector, useDispatch } from "react-redux";
import { selectLoginIsActive, setLoginIsActive } from "../../redux/LoginActiveBtnSlice";
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../redux/UserSlice';
import { Link } from 'react-router-dom';
const Header = ({ menu, setMenu }) => {

  const [isActive, setIsActive] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const { data: cinemas } = useGetCinemasQuery();
  const [myCinemas, setMyCinemas] = useState([]);
  const loginIsActive = useSelector(selectLoginIsActive);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (cinemas) {
      setMyCinemas(cinemas.data);
    }
  }, [cinemas]);

  const { data: movies } = useGetMoviesQuery();
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    if (movies) {
      setMyMovies(movies.data);
    }
  }, [movies]);

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
  const handleInputFocus = () => {
    setIsActive(true);
  };



  const handleSearch = (value) => {
    const filteredMovies = myMovies.filter(movie =>
      movie.name.toLowerCase().includes(value.toLowerCase()) ||
      movie.description.toLowerCase().includes(value.toLowerCase())
    );

    const filteredCinemas = myCinemas.filter(cinema =>
      cinema.name.toLowerCase().includes(value.toLowerCase())
    );

    const combinedResults = [...filteredMovies, ...filteredCinemas];
    setSearchItems(combinedResults);
  };

  const handleLogin = () => {
    dispatch(setLoginIsActive(!loginIsActive));
  };

  return (
    <>
      <div className={`${styles.header} ${isActive ? styles.isActive : ''}`}>
        <div className={styles.search}>
          <div>
            <button className={styles.sear}><SearchIcon /></button>
            <button type='button' className={styles.clear} onClick={() => { setIsActive(false) }}>Clear</button>
            <label>Enter search terms</label>
            <input
              placeholder="Search movies and more..."
              autoComplete="off"
              onFocus={handleInputFocus}
              // onBlur={handleInputBlur}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {isActive && searchItems.length > 0 && (
            <div className={styles.results}>
              <ul>
                {searchItems.map(item => (
                  <Link to={`/movies/${item._id}`} onClick={() => {
                    setIsActive(false);
                  }}>
                    <li key={item.id}>
                      <a href="">{item.coverImg && <img src={item.coverImg} alt={item.name} />}</a>
                      <div>
                        <a href="#">{item.name}</a>
                        <span>{item.description}</span>
                      </div>
                    </li></Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.mobile}>
          <div className={styles.mobilemenu}>
            <div className={styles.burger}>
              <MenuIcon onClick={() => { setMenu(!menu) }} />
            </div>
          </div>
          <div className={styles.mobilelogo}>
            <img src='http://localhost:5050/uploads/codemobile.png' alt="" />
          </div>
          <div className={styles.login}>
            {user.id == null ? <button onClick={handleLogin}>
              <PermIdentityIcon />
              <span>Log In</span>
            </button> : <button onClick={handleLogOut}>
              <PermIdentityIcon />
              <span>Log Out</span>
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
