import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "../css/Notes.css"
import NotesEditor from "../Components/NotesEditor"
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { CgSortAz } from "react-icons/cg";


function Notes() {

    const [notesData, setNotesData] = useState([])
    const [isPopupOpen, setPopupState] = useState(false)
    const [notesDetails, setNotesDetails] = useState()


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
    }, [], notesData)

    const openEditor = (notesDetails) => {
        setPopupState(true);
        setNotesDetails(notesDetails);
    }

    return (
        <>
            <body>
                <div className="notesContainer">
                    <div className="notes-header">
                        <div className="notes-header-left">
                            <div className="notes-sort"><CgSortAz size="35" />
                                <div>Sort by</div>
                            </div>

                        </div>
                        <div className="notes-header-right" onClick={() => openEditor({ title: "", content: "" })}>
                            <div className="new-note">
                                <AiOutlineAppstoreAdd size={20} />
                                <span>Add Note</span>
                            </div>
                        </div>
                    </div>
                    {notesData.map(
                        (item, index) => (
                            <div onClick={() => openEditor(item)} key={index} className="notesbox">
                                <div className="notesTitle">{item.title}</div>
                                <div className="notesContent" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                <div className="notes-container-footer">
                                    <div className="note-time">{item.lastModifiedTime}</div>
                                </div>
                            </div>
                        )
                    )
                    }

                    {
                        (isPopupOpen) ? <NotesEditor notesDetails={notesDetails} onClose={() => setPopupState(false)}></NotesEditor> : <div></div>
                    }



                </div>
            </body>
        </>
    )
}

export default Notes
