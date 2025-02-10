import { useState } from "react";

export const SignUp = () => {

  const [value,setvalue]=useState({
    username:"",
    email:"",
    phonenumber:"",
    password:"",
    conformpassword:""

  })

  const clickhandle=(e)=>{
  const {name,value}=e.target
  setvalue({...value,[name]:value})
  console.log(name)
  }

  const submithandle=()=>{
    
  }


  return (
    <div>
      <form onSubmit={submithandle}>
        <label htmlFor="">User name</label>
        <input type="text" name="username" id="" onChange={clickhandle} />

        <label htmlFor="">Email</label>
        <input type="text" name="email" id="" />

        <label htmlFor="">phone number</label>
        <input type="text" name="phonenumber" id="" />

        <label htmlFor="">password</label>
        <input type="text" name="password" id="" />

        <label htmlFor="">conform password</label>
        <input type="text" name="conformpassword" id="" value={}/>
      </form>
    </div>
  );
};
