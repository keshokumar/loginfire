import React, { useState } from "react";
import { auth, db, rtdb } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Store additional details in Firestore
        await setDoc(doc(db, "Students", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          department: department,
          course: course,
          age: age,
          photo: "" // Optional
        });

        // Store additional details in Realtime Database
        const userData = {
          email: user.email,
          firstName,
          lastName,
          department,
          course,
          age,
          photo: "" // Optional
        };
        const userRef = ref(rtdb, 'Students/' + user.uid);
        await set(userRef, userData);

        // Redirect to profile page
        navigate("/profile");
      }

      console.log("Student Registered Successfully!!");
      toast.success("Student Registered Successfully!!", { position: "top-center" });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Student Registration</h3>
      <div className="mb-3">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Department</label>
        <input
          type="text"
          className="form-control"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Course</label>
        <input
          type="text"
          className="form-control"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
