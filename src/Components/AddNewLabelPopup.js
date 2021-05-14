import React from 'react'
import { useState } from 'react'
import LabelService from "../Services/LabelService"
import { GrClose } from "react-icons/gr";
import "../css/LabelsPopups.css"

function AddNewLabelPopup({ props, onClose }) {
    const[labelName,setLableName] = useState(props ? props.labelName : "")
    const header = props ? "Edit Label" : "Add a new label";
    
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
        <div className="addlabel-overlay">
        <div className="add-label-container">
            <div className="editlabel-header">
            <h4>{header}</h4>
            <div className="close-icon" onClick={()=>{onClose()}}><GrClose ></GrClose></div>
            </div>
            <div className ="input-container">
                <input value={labelName} className="labelname-input" type="text" maxlength="30" placeholder="Label Name" onChange ={e => setLableName(e.target.value) }></input>
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
