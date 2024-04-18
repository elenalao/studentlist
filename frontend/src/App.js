import "./css/App.css";
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import RegisterStudent from "./component/RegisterStudent";
import StudentList from "./component/StudentList";
import axios from 'axios';

axios.defaults.baseURL=process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<StudentList/>} />
        <Route path="/register" element={<RegisterStudent/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;


