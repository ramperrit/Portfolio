import { Link } from "react-router-dom";
import { MAIN } from "../constants/page_constants";

export default function Page403(){
  return(
    <>
    <h1>접근 권한 없음</h1>
    <Link to={MAIN}>메인페이지로 이동</Link>
    </>
  )
}