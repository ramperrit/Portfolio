import { Route, Routes } from "react-router-dom";
import { LIST, LOGIN, MAIN, MANAGE, SIGN_UP, UPLOAD } from "./constants/page_constants";
import MainPage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Listpage from "./pages/ListPage";
import UploadPage from "./pages/UploadPage";
import ManagePage from "./pages/ManagePage";


function App() {
  return (
   <>
    <Routes>
      <Route path={MAIN} element={<MainPage/>} />
      <Route path={LOGIN} element={<LoginPage/>} />
      <Route path={SIGN_UP} element={<SignupPage/>} />
      <Route path={LIST} element={<Listpage/>} />
      <Route path={UPLOAD} element={<UploadPage/>} />
      <Route path={MANAGE} element={<ManagePage/>} />
    </Routes>
   </>
  );
}

export default App;