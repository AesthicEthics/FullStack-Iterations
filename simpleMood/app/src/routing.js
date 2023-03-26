import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Home
 from "./pages/home/home";
import{
    BrowserRouter as Router, 
    Switch, 
    Route, 
  } from 'react-router-dom'

const App = () =>{
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>

                <Route path="/signup">
                    <SignUp/>
                </Route>

                <Route>
                    <Home />
                </Route>

            </Switch>
        </Router>
    )
}

export default App;