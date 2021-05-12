import React from 'react'
import { useState } from 'react'
import LabelService from "../Services/LabelService"
import { GrClose } from "react-icons/gr";
import "../css/LabelsPopups.css"

function AddNewLabelPopup({ props, onClose }) {
    const[labelName,setLableName] = useState()
    const addLabel = () => {
        var label = {"labelName" : labelName}
        LabelService.addLabel(label).then(
            function(res) {
                onClose();
            }
        )
    }
    return (
        <>
        {console.log("open")}
        <div className="addlabel-overlay">
        <div className="add-label-container">
            <div className="editlabel-header">
            <h4>Add a new label</h4>
            <div className="close-icon" onClick={()=>{onClose()}}><GrClose ></GrClose></div>
            </div>
            <div className ="input-container">
                <input className="labelname-input" type="text" placeholder="Label Name" onChange ={e => setLableName(e.target.value) }></input>
            </div>
            <div className="footer-options">
            <button name="Save" className="common-button small" onClick={() => addLabel()}>Save</button>
            </div>
        </div>
        </div>
        </>
    )
}

export default AddNewLabelPopup
