import { useState } from "react";
import Header from "../constants/Header";
import axios from "axios";
import { UPLOAD_API } from "../constants/api_constants";
import { useNavigate } from "react-router-dom";
import { LIST } from "../constants/page_constants";

export default function UploadPage() {
  const [bTitle, setBTitle] = useState("");
  const [bName, setBName] = useState("");
  const [bNumber, setBNumber] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bText, setBText] = useState("");
  const [bStack, setBStack] = useState("");
  const [bDetail, setBDetail] = useState("");
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const uploadHandler = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append("bTitle", bTitle);
      formData.append("bName", bName);
      formData.append("bNumber", bNumber);
      formData.append("bEmail", bEmail);
      formData.append("bText", bText);
      formData.append("bStack", bStack);
      formData.append("bDetail", bDetail);

      file.map((f) => {
        formData.append("boardImgFile", f);
      });


      // formData.append("boardImgFile", file);

      console.log(bDetail);
      console.log(file);

      const response = await axios.post(
        API_BASE_URL + UPLOAD_API,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }    
      )

      console.log(response.data);

      navigate(LIST);
      
    }catch(error){
      console.error(error);
      setError("Upload Fail");
    }
  }

  const handleChange = (e) =>{
    setFile(Array.from(e.target.files || []));
  }


  return (
    <>
      <Header />
      <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 col-xl-6 text-center">
              <h2 class="mt-0">Upload Portfolio</h2>
              <hr class="divider" />
            </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div class="col-lg-6">
              <form id="contactForm" onSubmit={uploadHandler}>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bTitle" type="text" placeholder="Enter Title..." required value={bTitle} onChange={(e) => setBTitle(e.target.value)} />
                  <label for="bTitle">Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bName" type="text" placeholder="Enter your Name..." required value={bName} onChange={(e) => setBName(e.target.value)} />
                  <label for="bName">Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bNumber" type="text" placeholder="Enter your Number..." required value={bNumber} onChange={(e) => setBNumber(e.target.value)} />
                  <label for="bNumber">Contact</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bEmail" type="email" placeholder="Enter your Email..." required value={bEmail} onChange={(e) => setBEmail(e.target.value)} />
                  <label for="bEmail">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bText" type="text" placeholder="Summary..." required value={bText} onChange={(e) => setBText(e.target.value)} />
                  <label for="bText">Summary</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" name="bStack" type="text" placeholder="Enter your Stack..." required value={bStack} onChange={(e) => setBStack(e.target.value)} />
                  <label for="bStack">Stack</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea class="form-control" id="bDetail" type="text" placeholder="Detail..." style={{ height: 200 }} required value={bDetail} onChange={(e) => setBDetail(e.target.value)} ></textarea>
                  <label for="bDetail">Detail</label>
                </div>
                <label>Profile Image</label>
                <input class="form-control" id="boardImgFile" type="file" required multiple onChange={handleChange} ></input>


                <br/>
                <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Upload</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}