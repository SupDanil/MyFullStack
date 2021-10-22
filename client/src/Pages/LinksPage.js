import React, {useContext, useState, useCallback, useEffect} from 'react';
import {useHttp} from "../Hooks/http.hook";
import {AuthContext} from "../Context/AuthContext";
import {Loader} from "../Components/Loader";
import {LinksList} from "../Components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET',null,{
                Authorization: `Bearer ${token}`
            })
            console.log(fetched,"sadas")
            setLinks(fetched)
        } catch (e) {}
    }, [token , request])

    useEffect(() => {
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}