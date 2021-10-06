import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
function App() {
  let [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const getStudents = () => {
    fetch("http://localhost:8090/api/findAllStudents")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.getAllStudentResponse);
        console.log(data.getAllStudentResponse);
      });
  };

  const postStudents = async (e) => {
    await fetch("http://localhost:8090/api/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(e),
    });
    window.location.reload();
  };

  const deleteStudent = async (id) => {
    await fetch(`http://localhost:8090/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const saveStudent = (e) => {
    e.preventDefault();
    if (name === "" || age === "" || name === null || age === null) {
      swal({
        title: "OOPS!",
        text: "You should fill all the fields!",
        icon: "error",
      });
    } else {
      students = { name: name, dob: age };
      postStudents(students);
      console.log("student = > " + JSON.stringify(students));
      console.log(students);
      swal({
        title: "DONE!",
        text: "Successfully Added",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <form onSubmit={saveStudent}>
        <label>name: </label>
        <input
          className="nameInput"
          placeholder="enter your name"
          name="name"
          value={name}
          onChange={nameHandler}
        />
        <label>DOB: </label>
        <input
          className="dob"
          placeholder="enter your date of birth"
          name="age"
          value={age}
          onChange={ageHandler}
        />
        <button className="primary-btn" type="submit">
          save
        </button>
      </form>

      {students.map((student) => (
        <div className="content">
          <p key={student.id}>{student.name}</p>
          <p className="age">{student.age}</p>
          <button
            onClick={() => deleteStudent(student.id)}
            className="primary-btn danger"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
