import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useNavigate,Link } from "react-router-dom";
import { useState } from "react";

function Addtools() {

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");

  async function onSignUpFormSubmit(userObj) {
    navigate('/signin');
  }

  return (
    <div>
      <div className="row justify-content-center dabba">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
          <div className="card-title text-center border-bottom">
              <h2 className="p-3 fw-bold fs-4">Sign Up</h2>
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
                  <label htmlFor="phno" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phno"
                    {...register("phno", {required:true})}
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
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center">Already have an account? <Link className="text-primary" to='/signin'>Sign-In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addtools