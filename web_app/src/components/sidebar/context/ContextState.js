import React, { useState } from "react";
import Context from "./Context";

const ContextState = (props) => {
  const [studentData, setStudentData] = useState("");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);

  const [addBatchOpen, setAddBatchOpen] = useState(false);
  const [editBatchOpen, setEditBatchOpen] = useState(false);
  const [batchData, setBatchData] = useState("");

  const [addSubjectOpen, setAddSubjectOpen] = useState(false);
  const [addNewSubjectOpen, setAddNewSubjectOpen] = useState(false);
  const [editSubjectOpen, setEditSubjectOpen] = useState(false);
  const [subjectData, setSubjectData] = useState("");

  const [addGradeOpen, setAddGradeOpen] = useState(false);
  const [editGradeOpen, setEditGradeOpen] = useState(false);
  const [gradeData, setGradeData] = useState("");

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [userData, setUserData] = useState("");

  const [addEventOpen, setAddEventOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [viewEventOpen, setViewEventOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        studentData,
        setStudentData,
        addStudentOpen,
        setAddStudentOpen,
        editStudentOpen,
        setEditStudentOpen,

        addEventOpen,
        setAddEventOpen,
        editEventOpen,
        setEditEventOpen,
        eventData,
        setEventData,
        viewEventOpen,
        setViewEventOpen,

        addGradeOpen,
        setAddGradeOpen,
        editGradeOpen,
        setEditGradeOpen,
        gradeData,
        setGradeData,

        addUserOpen,
        setAddUserOpen,
        editUserOpen,
        setEditUserOpen,
        userData,
        setUserData,

        addSubjectOpen,
        setAddSubjectOpen,
        editSubjectOpen,
        setEditSubjectOpen,
        subjectData,
        setSubjectData,
        addNewSubjectOpen,
        setAddNewSubjectOpen,

        addBatchOpen,
        setAddBatchOpen,
        editBatchOpen,
        setEditBatchOpen,
        batchData,
        setBatchData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextState;
