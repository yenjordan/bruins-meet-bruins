//home page, created separate folder pages to have all 5 files in it
//also these files has to be capitalize

import './Landing.css'
import { useState } from 'react'
import AuthUi from '../../components/AuthUi'

const Landing = () => {
    const logToken = false
    const [showAuth, setAuth] = useState(false)     //flag to show the authentiation interface
    const [hasAccount, setAccount] = useState(false) //flag to determine whether UI should show "log in" or "create acc"

    const handleClicks = (loginflag) => {    //log clicks, pass in parameter that will either be true or false
        console.log('click')
        setAuth(true)
        setAccount(loginflag)    //true = create account, false = login  
    }

    return(
        <>
        <div className="landing">
            <h1>Bruin Meets Bruin</h1>
            <h2>Come Meet Other Bruins!</h2>
            <button className="mainButton" onClick={() => handleClicks(true)}>  
                {logToken ? 'Signout' : 'Create an Account'}      
            </button>
            <button className="mainButton" onClick={() => handleClicks(false)} >
                {"Log in"}
            </button>
            {showAuth && (<AuthUi setAuth={setAuth} hasAccount={hasAccount} setAccount={setAccount}/>)}
        </div>
        </>
    )
}

export default Landing