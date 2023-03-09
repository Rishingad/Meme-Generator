import { useRef, useState, useEffect, useContext } from "react";
import axios from "./api/axios";
import  GameStateContext  from "../Helpers/Context";


const Login = () => {

const {success,setSuccess,auth,setAuth}=useContext(GameStateContext)

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    e.preventDefault();
    // let config= {method:"post",
    //             url:"api/login/",
    //             headers: { 'Content-Type': 'application/json' },
    //             data:""
    //             }
    try {
      const response = await axios.post(
        "/api/login/",
        JSON.stringify({ username, password }),

        {
          // method:'POST',
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      setAuth({ username, password, accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
      console.log(success)
    } catch (err) {
      console.log(err);
      if (err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {/* {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : ( */}
      <section>
        <p ref={errRef} >
          {errMsg}
        </p>
        <h1>Login In</h1>
        <form onSubmit={handleSubmit}>
          <label >Username:</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={username}
            required
          />

          <label >Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span>
            {/*put router link here*/}
            <a href="#">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
