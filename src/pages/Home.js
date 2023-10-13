import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import './home.css';
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState([]);

  const onDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this contact?")){
      fireDb.child(`contact/${id}`).remove((err) => {
        if(err){
          toast.error(err);
        }else{
          toast.success("Contact deleted successfully");
        }
      })
    }
  }

  useEffect(() => {
    fireDb.child("contact").on("value", (snapshot) => {
      //console.log(snapshot.val());
      if(snapshot.val() !== null){
        setData({...snapshot.val()});
      } else{
        setData({})
      }
    });
    return () => {
      setData({});
    }
  }, []);

  return (
    <div className='home'>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope='row'>
                  {index + 1}
                </th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='button edit'>Edit</button>
                  </Link>
                  <button className='button delete' onClick={() => onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className='button view'>View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
