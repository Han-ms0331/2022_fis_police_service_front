import {Switch, Redirect, Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
import {useRecoilValue} from "recoil";
import {isLoginedState} from "./store/LoginStore";


function App() {
    const isLogined = useRecoilValue(isLoginedState);
    return (
        <div className="App">
            {isLogined? <Redirect to={"/main"} />: <Redirect to={"/login"} />}
            <Switch>
                <Route exact path="/login" component={ThisLoginPage}/>
                <Route path="/main" component={MainPage}/>
                <Route path="/schedule" component={SchedulePage}/>
                <Route path="/manage" component={ManagePage}/>
            </Switch>
        </div>
    );
}

export default App;
