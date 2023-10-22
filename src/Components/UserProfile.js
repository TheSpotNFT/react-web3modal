import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, set, push } from "firebase/database";
import ReactPlayer from 'react-player';

function UserProfile({ username, userId }) {
  const [videoURL, setVideoURL] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  //const userId = userId; // Replace with the user's ID you want to update

    
 


  const handleVideoURLChange = (e) => {
    setVideoURL(e.target.value);
  };

 /* const generateEmbedCode = () => {
    const generateEmbedCode = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAfPGKO06QMuM3pht8wgiPlFa0t5bNil7g&part=player&id=VIDEO_ID`);
        const data = await response.json();
        const embedCode = data.items[0].player.embedHtml;
        setEmbedCode(embedCode);
      } catch (error) {
        console.error('Error fetching embed code: ', error);
      }
    };    
  };
*/


  //const saveProfile = () => {
    // Implement logic to save the video URL and embed code to the user's profile.
    // You may interact with your smart contract or backend for this.
  //};

  const [userData, setUserData] = useState(null);


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

    const userRef = ref(database, `users/${userId}`);
    //const newVideoKey = push(userRef.child("videos")).key;
    const newVideoData = {
      url: videoURL, // Use the entered video URL
    };

    /*async function uploadUrl() {
      const newVideoKey = push(ref(database, `users/${userId}/videos`)).key;
    }
  
*/



  return (
    <div>
     <div className='pb-4 mx-auto bg-gray-50'> <h2>Add a Video to Your Channel</h2></div>
     <div className='flex pb-4'>
      <div className='text-orange-500 text-bold pr-6'>Enter YouTube Video URL:</div>
      <input className="w-96 h-full border border-black bg-white text-black" type="text" value={videoURL} onChange={handleVideoURLChange} /></div>

    <div className='flex'>
            <div>   <button className="rounded-lg px-4 md:px-8 xl:px-12 py-1 text-xs md:text-l 2xl:text-xl font-mono text-orange-500 bg-slate-900 bg-opacity-80 
            hover:bg-spot-yellow hover:border-white hover:text-orange-300 hover:bg-opacity-100 duration-300">Save Video to Profile</button></div></div> 
   
    </div>
  );
}

export default UserProfile;
