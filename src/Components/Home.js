import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  GameStateContext  from "../Helpers/Context";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import './Meme.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const navigate = useNavigate();

  const {
    data,
    setdata,
    url,
    seturl,
    box,
    setbox,
    id,
    setid,
    caption,
    setcaption,
    success,
    setSuccess
  } = useContext(GameStateContext);
  
  const [pageCount, setpagecount] = useState(0);
  const [offset, setOffset] = useState(0);
  const memeData = async () => {
    try {
      const url = "https://api.imgflip.com/get_memes";

      const data = await (await fetch(url)).json();
      console.log(data);
      // console.log(data.memes.length);
      const memesDisplay = data.data.memes.slice(offset, offset + 10);
      memesDisplay ? setdata(memesDisplay) : console.log('EHH');
      setpagecount(Math.ceil(data.data.memes.length / 10));
      // setdata(data.data.memes);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    memeData();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    if (selectedPage===0) {
      setOffset(0)
    }
    else{
    setOffset((selectedPage+1)*10 - 10);
    }
  };
  return (
    <div className="page">
      <h1 className="super-heading">MEME GENERATOR</h1>
      <div className="meme_template" >
        {data.map((meme) => (
          <div key={meme.id}>
            <div className="heading">{meme.name}</div>
            <div className="image"><img src={meme.url} alt="" width={250} height={250} /></div>
            <div className="button">
            <Button
              onClick={() => {
                {
                  setbox(meme.box_count);
                }
                {
                  seturl(meme.url);
                }
                {
                  setid(meme.id);
                }
                navigate(`/id=${meme.id}`);
              }} variant="primary"
            > 
              Create
            </Button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        nextLinkClassName={"pagination__link"}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        onPageActive={"pagination-active"}
        // theme='dark'
      />
    </div>
  );
};

export default Home;
