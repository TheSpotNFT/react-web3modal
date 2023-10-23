import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import Player from '@vimeo/player';

const VideoPlayer = () => {
  const [userVideos, setUserVideos] = useState([]);
  const playerRefs = useRef([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  setCurrentUser(selectedUser);
  const userRef = ref(database, `users/junk/videos`); // Update the path
  const handleUserClick = (user) => {
    setSelectedUser(user.username);
    console.log('Selected user:', selectedUser);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const videosData = snapshot.val();
          const videoUrls = Object.values(videosData).map(video => video.url);
          setUserVideos(videoUrls);
  
          videoUrls.forEach((videoUrl, index) => {
            console.log(`Video ${index + 1}: ${videoUrl}`);
          });
  
          // Cleanup: Destroy the previous players when selectedUser changes
          playerRefs.current.forEach(player => {
            player.destroy().then(() => {
              // Player is destroyed
            });
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
          console.log('No data found for the provided userId:', selectedUser);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedUser]);
  

  useEffect(() => {
    // Create a reference to the "users" node in the database
    const usersRef = ref(database, 'users');

    // Listen for changes in the "users" node
    console.log(selectedUser);
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        // Convert the user data into an array
        const usersArray = Object.values(usersData);
        setUsers(usersArray);
      }
    });

    // Unsubscribe from Firebase when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  

  return (
    <div>
        <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <button className="rounded-lg px-4 md:px-8 xl:px-12 py-1 text-xs md:text-l 2xl:text-xl font-mono text-orange-500 bg-slate-900 bg-opacity-80 
            hover:bg-spot-yellow hover:border-white hover:text-orange-300 hover:bg-opacity-100 duration-300" onClick={() => handleUserClick(user.username)}>{user.username}</button>
          </li>
        ))}
      </ul>
      {selectedUser && <p>Selected User: {selectedUser}</p>}
    </div>
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
