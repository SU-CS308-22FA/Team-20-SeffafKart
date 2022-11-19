import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {MenuItems} from './MenuItems';
import { useDispatch, useSelector } from "react-redux";
import './Navbar.css'
import {logoutUser} from '../redux/userSlice'


function Navbar () {
    const path = window.location.pathname
    const user = useSelector((state) => state.user.currentUser);
    console.log(user)
    const isLogin = useSelector((state) => state.user.isLogin);
    console.log(isLogin)
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked)
    }

    const handleLogout = async (e) => {
        dispatch(logoutUser());
        console.log("dis")
        console.log(isLogin)
    }

    

    return(
        <nav className='NavbarItems'>
            <Link to="/" style={{textDecoration:'none'}}><h1 className='navbar-logo'>ŞEFFAF KART</h1></Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link className="nav-links" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-links" to="/archive">
                        Archive
                    </Link>
                </li>
                <li>
                    <Link className="nav-links" to="/games">
                        Matches
                    </Link>
                </li>
                <li>
                    <Link className="nav-links" to="/sign-up">
                        Sign Up
                    </Link>
                </li>
                {isLogin? (
                <>
                <li>
                    <Link className="nav-links" to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link className="nav-links" to="/" onClick={handleLogout}>
                        Log out
                    </Link>
                </li>
                </>) : (
                <li>
                    <Link className="nav-links" to="/login">
                        Login
                    </Link>
                </li>
                )}
            </ul>
        </nav>
    )
    
}

export default Navbar
