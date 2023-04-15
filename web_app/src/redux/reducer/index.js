import { combineReducers } from "redux";
import { AddBatchesReducer, DeleteBatchesReducer, EditBatchesReducer, batchReducer } from "./batchReducer";
import { AddEventReducer, DeleteEventReducer, EditEventReducer, eventReducer } from "./eventReducer";
import { AddGradeReducer, EditGradeReducer, gradeReducer } from "./gradeReducer";
import { AddStudentReducer, DeleteStudentReducer, EditStudentReducer, studentReducer } from "./studentReducer";
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
    deleteUser: DeleteUserReducer,
    editStudent: EditStudentReducer,
    deleteStudent: DeleteStudentReducer,
    editBatch: EditBatchesReducer,
    deleteBatch: DeleteBatchesReducer,
    editEvent: EditEventReducer,
    deleteEvent: DeleteEventReducer

})

export default RootReducer;