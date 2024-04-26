import { useEffect, useState } from "react";
import fetcher from "../fetcher";
import { MAIN_PAGE_API } from "../constants/api_constants";
import Header from "../constants/Header";
import { LIST, LOGIN } from "../constants/page_constants";
import axios from "axios";


export default function MainPage() {
  const [initData, setInitData] = useState("연결안됨");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const fetchInitData = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + MAIN_PAGE_API
      );
      setInitData(response.data);
    } catch (error) {
      console.error("데이터 가져오지 못함", error);
    }
  }

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  },[]);

  return (
    <>
      <Header />
      <header class="masthead">
        <div class="container px-4 px-lg-5 h-100">
          <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div class="col-lg-8 align-self-end">
              <h1 class="text-white font-weight-bold">MainPage</h1>
              <hr class="divider" />
            </div>
            <div class="col-lg-8 align-self-baseline">
              <p class="text-white-75 mb-5">{initData}</p>
              {isLoggedIn ? (
                 <a class="btn btn-primary btn-xl" href={LIST}>Find Out More</a>
              ) :
                (<a class="btn btn-primary btn-xl" href={LOGIN}>Find Out More</a>)
              }
            </div>
          </div>
        </div>
      </header>
    </>
  );
}