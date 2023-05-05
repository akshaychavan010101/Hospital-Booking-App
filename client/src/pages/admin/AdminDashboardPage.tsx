import AdminDashboard from "../../components/admin/AdminDashboard"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"

function AdminDashboardPage() {
  return (
    <div>
      <Navbar />
      <AdminDashboard/>
      <Footer />
    </div>
  )
}

export default AdminDashboardPage