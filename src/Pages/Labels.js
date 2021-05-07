import React from 'react'
import Notes from "./Notes"
import "../css/Labels.css"
import { useState, useEffect } from 'react';
import LabelService from "../Services/LabelService"
import { IoMdAdd } from "react-icons/io";
import { BiLabel } from "react-icons/bi";

function Labels() {

    const [labelList, setLabelsList] = useState([])
    const [activeLabelId, setActiveLabelId] = useState()

    useEffect(() => {
        LabelService.getAllLabels().then(res => {
            setLabelsList(res)
            setActiveLabelId(res[0].id)
            console.log("id =" +activeLabelId);
        })
    }, [], labelList);




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
                                <div className="label">
                                    <div className="label-icon"><BiLabel size={25} /></div>
                                    <div key={key} className="label-name">{value.labelName}</div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="notes-list">
                    <Notes id={activeLabelId}></Notes>
                </div>
            </div>
        </>
    )
}

export default Labels
