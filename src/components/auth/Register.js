import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'



const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;    

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password })
        }
    }


    return (
        <Fragment>
            <h1 className="large text-primary">Sing Up</h1>
            <p className="lead"><i className="fas fa-user"></i>
                Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name='name' 
                        value={name} 
                        onChange={ e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name='email'
                        value={email}
                        onChange={ e => onChange(e) }
                        required
                    />
                    <small className="form-text">Use your work email address</small>
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name='password'
                        value={password}
                        onChange={ e => onChange(e) }
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        name='password2'
                        value={password2}
                        onChange={ e => onChange(e) }
                        required
                    />
                </div>
                    <input type="submit" value="Register" className="btn btn-dark" />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};


export default connect(null, { setAlert, register })(Register);
