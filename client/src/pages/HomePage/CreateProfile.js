import {useState} from 'react';

export default function Profile() {
    const[name, setName] = useState('');
    const[age, setAge] = useState('');
    const[location, setLocation] = useState('');
    const[aboutMe, setAboutMe] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }


    return (
        <form onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Joe' id='name' />
            <label for="age">Age</label>
            <input value={age} onChange={(e) => setAge(e.target.value)} placeholder='Bruin' id='age' />
            <label for="location">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder='UCLA' id='location' />
            <label for="aboutMe">About Me</label>
            <input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder='About Me' id='aboutMe' />
            <button type="submit">Create Profile</button>
        </form>
    )
}