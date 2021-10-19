import 'materialize-css'
import {useRoutes} from "./Routes";
import {BrowserRouter as Router} from "react-router-dom"
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./Context/AuthContext";
import {NavBar} from "./Components/NavBar";

function App() {
    const {login, logout, token, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            login, logout, token, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <NavBar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
