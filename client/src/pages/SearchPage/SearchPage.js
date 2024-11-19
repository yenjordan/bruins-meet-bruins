import { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Please enter a search term.");
            return;
        }
        setError('');
        
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            if (response.ok) {
                setProfiles(data.profiles);
            } else {
                setError(data.message || 'Error fetching profiles');
            }
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
        }
    };

    return (
        <div className="search-page">
            <h1>Search for Bruins</h1>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Enter keywords..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="profile-cards">
                {profiles.map((profile) => (
                    <div className="profile-card" key={profile.id}>
                        <h2>{profile.name}</h2>
                        <p>Age: {profile.age}</p>
                        <p>About Me: {profile.aboutMe}</p>
                        <p>Match: {profile.matchPercentage}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
