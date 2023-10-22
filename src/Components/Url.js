import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

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

function VideoForm() {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleVideoURLChange = (e) => {
    setVideoURL(e.target.value);
  };

  const handleAddVideo = () => {
    if (username && address && videoURL) {
      // Create a reference to the "videos" node under the user's username
      const userRef = ref(database, `users/${username}/videos`);

      // Push a new video under the user's node
      push(userRef, { address, url: videoURL });

      // Clear the form fields
      setUsername('');
      setAddress('');
      setVideoURL('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
     <div className='pb-4'><h2>Add a Video</h2></div>
      <div className='pb-2'>
        <label className='pr-4'>Username:</label>
        <input className="w-96 h-full border border-black bg-white text-black" type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className='pb-2'>
        <label className='pr-7'>Address:</label>
        <input className="w-96 h-full border border-black bg-white text-black" type="text" value={address} onChange={handleAddressChange} />
      </div>
      <div className='pb-4'>
        <label className='pr-3'>Video URL:</label>
        <input className="w-96 h-full border border-black bg-white text-black" type="text" value={videoURL} onChange={handleVideoURLChange} />
      </div>
      <button  className="rounded-lg px-4 md:px-8 xl:px-12 py-1 text-xs md:text-l 2xl:text-xl font-mono text-orange-500 bg-slate-900 bg-opacity-80 
            hover:border-white hover:text-orange-300 hover:bg-opacity-100 duration-300" onClick={handleAddVideo}>Add Video to Profile</button>
    </div>
  );
}

export default VideoForm;
