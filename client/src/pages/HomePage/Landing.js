//home page, created separate folder pages to have all 5 files in it
//also these files has to be capitalize

import './Landing.css';
import { useState } from 'react';
import AuthUi from '../../components/AuthUi';

const Landing = () => {
    const logToken = false;
    const [showAuth, setAuth] = useState(false); // Flag to show the authentication interface
    const [hasAccount, setAccount] = useState(false); // Flag to determine whether UI should show "log in" or "create acc"

    const handleClicks = (loginflag) => { // Log clicks, pass in parameter that will either be true or false
        console.log('click');
        setAuth(true);
        setAccount(loginflag); // true = create account, false = login
    };

    return (
        <>
            <div className="landing">
                <h1 className="logo-text">♡ Bruins Meet Bruins ♡</h1>
                <h2>From Royce to Pauley, Find Your Match on the True Blue Path to Love 💙💛</h2>
                <button className="mainButton" onClick={() => handleClicks(true)}>
                    {logToken ? 'Signout' : 'Create an Account'}
                </button>
                <button className="mainButton" onClick={() => handleClicks(false)}>
                    {"Log in"}
                </button>
                {showAuth && (<AuthUi setAuth={setAuth} hasAccount={hasAccount} setAccount={setAccount} />)}
            </div>
        </>
    );
};

export default Landing;
