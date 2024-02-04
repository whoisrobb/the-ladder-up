import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='px-12 mobile:p-4'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout