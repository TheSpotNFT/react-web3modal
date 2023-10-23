import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import Player from '@vimeo/player';

const VideoPlayer = ({ selectedUser }) => {
  const [userVideos, setUserVideos] = useState([]);
  const playerRefs = useRef([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAA5-Qa5UJ3b0S6pAs3E7OCaG-TwR5Vvig",
      authDomain: "thehub-8af08.firebaseapp.com",
      projectId: "thehub-8af08",
      databaseURL: "https://thehub-8af08-default-rtdb.firebaseio.com/",
      storageBucket: "thehub-8af08.appspot.com",
      messagingSenderId: "429824717981",
      appId: "1:429824717981:web:0b9587dfd24b273b38d074",
      measurementId: "G-6Q459P9J5Z"
    };

    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      setCurrentUser(selectedUser);
      const userRef = ref(database, `users/junk/videos`); // Update the path
      
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const videosData = snapshot.val();
          const videoUrls = Object.values(videosData).map(video => video.url);
          setUserVideos(videoUrls);
         

          videoUrls.forEach((videoUrl, index) => {
            console.log(`Video ${index + 1}: ${videoUrl}`);
          });

          // Initialize the Vimeo players for each video
          playerRefs.current = videoUrls.map((videoUrl, index) => {
            const options = {
              url: videoUrl, // Assuming the URL is the Vimeo video URL
              width: 640,
            };
            return new Player(`vimeo-player-${index}`, options);
          });
        } else {
          console.log('No data found for the provided userId:', currentUser);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedUser]);

  return (
    <div>
       <div className='font-bold text-xl'>{currentUser}'s Channel3</div>
    {userVideos.length > 0 ? (
  <div>
    {userVideos.map((videoUrl, index) => (
      <div key={index}>
       
        <h3>Video {index + 1}</h3>
        <div id={`vimeo-player-${index}`}></div>
        
      </div>
    ))}
        </div>
      ) : (
        <p>No user data found for this selected uyser</p>
      )}
    </div>
  );
};

export default VideoPlayer;
