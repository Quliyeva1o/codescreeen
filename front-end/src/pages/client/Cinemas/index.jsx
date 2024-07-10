import React, { useState } from 'react';
import "./index.module.scss";
import { useEffect } from 'react';
import { useGetCinemasQuery } from '../../../redux/CinemasSlice';
import { Link } from 'react-router-dom';
import styles from "./index.module.scss"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
const Cinemas = () => {
  const { data: cinemas, error, isLoading, refetch } = useGetCinemasQuery();
  const [myCinemas, setMyCinemas] = useState([])
  useEffect(() => {
    cinemas && setMyCinemas(cinemas.data)
  }, [cinemas]);
 
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  const states = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "QLD", label: "QLD" },
    { value: "SA", label: "SA" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const NSWCinemas = myCinemas.filter((x) => (x.location == "NSW"))
  const ACTinemas = myCinemas.filter((x) => (x.location == "ACT"))
  const QLDCinemas = myCinemas.filter((x) => (x.location == "QLD"))
  const SACinemas = myCinemas.filter((x) => (x.location == "SA"))
  const VICCinemas = myCinemas.filter((x) => (x.location == "VIC"))
  const WACinemas = myCinemas.filter((x) => (x.location == "WA"))

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="heading">
        <h2>Cinemas
        </h2>
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs className={styles.tabs} value={value} onChange={handleChange} aria-label="basic tabs example">
            {states.map((state) => {
              return (<Tab className={styles.tab} label={state.label} {...a11yProps(state.value)} />)
            })}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>

          <div className={styles.cards}>
            {

              ACTinemas && ACTinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>

          <div className={styles.cards}>
            {

              NSWCinemas && NSWCinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>

          <div className={styles.cards}>
            {

              QLDCinemas && QLDCinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>

          <div className={styles.cards}>
            {

              SACinemas && SACinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>

          <div className={styles.cards}>
            {

              VICCinemas && VICCinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>

          <div className={styles.cards}>
            {

              WACinemas && WACinemas.map((cinema) => (
                <div className={styles.card} key={cinema._id}>
                  <img src={cinema.img} alt={cinema.title} />
                  <div>
                    <h2>
                      <Link to={`/cinemas/${cinema._id}`}><span>{cinema.name}</span></Link>
                    </h2>
                    <ul>
                      {cinema.tags && cinema.tags[0].split(',').map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                    <div>
                      <Link to={`/cinemas/${cinema._id}`}>More details</Link></div></div>
                </div>
              ))}

          </div>
        </CustomTabPanel>
      </Box>
    </>
  )
}

export default Cinemas
