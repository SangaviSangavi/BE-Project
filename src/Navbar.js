import { Link } from "react-router-dom"
import './App.css'
 
const Navbar = () => {

    return(
        <header>
            <nav>
                <div className='sidebar'>
               <div className='sidebar-menus'>
                <Link to = '/'>Doner Registration</Link>
                <Link to='/Donertable'>Doner Details</Link>
                <Link to='/Wantedreg'> Blood  Registration</Link>
                <Link to='/Wantedtable' > Patient Details </Link>

                
                </div>
                </div> 
            </nav>
        </header>
  
    )

}
export default Navbar;