// import logo from './logo.svg';
import './thread.css';
import Navbar from "./navbar"; // Update the import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import { Form, useLoaderData } from "react-router-dom";

export async function loader({params}){
    const id = (params.tid);
    return id;
}

function Thread() {
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();

  const tid = useLoaderData();

  function getUserName(tid, id){
    console.log(id);
    fetch("http://localhost:8080/acc/iddata", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({id: id})
    }).then((res) => res.json()).then((data => {
        console.log(data.userName);
        document.getElementById("USER"+tid).innerHTML = "Created by " + data.userName;
        document.getElementById("ULINK"+tid).href = "http://localhost:3000/account/"+data.userName;
        return data.userName;
    }));
  }

  useEffect(() => {
    // setThreads(getThreads());
    const getReplies = async () => {
      const res = await fetch('http://localhost:8080/thread/getreplies', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST"
      });
      console.log(res);
      const data = await res.json();
      setReplies(data);
    }

    getReplies();
  }, []);

  function replyThread(){
    // let title = prompt("Title of post?");
    // if(title){
    //   fetch("http://localhost:8080/thread/replu", {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       title: title,
    //       userID: localStorage.getItem("_id"),
        
    //     })
    //   }).then((res) => res.json()).then((data => {
    //     // navigate("/");
        
    //   }))
    // }
  }

  return (
    <div>
        <Navbar />
        <h2 id="threadtitle">Title!</h2>
        <ul>
        {replies.map((thread) => (
          <div className='thread__item' key={thread.id}>
            <h3>{thread.title}</h3>
            <a id={"ULINK"+thread.id}>
              <h5 id={"USER"+thread.id}>"Created by user '{getUserName(thread.id, thread.userID)}'</h5>
            </a>
            <div className='react__container'>
              {/* Add content for the 'react__container' here */}
            </div>
            <hr/>
          </div>
        ))}
        </ul>
      
    </div>
  );
}

export default Thread;
