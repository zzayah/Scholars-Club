// import logo from './logo.svg';
import './App.css';
import Navbar from "./navbar"; // Update the import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  function getThreads(){
    fetch("http://localhost:8080/thread/getall", {
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({})
    }).then((res) => res.json()).then((data => {
        return data;
    }));
  }

  function getUserName(id){
    console.log(id);
    fetch("http://localhost:8080/acc/iddata", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({id: id})
    }).then((res) => res.json()).then((data => {
        console.log(data.userName);
        return data.userName;
    }));
  }

  useEffect(() => {
    // setThreads(getThreads());
    const fetchThreads = async () => {
      const res = await fetch('http://localhost:8080/thread/getthreads', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST"
      });
      console.log(res);
      const data = await res.json();
      setThreads(data);
    }

    fetchThreads();
  }, []);

  function createThread(){
    let title = prompt("Title of post?");
    if(title){
      fetch("http://localhost:8080/thread/create", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          userID: localStorage.getItem("_id")
        })
      }).then((res) => res.json()).then((data => {
        navigate("/");
      }))
    }
  }

  return (
    <div>
      <Navbar />

      <div className='thread__container'>
        <h2>Thread List:</h2>
        <ul>
        {threads.map((thread) => (
          <div className='thread__item' key={thread.id}>
            <h3>{thread.title}</h3>
            <h5>Created by user '{getUserName(thread.userID)}'</h5>
            <div className='react__container'>
              {/* Add content for the 'react__container' here */}
            </div>
            <hr/>
          </div>
        ))}
        </ul>
      </div>

      <button onClick={createThread}>Create Thread</button>
    </div>
  );
}

export default App;
