import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-navbar">
        <h1>
            <Link to='/'>Level Up+</Link>
        </h1>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>New Player</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    </nav>
    )
}

export default Navbar
