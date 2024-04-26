import { useState } from "react";
import { LOGIN, SIGN_UP  } from "../constants/page_constants";
import { useNavigate } from "react-router-dom";
import Header from "../constants/Header";
import fetcher from "../fetcher";
import { SIGN_UP_API } from "../constants/api_constants";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignup = async (e) =>{
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append("name", name);
      formData.append("id", id);
      formData.append("password", password);
      formData.append("email",email);

      const response = await axios.post(
        API_BASE_URL + SIGN_UP_API,
        formData
      )

      navigate(LOGIN);

    }catch(error){
      console.error(error);
      setError(error.response.data);
      navigate(SIGN_UP);
    }
  }

  return (
    <>
    <Header/>
      <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 col-xl-6 text-center">
              <h2 class="mt-0">Signup</h2>
              <hr class="divider" />
            </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div class="col-lg-6">
              <form id="contactForm" onSubmit={handleSignup}>
              <div class="form-floating mb-3">
                  <input class="form-control" name="name" type="text" placeholder="Enter your Name..." required value={name} onChange={(e) => setName(e.target.value)}/>
                  <label for="name">Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="id" type="text" placeholder="Enter your Id..." required value={id} onChange={(e) => setId(e.target.value)}/>
                  <label for="id">Id</label>                  
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="password" type="password" placeholder="Enter your PW..." required value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <label for="password">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="email" type="email" placeholder="Enter your Email..." required value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <label for="email">Email</label>
                </div>
                <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Signup</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}