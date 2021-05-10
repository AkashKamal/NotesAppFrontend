import React from 'react'
import Notes from "./Notes"
import "../css/Labels.css"
import { useState, useEffect, useRef } from 'react';
import LabelService from "../Services/LabelService"
import { IoMdAdd } from "react-icons/io";
import { BiLabel } from "react-icons/bi";

function Labels() {

    const [labelList, setLabelsList] = useState([])
    // const [notesData, setNotesData] = useState()
    const [showNotes, setShowNotes] = useState(false);
    const[labelID, setLabelId] = useState()

    useEffect(() => {
        LabelService.getAllLabels().then(res => {
            setLabelsList(res)
            setLabelId(res[0].id)
            // getAllNotesOfLabel(res[0].id);
            setShowNotes(true);
        })
    }, []);

    // const getAllNotesOfLabel = (id) => {
    //     LabelService.getNotesOfLabel(id).then(
    //         function (res) {
    //             setNotesData(res);
    //             console.log("Notes Data inside Api" + notesData)

    //         }
    //     )
    // }

    const changelabel = (id) => {
        // getAllNotesOfLabel(id);
        // console.log("Notes Data inside change label" + notesData)
        setLabelId(id);
    }


    return (
        <>
            <div className="labels-container">
                <div className="labels-list">
                    <div className="label-list-header">
                        <input type="text" placeholder="Search Labels" className="label-search"></input>
                        <div className="label-add"><IoMdAdd size={20}></IoMdAdd></div>
                    </div>
                    {
                        labelList.map((value, key) => (
                            <>
                                <div className="label" onClick={() => changelabel(value.id)} >
                                    <div className="label-icon"><BiLabel size={25} /></div>
                                    <div key={key} className="label-name">{value.labelName}</div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="notes-list">

                    {showNotes && <Notes label={labelID} ></Notes>}
                </div>
            </div>
        </>
    )
}

export default Labels
