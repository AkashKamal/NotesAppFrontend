import React from 'react'
import { useState, useEffect } from 'react';
import "../css/Notes.css"
import NotesEditor from "../Components/NotesEditor"
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { CgSortAz } from "react-icons/cg";
import NotesService from "../Services/NotesService"
import LabelService from "../Services/LabelService"


function Notes({ label }) {

    const [notesData, setNotesData] = useState([])
    const [isPopupOpen, setPopupState] = useState(false)
    const [notesDetails, setNotesDetails] = useState()

    useEffect(() => {
        if (typeof label == "undefined") {
            NotesService.getAllNotes().then(
                function (res) {
                    setNotesData(res);
                });
        }
        else {
            LabelService.getNotesOfLabel(label).then(
                function (res) {
                    console.log("label id is " + label)
                    setNotesData(res);
                    console.log("Notes Data inside Api" + notesData)
    
                }
            )
        }
    }, [label])

    const openEditor = (notesDetails) => {
        setPopupState(true);
        setNotesDetails(notesDetails);
        console.log("inside editor open")
    }

    return (
        <>
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
                {
                  !notesData ? "is loading" :  notesData.map(
                        (item, index) => (
                            <div onClick={() => openEditor(item)} key={index} className="notesbox">
                                <div className="notesTitle">{item.title}</div>
                                <div className="notesContent" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                <div className="notes-container-footer">
                                    <div className="note-time">{item.modifiedTime}</div>
                                </div>
                            </div>
                        )
                    )
                }

                {
                    (isPopupOpen) ? <NotesEditor notesDetails={notesDetails} onClose={() => setPopupState(false)}></NotesEditor> : <div></div>
                }
            </div>
        </>
    )
}

export default Notes
