import { useEffect, useState } from "react";
import "../css/styles.css";
import { LOGIN, MAIN } from "./page_constants";
import Logout from "./Logout";

export default function Header({...props}) {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  },[]);

  return (
    <>
      <nav class="navbar navbar-expand-lg fixed-top py-3" id="mainNav">
        <div class="container px-4 px-lg-5">
          <a class="navbar-brand" href={MAIN}>Start Bootstrap</a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto my-2 my-lg-0">
              {isLoggedIn ? (<Logout>Logout</Logout>) : 
                (<li class="nav-item"><a class="nav-link" href={LOGIN}>Sign In</a></li>)
              }
              {isLoggedIn && authority === "ROLE_ADMIN" &&
              <>
                <li class="nav-item"><a class="nav-link" href={LOGIN}>Upload</a></li>
                <li class="nav-item"><a class="nav-link" href={LOGIN}>Manage</a></li>
              </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}