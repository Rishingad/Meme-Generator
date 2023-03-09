import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import  GameStateContext  from "../Helpers/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Form = () => {
  const { data, setdata, url, seturl, box, setbox, id, setid, meme, setmeme } =
    useContext(GameStateContext);
  const navigate = useNavigate();

  const [caption, setcaption] = useState([]);

  // const handleChange=(e)=>{
  //           const t=[...text];
  //           t.push(e.target.value);
  //           settext(t)
  //           console.log(t)
  // }
  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setcaption(
      caption.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };
  // const rows = [];
  // for (let i = 0; i < box; i++) {
  //   rows.push(<input type="text" key={`input${i}`} onChange={handleChange}/>);
  // }

  const formData = new FormData();
  const generateMeme = async (e) => {
    console.log('hii')
    e.preventDefault();
    formData.append("username", "Rish11");
    formData.append("password", "unicode123");
    formData.append("template_id", id);
    caption.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    console.log(caption);

    console.log(formData);
    await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        console.log(res)
        console.log(res.data.url);
        setmeme(res.data.url);
        // onclick = () => {
        //   navigate(`/url=${res.data.url}`);
        // };
      });
    });
  };

  useEffect(() => {
    setcaption(Array(box).fill(""));
  }, []);

  // console.log(meme)
  return (
    <div>
    {meme ===''?
        <div className="form-page">
          <h1 className="form-heading">CREATE YOUR MEME</h1>
          <div className="meme-form">
            <form action="" onSubmit={generateMeme}>
              <div className="form-img">
                <img src={url} alt="" width={400} height={400} />
              </div>
              {/* {rows} */}
              
              {caption.map((c, index) => (
                <div className="form-input">
                  <input
                    className="form-input"
                    onChange={(e) => updateCaption(e, index)}
                    key={index}
                  />
                </div>
              ))}
              <div className="form-button">
                <Button variant="success" type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
        :
        <div>
          <img src={meme} alt="" />
        </div>
}
      </div>
  );
};
export default Form;
