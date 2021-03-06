import { React, useState,useEffect } from 'react'
import { createPortal } from "react-dom";
import { BiLabel } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { RiAddLine } from "react-icons/ri";
import { FiEdit ,FiDelete} from "react-icons/fi";
import LabelService from "../Services/LabelService"
import DeletePopup from "./DeletePopup"
import "../css/LabelsPopups.css"

function ManageLabels({ labels, onClose }) {

    const [labelsList, setLabelsList] = useState(labels)
    const [newLabelName, setNewLabelName] = useState()
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const[focusedLabelIndex, setFocusLabelIndex] = useState()

    const addLabel = () => {
        var label = {"labelName" : newLabelName}
        LabelService.addLabel(label).then(
            function(res) {
                labels.push(label)
               setLabelsList(labels)
               setNewLabelName("")
            }
        )
    }

    

    const deleteLabel =() => {
        let curLabel = labelsList[focusedLabelIndex];
        console.log(curLabel)
       LabelService.deleteLabel(curLabel.id).then(
        function(res) {
           labels.splice(focusedLabelIndex,1)
           setLabelsList(labels)
           setFocusLabelIndex();
           setIsDeletePopup(false)
        }
    )
    }
    useEffect(() => {
        
    }, [labelsList])

    return createPortal(
        <>
            {console.log(labelsList)}
            <div className="addlabel-overlay">
                <div className="managelabel-container">
                    <div className="popup-header">
                        <h4>Manage Labels</h4>
                        <div className="close-icon" onClick={() => { onClose() }}><GrClose ></GrClose></div>
                    </div>
                    <div className="popup-body">
                        <div className="labels-list-container-in-popup">
                            {labelsList.map((item, index) => (
                                <ul key={index} className="label-item-inpopup">
                                    <div className="right-items">
                                        <div className="icon"><BiLabel size="20" /></div>
                                        <div className="title">{item.labelName}</div>
                                    </div>
                                    <div className="left-items">
                                    <div className="icon"><FiEdit size="20"/></div>
                                    <div className="icon"> <FiDelete size="20" onClick={()=>{setFocusLabelIndex(index);setIsDeletePopup(true)}}/></div>
                                    </div>
                                </ul>
                            ))}
                        </div>
                        <div className="addlabel-popup">
                            <div className="label-icon-footer"><BiLabel size="25" /></div>
                            <input type="text" placeholder="Add new label" value={newLabelName} onChange={e => setNewLabelName( e.target.value)}></input>
                            <div className="add-label-icon"><RiAddLine size="35" onClick={()=>addLabel()} /></div>
                        </div>
                    </div>
                </div>
            </div>
            {(isDeletePopup) ? <DeletePopup props={"Are you sure you want to delete this Label?"} deleteAction={() => deleteLabel()} onClose={() => setIsDeletePopup(false)}></DeletePopup> : ""}
        </>, document.body
    )
}

export default ManageLabels
