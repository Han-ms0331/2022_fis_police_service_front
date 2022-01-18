import {setupWorker} from "msw";
import {handlers} from './handlers';
import {mainHandlers} from "./MainUrl";
import {loginHandlers} from "./LoginUrl";
import {manageHandlers} from "./ManageUrl";
import {scheduleHandlers} from "./ScheduleUrl";

/*
    날짜: 2022/01/17 1:51 오후
    작성자: 한명수
    작성내용: mocking에 필요한 worker작성
*/


export const worker = setupWorker(...handlers,...mainHandlers,...loginHandlers,...manageHandlers,...scheduleHandlers);
