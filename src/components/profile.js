import React, { useState, useEffect } from "react";
import { auth, db, rtdb } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, onValue } from "firebase/database";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      // Fetch data from Firestore
      const docRef = doc(db, "Students", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }

      // Fetch data from Realtime Database
      const userRef = ref(rtdb, 'Students/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserDetails(data);
        }
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <img src={userDetails.photo || "placeholder-image-url"} width={"40%"} alt="User" />
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Department: {userDetails.department}</p>
            <p>Course: {userDetails.course}</p>
            <p>Age: {userDetails.age}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
