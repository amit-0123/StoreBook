import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
      const handleSubmit = async(e)=>{
        // used so that page do not reload
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser",{

          method:'POST',
          headers:{
            'Content-Type':"application/json",
            // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZDI3MzJjMzRkMWIwZWM1OWVmZGU4In0sImlhdCI6MTcxOTQ3ODA5Nn0.1Sh3EoUYLCauNsTgooU2JHfNXILwUfp3KMTKPwKlvYE"
          },
          body:JSON.stringify({name, email, password})
        });
          const json = await response.json();
          console.log(json);
          if(json.success){
           //save the auth token redirect
           localStorage.setItem('token', json.authtoken);
            navigate('/home');  // or any other route you want to navigate to
            props.showAlert("Account created successfully","success");
          }
          else{
            props.showAlert("Invalid credentials","danger");
          }
  
      }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-5">
      <h2 className='text-center'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-3 mt-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" value={credentials.name} onChange={onChange} aria-describedby='emailHelp' id="name" name="name" />
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} aria-describedby='emailHelp'id="email" name="email" autocomplete="current-password" />
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange}  name="password" id="password" autocomplete="current-password" minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword1"  minLength={5} required />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup