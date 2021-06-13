import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Authentication/Auth";
import ProtectRoute from "./utils/protectRoutes";
import AuthRoute from "./utils/authRoute";
import ErrorPage from "./pages/404page";
import HomeRoute from "./utils/homeRoute";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <HomeRoute exact path="/" component={Home} />
          <AuthRoute exact path="/auth" component={Auth} />
          <ProtectRoute exact path="/:username/home" component={Home} />
          <Route exact path="/error" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
