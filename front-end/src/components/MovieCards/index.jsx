import React, { useEffect, useState } from 'react'
import { useGetMoviesQuery } from '../../redux/MoviesSlice';
import styles from './index.module.scss'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { useGetGenresQuery } from '../../redux/GenresSlice';
import { Link } from 'react-router-dom';
const MovieCards = () => {
    const { data: movies } = useGetMoviesQuery();
    const { data: genres } = useGetGenresQuery();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [myGenres, setMyGenres] = useState([])
    const [myMovies, setMyMovies] = useState([])
    const [modal, setModal] = useState(false)
    useEffect(() => {
        movies && setMyMovies(movies.data)
    }, [movies]);

    useEffect(() => {
        genres && setMyGenres(genres.data)
    }, [genres]);
    
    const handleGenreToggle = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter(id => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    const handleApplyFilters = () => {
        const filtered = myMovies.filter(movie =>
            selectedGenres.some(genreId =>
                movie.genre.toString().includes(genreId)
            )
        );
        setModal(!modal)
        setMyMovies(filtered)
    };
    return (
        <div className={styles.films}>
            <div className={styles.nav}>
                <div className={styles.tabs}><ul>
                    <li>
                        <button type="button" className={`${styles.first} ${styles.isSelected}`}><span >Now Showing</span></button>
                    </li>
                
                </ul></div>
                <div>
                    <div className={styles.filters}>
                        <ul>
                            <li><button type="button" onClick={() => { setModal(true) }}><span><span>Legends &amp; </span>Filters</span></button></li>
                            <li><button type="button"><span>Popularity</span></button></li>
                            {/* <li ><button type="button"></button></li>
                            <li ><button type="button"></button></li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.cards}>
                <ul>{
                    myMovies.map((movie, idx) => {
                        return (<li key={idx}>
                            <div className={styles.wrapper}>
                                <Link to={`/movies/${movie._id}`}>
                                    <img src={movie.coverImg} alt="" />
                                </Link>
                                <div>
                                    <h2>
                                        <Link to={`/movies/${movie._id}`}>
                                            {movie.name}
                                        </Link>
                                    </h2>
                                    <span>
                                        <span>
                                            {movie.runTime} min
                                        </span>
                                        <span>|</span>
                                        <span>{movie.releaseDate}</span>
                                    </span>
                                    <span className={styles.dess}>
                                        {movie.description}
                                    </span>
                                </div>
                            </div>
                        </li>)
                    })}</ul>
            </div>
            <div className={modal ? styles.modalisActive : ""}>   <div className={modal ? styles.modalpanel:""}>
                <div className={styles.modall} style={{ transform: modal ? "translateX(0%)" : "translateX(100%)" }}>
                    <div className={styles.modalcontent}>
                        <div className={styles.header}>
                            <h2>Legend & Filters</h2>
                            <button onClick={() => { setModal(!modal) }}>
                                <CloseIcon />
                            </button>
                        </div>
                        <ul className={styles.ul}>
                            <li>
                                <button>
                                    <span>genre</span>
                                </button>
                            </li>
                        </ul>
                        <FormGroup>
                            <ul className={styles.ull}>
                                {myGenres && myGenres.map((genre) => (
                                    <li   key={genre._id}>
                                        <FormControlLabel
                                          
                                            control={
                                                <Checkbox
                                                    checked={selectedGenres.includes(genre._id)}
                                                    onChange={() => handleGenreToggle(genre._id)}
                                                />
                                            }
                                            label={genre.name}
                                        />
                                    </li>
                                ))}


                            </ul>
                        </FormGroup>

                    </div>
                    <div className={styles.footer}>
                        <button type="button" className={styles.apply} onClick={handleApplyFilters}>Apply Filters</button>
                        <button type="button" className={styles.clear}>Clear selection</button></div>
                </div>
            </div>
                <span></span></div>
        </div>
    )
}

export default MovieCards
