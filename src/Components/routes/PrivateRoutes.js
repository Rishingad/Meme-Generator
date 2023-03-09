import { Outlet, Navigate } from 'react-router-dom'
import  GameStateContext  from "../../Helpers/Context";
import { useContext } from 'react';

const PrivateRoutes = () => {
    const { success,setSuccess} = useContext(GameStateContext);
    console.log(success)
    return(
        success ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes