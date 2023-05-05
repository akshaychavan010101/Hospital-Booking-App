import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import UserDashboard from '../../components/userDashboard/UserDashboard'

function UserDashboardPage() {
  return (
    <div>
      <Navbar />
      <UserDashboard/>
      <Footer />
    </div>
  )
}

export default UserDashboardPage