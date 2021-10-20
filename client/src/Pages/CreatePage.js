import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../Hooks/http.hook";
import {AuthContext} from "../Context/AuthContext";


export const CreatePage = () =>{
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const pressHandler = async event => {

        if(event.key === 'Enter'){
            try{
              const data = await request('/api/link/generate', 'POST', {from: link}, {
                  Authorization: `Bearer ${auth.token}`
              })
                if(data){
                    console.log("все норм")
                }

            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}