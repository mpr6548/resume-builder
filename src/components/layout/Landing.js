import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Level Up+</h1>
                <p className="lead">The Spring Venture Group Annual Enrollment Period 2019 company wide competition!</p>
                <div className="buttons">
                    <Link to='/register' className="btn btn-primary">New Player</Link>
                    <Link to='/login' className="btn">Resume Game</Link>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Landing
