import {useState} from 'react';
import './CreateProfile.css'

export default function Profile() {
    const[fName, setfName] = useState('');
    const[lName, setlName] = useState('');
    const[age, setAge] = useState('');
    const[aboutMe, setAboutMe] = useState('');
    const[error, setError] = useState('')
    const[successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!fName || !lName || !age || !aboutMe){
            setError("Please fill out all fields.");
            return;
        }
        setError('');
        

        try{
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/profile/createProfile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            },

                body: JSON.stringify({
                    firstName: fName,
                    lastName: lName,
                    age,
                    bio: aboutMe,
                }),
        });

            const result = await response.json();
            if (response.ok){
                setSuccessMessage('Profile has successfully been created!');
                setfName('');
                setlName('');
                setAboutMe('');
                setAge('');
            }else{
                setError(result.message || 'Failed to create profile');
            }
        } catch (err){
            console.error('Error:', err);
            setError('An error occurred while creating the profile.');
        }

    };


    return (
        
        <form onSubmit={handleSubmit} className='form-container'>
            
            <h1>Create your Profile</h1>
            <div className='form-field'>
                <label htmlFor="name">First Name</label>
                <input value={fName} onChange={(e) => setfName(e.target.value)} placeholder='Joe' id='firstName' />
            </div>
            <div className='form-field'>
                <label htmlFor="lName">Last Name</label>
                <input value={lName} onChange={(e) => setlName(e.target.value)} placeholder='Bruin' id='lastName' />
            </div>
            <div className='form-field'>
                <label htmlFor="age">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} placeholder='18' id='age' />
            </div>
            <div className='form-field'>
                <label htmlFor="aboutMe">About Me</label>
                <input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder='About Me' id='aboutMe' />
            </div>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className='successMessage'>{successMessage}</div>}
            <button type="submit">Create Profile</button>
            
        </form>

    )
}