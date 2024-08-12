// import logo from './logo.svg';
import { Navigate } from "react-router-dom";
import './account.css';
import Navbar from "./navbar"; // Update the import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Form, useLoaderData } from "react-router-dom";

export async function loader({params}){
    const userName = (params.username);
    return userName;
}

function Page404() {

  return (
    <div>
      <Navbar />
        <h1> Page not found </h1>
    </div>
    );
}

export default Page404;
