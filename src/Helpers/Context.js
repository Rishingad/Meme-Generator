import { createContext } from "react";
import useToken from "../Components/useToken";
import { useState } from "react";

const GameStateContext = createContext();

export default GameStateContext;

export const GameStateProvider = ({ children }) => {
const [data, setdata] = useState([
    {
      box_count: "",
      height: "",
      id: "",
      name: "",
      url: "",
      width: "",
    },
  ]);

  const [auth, setAuth] = useState({});
  const [success, setSuccess] = useState(false);
  const [url, seturl] = useState("");
  const [box, setbox] = useState("");
  const [id, setid] = useState("");
  const [caption, setcaption] = useState([]);
  const [meme, setmeme] = useState("");
  const { token, setToken } = useToken();



return (
    <GameStateContext.Provider value={{ data,
        setdata,
        url,
        seturl,
        box,
        setbox,
        id,
        setid,
        caption,
        setcaption,
        meme,
        setmeme,
        success,
        setSuccess,
        auth, 
        setAuth,
        token,
        setToken }}>

        {children}
    </GameStateContext.Provider>
)
}

