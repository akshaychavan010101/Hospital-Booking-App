import Nav from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import OurTeam from '../../components/OurDoctors/OurDoctors'
function Ourdoctors() {

  // need to fetch here and pass the data and useState to the OurTeam component and searchbar component as props so that search functionality can update the state of the OurTeam component and the OurTeam component can render the data from the state

  return (
    <div>
        <Nav/>
        <OurTeam/>
        <Footer/>
    </div>
  )
}

export default Ourdoctors