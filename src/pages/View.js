import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {useHistory, useParams, Link} from "react-router-dom";
import "./view.css";

export default function View() {
  const [user, setUser] = useState({});
  const {id} = useParams();
  useEffect(() => {
    fireDb.child(`contact/${id}`).get().then((snapshot) => {
      if(snapshot.exists()){
        setUser({...snapshot.val()})
      }else{
        setUser({});
      }
    })
  }, []);

  console.log("user", user);
  return (
    <div>
      <h1>Contact Details</h1>
      <div className='detail'>
        <div className='body'>
          <div>
            <span className='label'>Id: </span>
            <span> {id}</span>
          </div>
          <div>
            <span className='label'>Name: </span>
            <span> {user.name}</span>
          </div>
          <div>
            <span className='label'>Email: </span>
            <span> {user.email}</span>
          </div>
          <div>
            <span className='label'>Contact: </span>
            <span> {user.contact}</span>
          </div>
        </div>
        <Link to="/">
          <button className='button view'>Go Back</button>
        </Link>
      </div>
    </div>
  )
}
