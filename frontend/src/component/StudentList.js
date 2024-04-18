import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  // const [refresh, setRefresh] = useState(new Date());
  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log("Error from StudentList");
        console.log(err);
      });
  });
  // }, [refresh]);

  const deleteStudent = (id) => {
    axios.delete(`/${id}`).then((response) => {
      // setRefresh(new Date());
      console.log("Student is deleted!");
    });
  };
  return (
    <div>
      <div>
        <h1>Students in the datebase</h1>
        <p>{students.length || 0}</p>
      </div>
      <div>
        <Link to="/register">Add new student</Link>
      </div>
      <div>
        {students.map((student, key) => (
          <StudentProfile
            student={student}
            key={key}
            deleteStudent={deleteStudent}
          />
        ))}
      </div>
    </div>
  );
}
