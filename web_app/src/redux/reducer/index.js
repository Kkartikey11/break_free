import { combineReducers } from "redux";
import { batchReducer } from "./batchReducer";
import { eventReducer } from "./eventReducer";
import { gradeReducer } from "./gradeReducer";
import { AddStudentReducer, studentReducer } from "./studentReducer";
import { subjectReducer } from "./subjectReducer";
import { userReducer } from "./userReducer";

const RootReducer = combineReducers({
    getUser: userReducer,
    getStudent: studentReducer,
    addStudent: AddStudentReducer,
    getGrade: gradeReducer,
    getEvent: eventReducer,
    getSubject: subjectReducer,
    getBatches: batchReducer,
})

export default RootReducer;