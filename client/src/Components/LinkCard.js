import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../Hooks/http.hook";
import {AuthContext} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import {TreeDModel} from "./3dModel";

export const LinkCard = ({link}) => {

    const {loading, request} = useHttp();
    const [deleted, setDeleted] = useState(false)
    const {token} = useContext(AuthContext)
    const history = useHistory()

    const linkCode = link.to.split('/')[3]

    useEffect(() => {

        if (deleted) {
            history.push("/success_delete")
        }
    }, [deleted]);


    const deleteLink = useCallback(async () => {
        try {
            const fetched = await request(`/delete/${linkCode}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setDeleted(fetched)
        } catch (e) {
        }
    }, [token, request])


    const linkArray = link.to.split('/')

    const newUrlPart = `localhost:4000/dakon`

    linkArray[2] = newUrlPart

    const newUrl = linkArray.join('/')


    return (
        <>
            <TreeDModel/>

            <h2>Ссылка</h2>
            <p>Ваша ссылка: <a href={newUrl} target="_blank" rel="noopener noreferrer">{newUrl}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            <div className="btn red darken-3" onClick={() => deleteLink()}>Удалить сслыку</div>
        </>
    )
}
