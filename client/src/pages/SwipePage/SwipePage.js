import React, { useState, useEffect } from 'react';
import {useSpring, animated} from 'react-spring';
import {useDrag} from '@use-gesture/react';
import './SwipePage.css';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const SwipePage = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true)
    const [swipeAction, setSwipeAction] = useState("");
    const [swiping, setSwiping] = useState(false);
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

    const handlePref = () => {
        navigate('/PreferencesPage')
    }

    useEffect(() => {
        const fetchMatchedProfiles = async() => {
            try{
            const response = await axios.get('http://localhost:8000/matching/getMatches', {
                params: { userId }
            })
            setProfiles(response.data)
            setLoading(false)
            setCurrentIndex(0)  //adjust current index to be at the begninning when we refresh the page
        }catch(error){
            console.error('Error fetching profiles: ', error)
            setLoading(false)
        }
    }
        fetchMatchedProfiles()
    }, [userId]);

    const handlerightSwipes = async ()=>{   //send request when swiping right
        try{
            await axios.post('http://localhost:8000/swipe/getSwipes', {
                swiperId: userId,
                swipedId: profiles[currentIndex].userID,
                direction: 'right'
            })
            setProfiles((prev) => prev.filter((_, index) => index !== currentIndex)); //readjust indexes, filter out users we swiped on
        }catch(error){
            console.error('Error sending swipe to backend:', error)
        }
    };
    const handleleftSwipes = async ()=>{
        try{
            await axios.post('http://localhost:8000/swipe/getSwipes', {
                swiperId: userId,
                swipedId: profiles[currentIndex].userID,
                direction: 'left'
            })
            setProfiles((prev) => prev.filter((_, index) => index !== currentIndex)); //readjust indexes, filter out users we swiped on
        }catch(error){
            console.error('Error sending swipe to backend:', error)
        }
    };
    const swiped = useDrag(
        (state) => {
            const { movement: [mx] } = state;
            const trigger = Math.abs(mx) > 200;
    
            if (trigger && !swiping) {
                setSwiping(true);
    
                if (mx > 0) {
                    setSwipeAction("❤️");
                    handlerightSwipes();    //handle right swipe action
                } else {
                    setSwipeAction("💔");
                    handleleftSwipes(); //handle left swipe action
                }
                setTimeout(() => {
                    setSwipeAction("");
                    setSwiping(false);
                }, 500);
            }
        },
        { axis: 'x', filterTaps: true }
    );

    const style = useSpring({
        transform: swiped.offset ? `translateX(${swiped.offset[0]}px) rotate(${swiped.offset[0] / 10}deg)` : `translateX(0px) rotate(0deg)`, // Rotation based on drag
        opacity: swiped.offset ? (1 - Math.abs(swiped.offset[0]) / 500) : 1, // Fade effect based on drag distance
        config: { tension: 300, friction: 30 }
    });
  
    if (loading) {
        return <div> Loading profiles ... </div>;
    }

    if (currentIndex >= profiles.length) {  //if no more profiles, then stop displaying cards
        return (
            <div>
                <p className="no-more-profiles">No more profiles available at the moment. Please check back later.</p>
                <button onClick={() => {
                    setLoading(true);
                    window.location.reload();
                }}
                className="refresh-button">Refresh</button>
                <button onClick={handleSignout} className="signout-button">Sign Out</button>
                <button onClick={handleChat} className="chat-button">Go To Chat Page</button>
                <button onClick={handlePref} className="preference-button">Change Preferences</button>
            </div>
        );
    }   
    const card = profiles[currentIndex];
    return (
        <div className="swipe-container">
        <button onClick={handleSignout} className="signout-button">Sign Out</button>
        <button onClick={handleChat} className="chat-button">Go To Chat Page</button>
        <button onClick={handlePref} className="preference-button">Change Preferences</button>
        <animated.div
          {...swiped()}
          style={style}
          className="card"
        >
            {/* Display the user's full name, and also match percentage */}
            <img src={card.img} alt={card.name} />
            <h3>{card.firstName} {card.lastName}</h3>
            <p>Match Percentage: {card.matchPercentage}%</p>
            </animated.div>
  
        {swipeAction && (
            <div className="swipe-feedback">
                {swipeAction} {/* Show "❤️" or "💔" */}
            </div>
        )}

        {/* Swipe Left or Right */}
        <div className="swipe-instructions">
          <p>Swipe right to ❤️, left to 💔!</p>
        </div>
      </div>
    );
};

export default SwipePage;