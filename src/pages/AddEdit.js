import React, {useState, useEffect} from 'react';
import {useNavigate , useParams} from 'react-router-dom';
import './addEdit.css';
import fireDb from "../firebase";
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    contact: ""
}

export default function AddEdit() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const {name, email, contact} = state;
    const navigate = useNavigate();

    const {id} = useParams();

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
        };
      }, [id]);

      useEffect(() => {
        if(id){
          //console.log(id);
          setState({...data[id]})
        }else{
          setState({...initialState})
        }
        return() => {
          setState({...initialState})
        }
      }, [id, data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide value in each input field");
        } else{
            if(!id){
                fireDb.child("contact").push(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else{
                        toast.success("Contact Added Successfully");
                    }
                });
            }else{
                fireDb.child(`contact/${id}`).set(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else{
                        toast.success("Contact Update Successfully");
                    }
                });
            }
            
            setTimeout(()=>navigate("/"), 500);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value})
    }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input className='form-control' type='text' name="name" value={name || ""} id="name" placeholder='Your Name' onChange={handleInputChange} />
        
        <label htmlFor='email'>Email</label>
        <input className='form-control' type='email' name="email" value={email || ""} id="email" placeholder='Your Email Address' onChange={handleInputChange} />
        
        <label htmlFor='contact'>Contact</label>
        <input className='form-control' type='number' name="contact" value={contact || ""} id="contact" placeholder='Your Contact Number' onChange={handleInputChange} />

        <button type='submit'>{id ? 'Update' : "Save"}</button>
      </form>
    </div>
  )
}
