import React from 'react'
import Notes from "./Notes"
import "../css/Labels.css"
import { useState, useEffect, useRef } from 'react';
import LabelService from "../Services/LabelService"
import { IoMdAdd } from "react-icons/io";
import { BiLabel } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import AddNewLabelPopup from "../Components/AddNewLabelPopup"

function Labels() {

    const [labelList, setLabelsList] = useState([])
    const [showNotes, setShowNotes] = useState(false)
    const [labelID, setLabelId] = useState()
    const [newLabelPopup,setNewLablePopup] = useState(false)

    useEffect(() => {
        LabelService.getAllLabels().then(res => {
            setLabelsList(res)
            setLabelId(res[0].id)
            setShowNotes(true);
        })
    }, []);

    const changelabel = (id) => {
        setLabelId(id);
    }


    return (
        <>
            <div className="labels-container">
                <div className="labels-list">
                    <h3>My labels</h3>
                    <div className="label-list-header">
                        <input type="text" placeholder="Search Labels" className="label-search"></input>
                        <div className="label-add" onClick={()=>setNewLablePopup(true)}><IoMdAdd size={20}></IoMdAdd></div>
                    </div>
                    {
                        labelList.map((value, key) => (
                            <>
                                <div className="label" onClick={() => changelabel(value.id)} >
                                    <div className="label-icon"><BiLabel size={25} /></div>
                                    <div key={key} className="label-name">{value.labelName}</div>
                                    <div className="label-edit-icon" onClick={() => {
                                        console.log("edit label")
                                    }}><BiEditAlt size={23} /></div>

                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="notes-list">
                    {showNotes && <Notes label={labelID} ></Notes>}
                </div>
                { newLabelPopup ? <AddNewLabelPopup onClose={()=> setNewLablePopup(false)}></AddNewLabelPopup> : ""}
            </div>
           
        </>
    )
}

export default Labels
