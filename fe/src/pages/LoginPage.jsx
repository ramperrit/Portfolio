import { useState } from "react";
import { MAIN, SIGN_UP } from "../constants/page_constants";
import { useNavigate } from "react-router-dom";
import Header from "../constants/Header";
import fetcher from "../fetcher";
import { LOGIN_API } from "../constants/api_constants";
import axios from "axios";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  function MSignup(){
    navigate(SIGN_UP);
  }

  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append("id", id);
      formData.append("password",password);

      const response = await axios.post(
        API_BASE_URL + LOGIN_API, 
        formData
      )
      console.log(response.data);

      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      localStorage.setItem("authority", response.data.authority);

      navigate(MAIN);

    }catch(error){
      console.error(error);
      setError("아이디, 비밀번호를 다시 입력해주세요");
    }
  }

  return (
    <>
    <Header/>
      <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 col-xl-6 text-center">
              <h2 class="mt-0">Please LogIn To See More!</h2>
              <hr class="divider" />
              <p class="text-muted mb-5">Ready to start your next project with me?<br/> Send me a messages and I will get back to you as soon as possible!</p>
            </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div class="col-lg-6">
              <form id="contactForm" onSubmit={handleLogin}>
                <div class="form-floating mb-3">
                  <input class="form-control" name="id" type="text" placeholder="Enter your Id..." required value={id} onChange={(e) => setId(e.target.value)}/>
                  <label for="id">Id</label>
                  
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="password" type="password" placeholder="Enter your PW..." required value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <label for="password">Password</label>
                  
                </div>
                <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Login</button></div>
                <br/>
              </form>
                <div class="d-grid"><button class="btn btn-primary btn-xl" onClick={MSignup}>Signup</button></div>
            </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-4 text-center mb-5 mb-lg-0">
              <i class="bi-phone fs-2 mb-3 text-muted"></i>
              <div>+82 (010) 1234-5678</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}