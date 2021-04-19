import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "../css/Notes.css"
import NotesEditor from "../Components/NotesEditor"
import { GrFormAdd} from "react-icons/gr";


function Notes() {

    const [notesData, setNotesData] = useState([])
    const [isPopupOpen, setPopupState] = useState(false)
    const [notesDetails,setNotesDetails] = useState()


    useEffect(() => {
        return axios.get(`http://localhost:8080/allNotes`, {
            headers: {
                crossdomain: true,
            }
        }).then(res => {
            console.log(res.data);
            setNotesData(res.data);
            return "success"
        });
    }, [],notesDetails)

    const openEditor = (notesDetails) =>{
        setPopupState(true);
        setNotesDetails(notesDetails);
    }

    return (
        <>
        <div className="notesContainer">
            <div className="notesbox" onClick={() => openEditor({title:"",content:""})}>
                <div className = "add-note">
                <GrFormAdd size ={70}/>
                <span>Add Note</span>
                </div>
            </div>
            { notesData.map(
                (item, index) => (
                    <div onClick={() => openEditor(item)} key={index} className="notesbox">
                        <div className="notesTitle">{item.title}</div>
                        <div className="notesContent" dangerouslySetInnerHTML={{__html: item.content}}></div>
                    </div>
                )
            )
            }
            <NotesEditor open={isPopupOpen} notesDetails={notesDetails} onClose = {() => setPopupState(false)}></NotesEditor>

        </div>
        </>
    )
}

export default Notes
