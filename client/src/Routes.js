import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {LinksPage} from "./Pages/LinksPage";

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>

        </Switch>
    )

}