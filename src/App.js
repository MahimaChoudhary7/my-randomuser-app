import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [user, setUser] = useState(null)
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    useEffect(() => {
        getUser();
    },[]);

    const getUser=() => {
    fetch('https://randomuser.me/api')
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
      })
      .catch(error=>console.error('Error fetching user:',error));
     };

    const toggleMoreInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    return (
        <div className="container">
          {user && (
            <div className="card">
                <div className="img-container">
                    <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                </div>
                <div className="details">
                    <h2>{`${user.name.first} ${user.name.last}`}</h2>
                    <p><strong>Gender:</strong>{user.gender}</p>
                    <strong>Phone:</strong>{user.phone}
                    {showMoreInfo && (
                        <div>
                            <p><strong>Date of Birth:</strong>{new Date(user.dob.date).toLocaleDateString()}</p>
                            <h4>Location:{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</h4>
                            <p><strong>Email:</strong>{user.email}</p>
                            <p><strong>Nationality:</strong>{user.nat}</p>
                        </div>
                    )}
                    <button onClick={toggleMoreInfo}>{showMoreInfo ?'Show Less Info' : 'Show More Info'}</button>
                    <button onClick={getUser}>Get Random User</button>
                </div>
            </div>
          )}
        </div>
    );
}

export default App;