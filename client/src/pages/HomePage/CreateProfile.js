import {useState} from 'react';
import './CreateProfile.css'
import './Landing.css'
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const[fName, setfName] = useState('');
    const[lName, setlName] = useState('');
    const[age, setAge] = useState('');
    const[aboutMe, setAboutMe] = useState('');
    const[error, setError] = useState('')
    const[successMessage, setSuccessMessage] = useState('')
    const [img, setImg] = useState(null);

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log('Selected file:', file)
        if (file){
            setImg(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!fName || !lName || !age || !aboutMe|| !img){
            setError("Please fill out all fields.");
            return;
        }
        setError('');

        const formData = new FormData();
        formData.append('image', img);
        try{

            const imgResponse = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            
            const imgData = await imgResponse.json();
            console.log('Image data:', imgData);
            if(!imgResponse.ok)
            {
                throw new Error(imgData.error);
            }

            const imageUrl = imgData.imageurl;

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
                    img: imageUrl
                }),
        });
            
            const result = await response.json();
            if (response.ok){
                setSuccessMessage('Profile has successfully been created!');
                setfName('');
                setlName('');
                setAboutMe('');
                setAge('');
                setImg(null);
                navigate('/PreferencesPage')
                
            }else{
                setError(result.message || 'Failed to create profile');
            }
        } catch (err){
            console.error('Error:', err);
            setError('An error occurred while creating the profile.');
        }

    };

    const handleCustomButtonClick = () =>{
        document.getElementById('file-input').click();
    };

    return (
        
        <form onSubmit={handleSubmit} className='form-container'>
            <img src="/logob.png" alt="logo" style={{ width: '170px', height: '200px' }}/>
            <h1>Create your Profile</h1>
            <div className='form-field'>
                <label htmlFor="img">Profile Picture</label>
                <input type='file' id='file-input' onChange={handleFileChange} style={{ display:'none'}}/>
                <button type='button' className='profileButton' onClick={handleCustomButtonClick}>Upload Profile Picture</button>

            </div>

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
            {error && <div className="error">{error}</div>}
            {successMessage && <div className='successMessage'>{successMessage}</div>}
            <button type="submit" className='profileButton'>Create Profile</button>
            
        </form>

    )
}