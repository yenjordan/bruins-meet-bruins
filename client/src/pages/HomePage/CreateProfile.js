import {useState} from 'react';
import './CreateProfile.css'

export default function Profile() {
    const[fName, setfName] = useState('');
    const[lName, setlName] = useState('');
    const[age, setAge] = useState('');
    const[aboutMe, setAboutMe] = useState('');
    const[error, setError] = useState('')
    const[successMessage, setSuccessMessage] = useState('')
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!fName || !lName || !age || !aboutMe || !profilePic){
            setError("Please fill out all fields.");
            return;
        }
        setError('');
        

        try{

            const formData = new FormData();
            formData.append('image', profilePic);
            const imgurResponse = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: 'Client-ID 4f9492f5ff16c40'
                },
                body: formData,
            });

            const imgurResult = await response.json();
            if(!response.ok)
            {
                throw new Error(imgurResult.data.error);
            }

            const imageUrl = imgurResult.data.link;

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
                    profilePic: imageUrl
                }),
        });

            const result = await response.json();
            if (response.ok){
                setSuccessMessage('Profile has successfully been created!');
                setfName('');
                setlName('');
                setAboutMe('');
                setAge('');
                setProfilePic(null);
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
                <input value={fName} onChange={(e) => setfName(e.target.value)} placeholder='Joe / Josie' id='firstName' />
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
                <input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder='Go Bruins!' id='aboutMe' />
            </div>
            <div className='form-field'>
                <label htmlFor="profilePic">Profile Picture</label>
                <input type='file' onChange={handleFileChange} id='profilePic'/>

            </div>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className='successMessage'>{successMessage}</div>}
            <button type="submit">Create Profile</button>
            
        </form>

    )
}