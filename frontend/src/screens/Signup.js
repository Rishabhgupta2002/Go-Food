import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  // let [address, setAddress] = useState("");
  let navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    if (!json.success && response.status===400 ) {
      alert("user already exist, please login");
      navigate("/login");
      return
    }
    if (!json.success) {
      alert("Enter Valid Credentials");
      return
    }
    if (json.success) {
      alert("Account created")
      navigate("/login");
      return
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name='name' value={credentials.name} onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email' value={credentials.email} onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>

          <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />

        </div>
        {/* <div className="m-3">
          <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
        </div> */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password} onChange={onChange} name='password'
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>

    </div>
  )
}

export default Signup
