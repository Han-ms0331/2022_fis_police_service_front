import {Switch, Redirect, Route} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ManagePage from "./components/pages/ManagePage";
import ThisLoginPage from "./components/pages/ThisLoginPage";
import {useRecoilState} from "recoil";
import {isLoginedState, userAuthority} from "./store/LoginStore";
import axios from "axios";
import NetworkConfig from "./configures/NetworkConfig";
import {useEffect} from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Style} from "./Style";
import CenterRequestPage from "./components/pages/CenterRequestPage";


function App() {
    /*
        날짜: 2022/01/19 3:40 오후
        작성자: 한명수
        작성내용: login 상태에 따라 랜더링을 다르게하는 상태
    */
    const [isLogined, setIsLgoined] = useRecoilState(isLoginedState);
    const [authority, setAuthority] = useRecoilState(userAuthority);

    /*
        날짜: 2022/01/19 3:42 오후
        작성자: 한명수
        작성내용:   새로고침 되었을 때 로그인 상태를 유지하는 함수
    */

    const LoginStateInitialization = async () => {
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/checkLogin`, {withCredentials: true})       //http가 보안 취약하다고 하는거 무시, withCredential:true는 모든 api에 추가 get은 url바로뒤에 ,찍고 post patch는 body뒤에
            .then((res) => {
                console.log(res.data);   // sc: "success", u_auth:"ADMIN"
                const [sc, u_auth] = [res.data.sc, res.data.u_auth];
                if (sc === "success") {
                    setAuthority(u_auth);
                    setIsLgoined(true);
                } else {
                    setIsLgoined(false);
                    setAuthority("");
                }

            }).catch((err) => {
                console.log(err);
                setIsLgoined(false);
                setAuthority("");
            })
    };
    useEffect(() => {
        console.log("inside")
        LoginStateInitialization();
    }, [])

    return (
        <ThemeProvider theme={THEME}>
            <div className="App">
                {isLogined ? <Redirect to={"/main"}/> : <Redirect to={"/login"}/>}
                <Switch>
                    <Route exact path="/login" component={ThisLoginPage}/>
                    <Route exact path="/main" component={MainPage}/>
                    <Route exact path="/hope" component={CenterRequestPage}/>
                    <Route exact path="/schedule" component={SchedulePage}/>
                    <Route exact path="/manage">
                        {authority === 'ADMIN' ? <ManagePage/> : <Redirect to={"/main"}/>}
                    </Route>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

const THEME = createTheme({
    typography: {
        "fontFamily": Style.font,
    }
})
export default App;
