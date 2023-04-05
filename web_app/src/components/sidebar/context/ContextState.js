import React, { useState } from "react";
import Context from "./Context";

const ContextState = (props) => {
  const [studentData, setStudentData] = useState("");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);

  const [addBatchOpen, setAddBatchOpen] = useState(false);
  const [editBatchOpen, setEditBatchOpen] = useState(false);

  const [addSubjectOpen, setAddSubjectOpen] = useState(false);
  const [editSubjectOpen, setEditSubjectOpen] = useState(false);

  const [addGradeOpen, setAddGradeOpen] = useState(false);
  const [editGradeOpen, setEditGradeOpen] = useState(false);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  const [addEventOpen, setAddEventOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);


  return (
    <Context.Provider
      value={{
        studentData,
        setStudentData,
        addStudentOpen,
        setAddStudentOpen,
        editStudentOpen,
        setEditStudentOpen,
        addBatchOpen,
        setAddBatchOpen,
        editBatchOpen,
        setEditBatchOpen,
        addSubjectOpen,
        setAddSubjectOpen,
        editSubjectOpen,
        setEditSubjectOpen,
        addGradeOpen,
        setAddGradeOpen,
        editGradeOpen,
        setEditGradeOpen,
        addUserOpen,
        setAddUserOpen,
        editUserOpen,
        setEditUserOpen,
        addEventOpen,
        setAddEventOpen,
        editEventOpen,
        setEditEventOpen,
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextState;
