import React, { useState, useEffect } from 'react';
import './PreferencesPage.css';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const PreferencePage = () => {
  document.body.style.backgroundColor = '#B9D9EB';
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [newHobby, setNewHobby] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [cookies, removeCookie] = useCookies(['UserId'])
  const userId = cookies.UserId
  const navigate = useNavigate()

  //handles if user that is not logged in attempts to navigate to one of the pages
  useEffect(() => {
    if (!userId || !localStorage.getItem('token')) {
        navigate('/'); 
    }
  }, [userId, navigate]);

const handleSignout = () => {
    removeCookie('UserId')
    removeCookie('LoginToken')
    localStorage.removeItem('token'); //remove login token we generated
    navigate('/')
}

const handleChat = () => {
    navigate('/Message')
}

const handleSwipePage = () => {
    navigate('/SwipePage')
}

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    
    setAgeRange((prev) => {
      const newAgeRange = [...prev];
      if (value === '') {
        if (name === 'min') {
          newAgeRange[0] = '';
        }
        else if (name === 'max') {
          newAgeRange[1] = '';
        }
      }
      else {
        if (name === 'min') {
          newAgeRange[0] = Number(value);
        }
        else if (name === 'max') {
          newAgeRange[1] = Number(value);
        }
      }
      return newAgeRange;
    });
  };

  const handleNewHobbyChange = (e) => {
    setNewHobby(e.target.value);
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      setHobbies((prev) => [...prev, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobby) => {
    setHobbies((prev) => prev.filter(item => item !== hobby));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:8000/preferences/getPreferences',{
        userId: userId,
        ageRange: { min: ageRange[0], max: ageRange[1]},
        hobbyPreferences: hobbies
      })
      if(response.status === 201){
        alert('Preferences successfuly saved')
        navigate('/SwipePage')
      }else{
        alert('Unexpected reponse from the server')
      }
    }catch(error){
      console.error('Error saving preferences: ', error)
      alert('Failed to save preferences.')
    }
    // alert(`Preferences saved! Age range: ${ageRange[0]} - ${ageRange[1]}, Hobbies: ${hobbies.join(', ')}`);
  };

  return (
    <div className="preference-page">
      <h1 className="yourPreferences">Your Preferences</h1>
      <form onSubmit={handleSubmit}>
        <div className="age-range">
          <label className="ageRange "htmlFor="ageRange">Age Range</label>
          <div className="age-range-inputs">
            <input 
              type="number" 
              name="min" 
              value={ageRange[0] === '' ? '' : ageRange[0]}
              onChange={handleAgeChange} 
              min="18" 
              max="100" 
            />
            <span className="to">to</span>
            <input 
              type="number" 
              name="max" 
              value={ageRange[1] === '' ? '' : ageRange[1]}
              onChange={handleAgeChange} 
              min="18" 
              max="100" 
            />
          </div>
        </div>

        <div className="hobbies">
          <label>Hobbies</label>
          <div className="hobby-input">
            <input 
              type="text" 
              value={newHobby} 
              onChange={handleNewHobbyChange} 
              placeholder="Enter a hobby"
            />
            <button type="button" onClick={handleAddHobby}>❤️</button>
          </div>
          <ul className="hobby-list">
            {hobbies.map((hobby, index) => (
              <li key={index} className="hobby-item">
                {hobby}
                <button type="button" onClick={() => handleRemoveHobby(hobby)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <button className="preferencesButton" type="submit">Save Preferences</button>
        <button type= 'button' onClick={handleSignout} className="signout-button">Sign Out</button>
        <button type= 'button' onClick={handleChat} className="chat-button">Go To Chat Page</button>
        <button type= 'button' onClick={handleSwipePage} className="preference-button">Go To Swipe Page</button>
      </form>
    </div>
  );
};

export default PreferencePage;
