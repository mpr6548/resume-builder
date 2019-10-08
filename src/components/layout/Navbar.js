import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  

    const authLinks = (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/chests'>Redeem</Link></li>
            <li><Link to='/prizes'>Prizes</Link></li>
            <li><Link to='/dashboard'>Profile</Link></li>
            <li><a onClick={logout} href='#!'>Logout</a></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>New Player</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-navbar">
            <h1>
                <Link to='/'>Level Up+</Link>
            </h1>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
