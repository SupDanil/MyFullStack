import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";

export const SuccessfulDeletePage = () =>{

    const [timer,setTimer] = useState(3)

    const [body, setBody] = useState(
        <div className="center">
        <h1>ССЫЛКА УДАЛЕНА</h1>
            <div>вы будите перенаправлены на список ссылок</div>
        </div>
    )

    useEffect(()=>{
        setTimeout(()=>{
            setBody(<Redirect to="/links"/>)
        },1500)
    },)


    return(
        body
    )
}