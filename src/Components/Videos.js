import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";

const VideoPlayer = ({ username, userId }) => {
  const [userData, setUserData] = useState(null);

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

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Use the getDatabase function to initialize the database
    const database = getDatabase();

    // Use the ref function to create a reference to the Firebase database path
    const userRef = ref(database, `/users/${userId}`); // Update the path

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        console.log("Data from Firebase:", user); // Log the retrieved data
        setUserData(user);
      } else {
        console.log("No data found for the provided userId:", userId); // Log the absence of data
        setUserData(null); // No user data found for the provided userId
      }
    });

    return () => {
      // No need to explicitly call off() for read operations
    };
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div>
          <h3>{userData.username}'s Channel</h3>
          <iframe
            src={userData.url}
            title="Vimeo Video"
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No user data found for this userId {userId}</p>
      )}
    </div>
  );
};

export default VideoPlayer;
