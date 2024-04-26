import { Route, Routes } from "react-router-dom";
import { LIST, LOGIN, MAIN, SIGN_UP } from "./constants/page_constants";
import MainPage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Listpage from "./pages/ListPage";


function App() {
  return (
   <>
    <Routes>
      <Route path={MAIN} element={<MainPage/>} />
      <Route path={LOGIN} element={<LoginPage/>} />
      <Route path={SIGN_UP} element={<SignupPage/>} />
      <Route path={LIST} element={<Listpage/>} />
    </Routes>
   </>
  );
}

export default App;
