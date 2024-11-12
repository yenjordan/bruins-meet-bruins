import {useState} from 'react';
import './CreateProfile.css'

export default function Profile() {
    const[fName, setfName] = useState('');
    const[lName, setlName] = useState('');
    const[age, setAge] = useState('');
    const[aboutMe, setAboutMe] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fName);
    }


    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>Create your Profile</h1>
            <div className='form-field'>
                <label for="name">First Name</label>
                <input value={fName} onChange={(e) => setfName(e.target.value)} placeholder='Joe' id='firstName' />
            </div>
            <div className='form-field'>
                <label for="lName">Last Name</label>
                <input value={lName} onChange={(e) => setlName(e.target.value)} placeholder='Bruin' id='lastName' />
            </div>
            <div className='form-field'>
                <label for="age">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} placeholder='18' id='age' />
            </div>
            <div className='form-field'>
                <label for="aboutMe">About Me</label>
                <input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder='About Me' id='aboutMe' />
            </div>
            <button type="submit">Create Profile</button>
        </form>
    )
}