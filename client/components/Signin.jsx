import { useForm } from "react-hook-form";
import { useState } from "react";
import {  useNavigate,Link } from "react-router-dom";
import './Signin.css';
import axios from 'axios';

function SignIn() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");

  async function onSignUpFormSubmit(userObj) {
    console.log(userObj);
    const dbRes = await axios.post('http://localhost:4000/user-api/login',userObj);
    console.log(dbRes);
    if(dbRes.data.message==="Login Success"){
      navigate('/home');
    }
    else{
      alert("Wrong Credentials");
    }
  }

  return (
    <div className=" bgImg">
      <div className="row justify-content-center dabba">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
          <div className="card-title text-center border-bottom">
              <h2 className="p-3 fw-bold fs-4">Sign-In</h2>
            </div>
            <div className="card-body">
              {err.length !== 0 && (
                <p className="lead text-center text-danger">{err}</p>
              )}

              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", {required:true})}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", {required:true} )}
                  />
                </div>

                <div className="text-end">
                  <button type="submit" className=" bg-success btn btn-success" >
                    Sign-In
                  </button>
                </div>
              </form>
              <p className="text-center">Already have an account? <Link className="text-primary" to='/signup'>Sign-Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;