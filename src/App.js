import {Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
import {useState} from "react";
function App() {

    localStorage.setItem("loginStatus", "false");
    return (
        // <div className="App">
        //     <Route exact path="/" component={() => <ThisLoginPage setIsLogined={setIsLogined}/>}/>
        //     <Route path="/main" component={() => <MainPage isLogined={isLogined}/>}/>
        //     <Route path="/schedule" component={() => <SchedulePage isLogined={isLogined}/>}/>
        //     <Route path="/manage" component={() => <ManagePage isLogined={isLogined}/>}/>
        // </div>

        <div className="App">
            <Route exact path="/" component={ThisLoginPage}/>
            <Route path="/main" component={MainPage}/>
            <Route path="/schedule" component={SchedulePage}/>
            <Route path="/manage" component={ManagePage}/>
        </div>
    );
}

export default App;
