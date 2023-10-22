import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

function VideoList({ username }) {
  const [videoUrls, setVideoUrls] = useState([]);

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
    const database = getDatabase();
    const userRef = ref(database, `users/junk/videos`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const videos = snapshot.val();
          const urls = Object.values(videos).map((video) => video.url);
          setVideoUrls(urls);
        } else {
          setVideoUrls([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching video data:', error);
      });
  }, [username]);

  return (
    <div>
    
      <div>
        {videoUrls.map((url, index) => (
          <div key={index}>
            <h3>Video {index + 1}</h3>
            <iframe
              src={url}
              title={`Video ${index + 1}`}
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
