import React from "react";

const StudentProfile = ({ student, deleteStudent }) => {
  return (
    <div>
      <img src="https://cdn2.iconfinder.com/data/icons/education-training-flat-version/33/male_student-1024.png" height="200"/>
      <div>
        <h1>{student.name}</h1>
        <h1>{student.department}</h1>
        <h1>{student.studentNumber}</h1>
        <button onClick={() => deleteStudent(student._id)}>X</button>
      </div>
    </div>
  );
};

export default StudentProfile;