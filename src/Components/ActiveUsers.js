import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Initialize Firebase with your config
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


const UserList = ({selectedUser, handleUserClick}) => {
  const [users, setUsers] = useState([]);


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
  );
};

export default UserList;
