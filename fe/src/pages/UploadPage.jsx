import { useEffect, useState } from "react";
import Header from "../constants/Header";
import axios from "axios";
import { UPLOAD_API } from "../constants/api_constants";
import { useNavigate } from "react-router-dom";
import { LIST, PAGE_403 } from "../constants/page_constants";
import fetcher from "../fetcher";

export default function UploadPage() {
  const [bTitle, setBTitle] = useState("");
  const [bName, setBName] = useState("");
  const [bNumber, setBNumber] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bText, setBText] = useState("");
  const [bStack, setBStack] = useState("");
  const [bDetail, setBDetail] = useState("");

  const [boardImgFileList, setboardImgFileList]=useState([]);

  const navigate = useNavigate();

  const uploadHandler = async (e) => {
    try{
      const formData = new FormData();
      
      formData.append("bTitle", bTitle);
      formData.append("bName", bName);
      formData.append("bNumber", bNumber);
      formData.append("bEmail", bEmail);
      formData.append("bText", bText);
      formData.append("bStack", bStack);
      formData.append("bDetail", bDetail);

      for(let i=0; i<boardImgFileList.length; i++){
        formData.append("boardImgFileList", boardImgFileList[i]);
      }

      const response = await fetcher.post(UPLOAD_API, formData);

      alert(response.data);

      navigate(LIST);
      
    }catch(error){
      alert(error.response.data);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("authority" !== "ROLE_ADMIN")){
      navigate(PAGE_403);
    }
  })


  const attach = (target) => {
    setboardImgFileList(prev => [...prev, target.files[0]]);
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
                <label>Images</label>
                {Array(3).fill(0).map((_, index) =>
                <input class="form-control" key={index} type="file" onChange={(e)=>attach(e.target)} ></input>
              )}


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