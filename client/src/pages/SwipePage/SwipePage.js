import React, { useState, useEffect } from 'react';
import {useSpring, animated} from 'react-spring';
import {useDrag} from '@use-gesture/react';
import './SwipePage.css';

const SwipePage = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true)
    const [swipeAction, setSwipeAction] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/profiles');
                if (!response.ok) {
                    throw new Error('Failed to fetch profiles');
                }
                const data = await response.json();
                if (isMounted) {
                    setProfiles(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setError('Unable to load profiles at the moment. Please try again later.');

                if (isMounted) {
                    setLoading(false);
                }
            }
        };
    
        fetchProfiles();
    
        return () => {
            isMounted = false;
        };

    }, []);

    const swiped = useDrag((state) => {
            const {movement: [mx]} = state;
            const trigger = Math.abs(mx) > 150;

            if (trigger) {
                if (mx >0) {
                    setSwipeAction("Liked");
                }
                else {
                    setSwipeAction("Disliked");
                }
                setCurrentIndex((prev) => (prev + 1) % profiles.length);
            }

            return [];
        },
        {axis: 'x', filterTaps: true}
    );

    const style = useSpring ({
        transform: `translateX(${swiped.offset[0]}px)`,
        opacity: swiped.offset[0] ? 1 - Math.abs(swiped.offset[0]) / 500 : 1,
        rotate: swiped.offset[0] / 10,
        config: { tension: 300, friction: 30 },
    });

    if (loading) {
        return <div> Loading profiles ... </div>;
    }

    if (profiles.length === 0 && !loading) {
        return (
            <div>
                <p>No profiles available at the moment. Please check back later.</p>
                <button onClick={() => setLoading(true)}>Refresh</button>
            </div>
        );
    }   

    const card = profiles[currentIndex];
    return (
        <div className="swipe-container">
        <animated.div
          {...swiped()}
          style={style}
          className="card"
        >
          <img src={card.img} alt={card.name} />
          <h3>{card.name}</h3>
        </animated.div>
  
        {swipeAction && (
            <div className="swipe-feedback">
                {swipeAction} {/* Show "Liked" or "Disliked" */}
            </div>
        )}

        {/* Swipe Left or Right */}
        <div className="swipe-instructions">
          <p>Swipe right to like, left to skip!</p>
        </div>
      </div>
    );
};

export default SwipePage;