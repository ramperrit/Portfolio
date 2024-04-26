import { useNavigate } from "react-router-dom";
import { LOGIN, MAIN } from "./page_constants";
import fetcher from "../fetcher";
import { LOGOUT_API } from "./api_constants";


export default function Logout({children}) {
  const refreshToken = localStorage.getItem("refresh_token");
  const navigate = useNavigate();

  const logoutHandler = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("refreshToken",refreshToken);
    const response = await fetcher.post(LOGOUT_API, formData)
    alert(response.data);

    localStorage.clear();
    navigate(LOGIN);
  }

  return(
      <li class="nav-item">
        <a class="nav-link" href={MAIN} onClick={logoutHandler}>{children}</a>
      </li>
  )
}