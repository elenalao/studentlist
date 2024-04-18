import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";


const RegisterStudent  = () => {
    const [form,setForm]=useState({});
    const navigate=useNavigate();
    const onSubmit=(e)=>{
        e.preventDefault();
        axios.post("/",form).then((res)=>{
            navigate("/");
        })
    }

  return (
    <div>
        <div>
            <Link to="/">
            Back</Link>
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="name of student" name="name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
                <input type="text" placeholder="department" name="department" value={form.department} onChange={(e)=>setForm({...form,department:e.target.value})}/>
                <input type="text" placeholder="studentNumber" name="studentNumber" value={form.studentNumber} onChange={(e)=>setForm({...form,studentNumber:e.target.value})}/>
                <input type="submit" />
            </form>
        </div>

    </div>
  );
};
export default RegisterStudent ;