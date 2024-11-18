//component that pops up an interface when user either clicks login / create an account
import { useState, useEffect } from 'react'


const AuthUi = ({ setAuth, hasAccount }) => {
    const [email, setEmail]  = useState('')
    const [password, setPassword] = useState('')
    const [passcheck, setPasswordCheck] = useState('')
    const [errormessage, setError] = useState(null)

    console.log(email, password, passcheck) 

    const handleClick = () => {
        setAuth(false)
    }

    useEffect(() => {
        setEmail('');
        setPassword('');
        setPasswordCheck('');
        setError(null);
    }, [hasAccount]);

    const handlelogin = (e) => {
        e.preventDefault()
        try{        //checks for passwords matching
            if(hasAccount && (password !== passcheck)){
                setError('Passwords do not match! Please try again.')
                return
            }
            console.log('Successfully submitted');
        }
        catch(error){
            console.log(error)
        }
    }
    return( //Interface for logging and signing in
        <div className="auth_Ui">       
            <div onClick={handleClick}>⨂</div>
            <h2>{hasAccount ? 'Create Your Account!' : 'Log In'}</h2>   
        <form onSubmit={handlelogin}> 
            <input      
                type = "email" 
                id = "email"
                name = "email"
                placeholder= "Enter email"
                value = {email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type = "password"
                id = "password"
                name = "password"
                placeholder= "Enter password"
                value = {password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            />
            {hasAccount && <input       // if we are signing in, then we only need username and password
                type = "password"
                id = "passcheck"
                name = "passcheck"
                placeholder="Confirm your pasword"
                value = {passcheck}
                required={true}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />}
            <input className="otherButton" type = "submit"/>
            <p>{errormessage}</p>   
        </form>
        </div>
        
    )
}

export default AuthUi  