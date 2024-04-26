import { Link } from "react-router-dom";
import { MAIN } from "../constants/page_constants";

export default function Page404(){
  return(
    <>
    <h1>존재하지 않는 페이지</h1>
    <Link to={MAIN}>메인페이지로 이동</Link>
    </>
  )
}