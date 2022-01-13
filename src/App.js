import {Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
function App() {
    localStorage.setItem("loginStatus", "false");   //처음 랜더링 됐을 때 localstorage의 loginState를 false로 세팅
    return (
        <div className="App">
            <Route exact path="/" component={ThisLoginPage}/>
            <Route path="/main" component={MainPage}/>
            <Route path="/schedule" component={SchedulePage}/>
            <Route path="/manage" component={ManagePage}/>
        </div>
    );
}

export default App;
