import { useEffect, useState } from "react";
import Header from "../constants/Header";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../fetcher";
import { LIST_API } from "../constants/api_constants";
import { LOGIN } from "../constants/page_constants";
import Paging from "../constants/Paging";

export default function Listpage() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [maxPageNum, setMaxPageNum] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  
  const loadPage = async(page, data) =>{
    const searchData = {
      searchDateType: data ? data.searchDateType : "all",
      searchBy: data ? data.searchBy : "bTitle",
      searchQuery: data ? data.searchQuery : ""
    };
    try{
      const response = await fetcher.post(
        LIST_API + `/${page}`,
        searchData
      );
      setItems(response.data.page.content);
      setTotalPages(response.data.page.totalPages);
      setPageNum(response.data.page.number);
      setMaxPageNum(response.data.maxPageNum);
    }catch(error){
      alert(error.response.data);
    }
  }
  
  useEffect(() => {
    if(localStorage.getItem("authority") == null){
      alert("로그인 후 이용해주세요.");
      navigate(LOGIN);
    }
    loadPage(0);
  },[]);

  return(
    <>
    <Header/>
    <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 col-xl-6 text-center">
              <h2 class="mt-0">Portfolio List</h2>
              <hr class="divider" />
            </div>
          </div>
        <div className="content">
          <Items items={items}/>
        </div>
        <PageSearchBar
        loadfunc={loadPage}
        totalPages={totalPages}
        maxPageNum={maxPageNum}
        pageNum={pageNum}
        />
        </div>
    </section>
    </>
  );
}

function Items({items}){
  return(
    <table className="table">
      <thead>
        <tr>
          <td>Title</td>
          <td>RegDate</td>
          <td>UpdateDate</td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item)=>
          <Item key={Item.id} item={item}/>
        )}
      </tbody>
    </table>
  )
}

function Item({item}){
  return(
    <tr>
      <td>{item.id}</td>
      <td>
        {item.btitle}
      </td>
      <td>{item.regTime}</td>
      <td>{item.updateTime}</td>
    </tr>
  )
}

function PageSearchBar({loadfunc, totalPages, maxPageNum, pageNum}){
  const [searchDateType, setSearchDateType] = useState("all");
  const [searchBy, setSearchBy] = useState("Title");
  const [searchQuery, setSearchQuery] = useState("");

  const search = (page) => {
    const searchData = {
      searchDateType: searchDateType,
      searchBy: searchBy,
      searchQuery: searchQuery
    };
    loadfunc(page, searchData);
  }
  return(
    <>
    <Paging
    loadPage={search}
    totalPages={totalPages}
    maxPageNum={maxPageNum}
    pageNum={pageNum}
    />
     <div className="form-inline justify-content-center">
            <SearchSelect
            value={searchDateType}
            onchangefunc={setSearchDateType}
            >
                <option value="all">전체기간</option>
                <option value="1d">1일</option>
                <option value="1w">1주</option>
                <option value="1m">1개월</option>
                <option value="6m">6개월</option>
            </SearchSelect>

            <SearchSelect
            value={searchBy}
            onchangefunc={setSearchBy}
            >
                <option value="bTitle">Title</option>
                <option value="bName">Wirter</option>
            </SearchSelect>

            <input 
            type="text" 
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button onClick={() => search(0)} className="btn btn-primary">검색</button>
        </div>
    </>
  )
}

function SearchSelect({children, value, onchangefunc}) {
  return (
      <select 
      className="form-control" 
      style={{width: 'auto'}}
      value={value}
      onChange={(e) => onchangefunc(e.target.value)}
      >
      {children}
      </select>
  )
}