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

  function getUserName(tid, id, updateOne, updateTwo){
    console.log(id);
    fetch("http://localhost:8080/acc/iddata", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({id: id})
    }).then((res) => res.json()).then((data => {
        console.log(data.userName);
        document.getElementById(updateOne).innerHTML = "From " + data.userName;
        document.getElementById(updateTwo).href = "http://localhost:3000/account/"+data.userName;
        let img = document.getElementById(updateOne+"IMG");
        if(img){
          img.src = data.pfp;
        }
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
        method: "POST",
        body: JSON.stringify({id: tid})
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      getUserName(tid, data.userID, "authorname", "authorlink");
      document.getElementById("threadtitle").innerHTML = data.title;
      setReplies(data.replies);
    }

    getReplies();
  }, []);

  function replyThread(){
    let body = prompt("Enter your reply here:");
    if(body){
      fetch("http://localhost:8080/thread/reply", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          tid: tid,
          text: body,
          userID: localStorage.getItem("_id")
        })
      }).then((res) => {
          console.log("hey");
          window.location.reload();
      });
    }
   
  }


  return (
    <div>
        <Navbar />
        <h2 id="threadtitle">Title!</h2>
        <a id="authorlink" href="">
          <h3 id="authorname">Author</h3>
        </a>
        <hr/>
        <h2>Replies:</h2>
        <ul>
        {replies.map((reply) => (
          <div className='thread__item' key={reply.replyID}>
            <h3>{reply.body}</h3>
            <a class="replyDisp" id={"ULINK"+reply.replyID} style={{display: "flex;"}}>
              <img id={"USER"+reply.replyID+"IMG"} src=""></img>
              <h5 id={"USER"+reply.replyID}>"Reply from '{getUserName(reply.replyID, reply.uid, "USER"+reply.replyID, "ULINK"+reply.replyID )}'</h5>
            </a>
            <div className='react__container'>
              {/* Add content for the 'react__container' here */}
            </div>
            <hr/>
          </div>
        ))}
        </ul>

        <button onClick={replyThread}>Reply</button>
      
    </div>
  );
}

export default Thread;
