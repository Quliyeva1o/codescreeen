import React from 'react'
import Hero from '../../../components/Hero'
import NowShowing from '../../../components/NowShowing'
import EventsFestivals from '../../../components/Events'
import ScreenExperiences from '../../../components/ScreenExperiences'
import styles from './index.module.scss'
import CinemasModal from '../../../Layout/CinemasModal'
const Home = () => {
  return (
    <>
      <Hero />
     <div className={styles.home}>
     <NowShowing />
      <EventsFestivals/>
      <ScreenExperiences/>
      <CinemasModal />

     </div>
    </>
  )
}

export default Home
