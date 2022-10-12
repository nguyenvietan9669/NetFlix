import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Main({children}) {
    return (
        <>
            <Navbar/>
            <div className="Main">{children}</div>
            <Footer/>
        </>
    )
}

export default Main;