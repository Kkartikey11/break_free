import { combineReducers } from "redux";
import { AddBatchesReducer, batchReducer } from "./batchReducer";
import { AddEventReducer, eventReducer } from "./eventReducer";
import { AddGradeReducer, gradeReducer } from "./gradeReducer";
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
    addGrade: AddGradeReducer,
    addBatches: AddBatchesReducer,
    addEvent: AddEventReducer,
})

export default RootReducer;