import {Switch, Redirect, Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginedState} from "./store/LoginStore";


function App() {
    /*
        날짜: 2022/01/19 3:40 오후
        작성자: 한명수
        작성내용: login 상태에 따라 랜더링을 다르게하는 상태
    */
    const [isLogined, setIsLgoined] = useRecoilState(isLoginedState);

    /*
        날짜: 2022/01/19 3:42 오후
        작성자: 한명수
        작성내용:   새로고침 되었을 때 로그인 상태를 유지하는 함수
    */

    const LoginStateInitialization = () => {
        if (localStorage.getItem("login-state") === "true") {
            setIsLgoined(true); //다시 새로고침 되었을 때 로컬 스토리지에 저장이 되어있는 login state에 따라 isLogined를 세팅
        }
    }

    LoginStateInitialization();

    return (
        <div className="App">
            {isLogined ? <Redirect to={"/main"}/> : <Redirect to={"/login"}/>}
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
