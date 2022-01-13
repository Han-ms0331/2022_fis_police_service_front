import {Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
import {useState} from "react";
function App() {
    const [isLogined, setIsLogined] = useState(false);  //로그인 상태를 관리하기 위한 state
    return (
        <div className="App">
            <Route exact path="/" component={() => <ThisLoginPage setIsLogined={setIsLogined}/>}/>
            <Route path="/main" component={() => <MainPage isLogined={isLogined}/>}/>
            <Route path="/schedule" component={() => <SchedulePage isLogined={isLogined}/>}/>
            <Route path="/manage" component={() => <ManagePage isLogined={isLogined}/>}/>
        </div>
    );
}

export default App;
