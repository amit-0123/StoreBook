import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
    const handleSubmit = async(e)=>{
      // used so that page do not reload
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
          'Content-Type':"application/json",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZDI3MzJjMzRkMWIwZWM1OWVmZGU4In0sImlhdCI6MTcxOTQ3ODA5Nn0.1Sh3EoUYLCauNsTgooU2JHfNXILwUfp3KMTKPwKlvYE"
        },
        body:JSON.stringify({email: credentials.email, password: credentials.password})
      });
        const json = await response.json();
        console.log(json);
        if(json.success){
         //save the auth token redirect
         localStorage.setItem('token', json.authtoken);
         props.showAlert("Logged in successfully","success");
          navigate('/home');  // or any other route you want to navigate to
        }
        else{
           props.showAlert("Invalid credentials","danger");
        }

    }

    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div>
      <h2 className='mt-5 text-center'>Login to continue to iNotebook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="Email1" name="email" aria-describedby="emailHelp" autocomplete="current-password"/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="Password1" aria-describedby="passwordHelp" autocomplete="current-password"/>

  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login