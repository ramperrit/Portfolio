import axios from "axios";
import { TOKEN_REFRESH_API } from "./constants/api_constants";
import { LOGIN } from "./constants/page_constants";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetcher = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

fetcher.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    request.headers.Authentication = `Bearer ${accessToken}`;
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
)

fetcher.interceptors.response.use(
  (response) => {
    //정상수행
    return response;
  },
  async (error)=>{
    if(error.response.status === 401){
      await tokenRefresh();

      //사용자에게 안보이게 처리
      const accessToken = localStorage.getItem("access_token");
      error.config.headers['Authentication'] = 'Bearer ${accessToken}';
      const response = await axios.request(error.config);
      return response;
    }
    if(error.response.status === 403){
      alert("권한 없음");
    }
    return Promise.reject(error);
  }
)

const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  //통신
  try{
    const formData = new FormData();
    formData.append("refreshToken", refreshToken);
    const response = await axios.post(
      API_BASE_URL + TOKEN_REFRESH_API,
      formData
    );
    
    //덮어쓰기
    localStorage.setItem("access_token", response.data.accessToken);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    localStorage.setItem("authority",response.data.authority);
    
  }catch(error){
    window.location.href = LOGIN;
  }
}

export default fetcher;