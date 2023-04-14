import { combineReducers } from "redux";
import { AddBatchesReducer, batchReducer } from "./batchReducer";
import { AddEventReducer, eventReducer } from "./eventReducer";
import { AddGradeReducer, EditGradeReducer, gradeReducer } from "./gradeReducer";
import { AddStudentReducer, studentReducer } from "./studentReducer";
import { AddSubjectReducer, DeleteSubjectReducer, EditSubjectReducer, subjectReducer } from "./subjectReducer";
import { userReducer, AddUserReducer, EditUserReducer, DeleteUserReducer } from "./userReducer";
import { AuthReducer } from "./authReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
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
    addSubject: AddSubjectReducer,
    addUser: AddUserReducer,
    editSubject: EditSubjectReducer,
    editUser: EditUserReducer,
    deleteSubject: DeleteSubjectReducer,
    editGrade: EditGradeReducer,
    deleteGrade: DeleteSubjectReducer,
    deleteUser: DeleteUserReducer

})

export default RootReducer;