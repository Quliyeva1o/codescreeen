import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import { useGetCinemasQuery } from '../../redux/CinemasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCinemaModalIsActive } from '../../redux/CinemaModal';
import { setSelectedCinemas } from '../../redux/SelectedCinemas';
import CheckIcon from '@mui/icons-material/Check';
const CinemasModal = () => {
    const states = [
        { value: "ACT", label: "ACT" },
        { value: "NSW", label: "NSW" },
        { value: "QLD", label: "QLD" },
        { value: "SA", label: "SA" },
        { value: "VIC", label: "VIC" },
        { value: "WA", label: "WA" },
    ];

    const cinemaModal = useSelector((state) => state.cinemaModal);
    const dispatch = useDispatch();
    const { data: cinemas, error, isLoading } = useGetCinemasQuery();
    const [myCinemas, setMyCinemas] = useState([]);
    const [selectedState, setSelectedState] = useState('NSW');
    const [checkedCinemas, setCheckedCinemas] = useState({});
    const modalContentRef = useRef(null);

    useEffect(() => {
        if (cinemas && cinemas.data) {
            setMyCinemas(cinemas.data);
        }
    }, [cinemas]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                dispatch(setCinemaModalIsActive(false));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    const filteredCinemas = myCinemas.filter(cinema => cinema.location === selectedState);

    const handleCheckboxChange = (cinemaId) => {
        setCheckedCinemas(prevCheckedCinemas => ({
            ...prevCheckedCinemas,
            [cinemaId]: !prevCheckedCinemas[cinemaId]
        }));

    };

    const handleLogCheckedCinemas = () => {
        const checkedCinemaIds = Object.keys(checkedCinemas).filter(cinemaId => checkedCinemas[cinemaId]);
        dispatch(setSelectedCinemas(checkedCinemaIds))
        dispatch(setCinemaModalIsActive(false));

    };

    const handleStateChange = (state) => {
        setSelectedState(state);
    };

    return (
        <div className={cinemaModal.cinemaModalIsActive && styles.modalIsActive}>
            <div className={styles.modal} style={{ transform: cinemaModal.cinemaModalIsActive ? "translateX(0%)" : "translateX(100%)" }} ref={modalContentRef}>
                <div className={styles.modalContent} >
                    <div className={styles.modalHeader}>
                        <h2>Select Cinemas</h2>
                        <button type="button" onClick={() => dispatch(setCinemaModalIsActive(false))}>Close</button>
                    </div>
                    <ul className={styles.states}>
                        {states.map(state => (
                            <li key={state.value}>
                                <button className={state.value === selectedState ? styles.active : ''} onClick={() => handleStateChange(state.value)}>
                                    <span>
                                        {state.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.cinemasList}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error fetching cinemas.</p>
                        ) : (
                            <ul>
                                {filteredCinemas.map(cinema => (
                                    <li key={cinema._id}>
                                        <div>
                                            <label htmlFor={cinema._id}>{cinema.name}
                                                <CheckIcon className={styles.svg} style={{ opacity: checkedCinemas[cinema._id] ? '1' : '0' }} /></label>
                                            <input
                                                id={cinema._id}
                                                type="checkbox"
                                                checked={checkedCinemas[cinema._id] || false}
                                                onChange={() => handleCheckboxChange(cinema._id)}


                                            />

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
                <div className={styles.modalFooter}>
                    <button type="button" onClick={handleLogCheckedCinemas}>Check Cinemas</button>
                </div>
            </div>
            <span></span>
        </div>
    );
};

export default CinemasModal;
