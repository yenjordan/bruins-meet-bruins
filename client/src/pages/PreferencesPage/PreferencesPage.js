import React, { useState } from 'react';
import './PreferencesPage.css';

const PreferencePage = () => {
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [newHobby, setNewHobby] = useState('');
  const [hobbies, setHobbies] = useState([]);

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setAgeRange((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Preferences saved! Age range: ${ageRange[0]} - ${ageRange[1]}, Hobbies: ${hobbies.join(', ')}`);
  };

  return (
    <div className="preference-page">
      <h1>Your Preferences</h1>
      <form onSubmit={handleSubmit}>
        <div className="age-range">
          <label htmlFor="ageRange">Age Range</label>
          <div className="age-range-inputs">
            <input 
              type="number" 
              name="min" 
              value={ageRange[0]} 
              onChange={handleAgeChange} 
              min="18" 
              max="100" 
            />
            <span>to</span>
            <input 
              type="number" 
              name="max" 
              value={ageRange[1]} 
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
            <button type="button" onClick={handleAddHobby}>Add Hobby</button>
          </div>
          <ul className="hobby-list">
            {hobbies.map((hobby, index) => (
              <li key={index} className="hobby-item">
                {hobby}
                <button type="button" onClick={() => handleRemoveHobby(hobby)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default PreferencePage;
