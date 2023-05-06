import Carousel from '../../components/Carousel/Carousel'
import Contact from '../../components/HomePageMiddleSection/Contact'
import HomeMiddleComp from '../../components/HomePageMiddleSection/HomeMiddleComp'
import PatientReviews from '../../components/HomePageMiddleSection/PatientReviews'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/navbar/Navbar'

function HomePage() {
  return (
    <>
      <Nav />
      <Carousel />
      <HomeMiddleComp />
      <PatientReviews />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage