import React from 'react'
import Notes from "./Notes"
import "../css/Labels.css"
import { useState, useEffect,useLocation}from 'react';
import { useHistory } from 'react-router-dom';
import LabelService from "../Services/LabelService"
import { IoMdAdd } from "react-icons/io";
import { BiLabel } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import AddNewLabelPopup from "../Components/AddNewLabelPopup"
import { useParams } from 'react-router';

function Labels() {

    // const [labelList, setLabelsList] = useState([])
    let params = useParams()
    // let query = new URLSearchParams(useLocation().search);
    const [showNotes, setShowNotes] = useState(true)
    const [labelID, setLabelId] = useState()
    const [newLabelPopup,setNewLablePopup] = useState(false)
    const [activeLabel,setActivelabel] = useState();
  
    let history = useHistory();
    

    useEffect(() => {
        // LabelService.getAllLabels().then(res => {
        //     setLabelsList(res)
        //     console.log(res);
        //     if(!params.id){
        //        params.id = res[0].id;
        //     }
            setLabelId(params.id)
            setActivelabel(params.id)
        //     setShowNotes(true);
            
        // })
        console.log(params)
    }, [params.id]);

    // const changelabel = (id) => {
    //     setLabelId(id);
    //     history.push("/labels/"+id)
    //     console.log(params);
    // }

    const editLabel = (label) =>{
        setActivelabel(label);
        setNewLablePopup(true);
    }


    return (
        <>
            <div className="labels-container">
                {/* <div className="labels-list">
                    <h3>My labels</h3>
                    <div className="label-list-header">
                        <input type="text" placeholder="Search Labels" className="label-search"></input>
                        <div className="label-add" onClick={()=>setNewLablePopup(true)}><IoMdAdd size={20}></IoMdAdd></div>
                    </div>
                    {
                        labelList.map((value, key) => (
                            <>
                                <div className={(params.id == value.id) ? "label active":"label" }
                                id = {(params.id == value.id) ? "active":"" }
                                onClick={() => changelabel(value.id)} >
                                    <div className="label-icon"><BiLabel size={25} /></div>
                                    <div key={key} className="label-name">{value.labelName}</div>
                                    <div className="label-edit-icon"><BiEditAlt size={23} onClick={() => editLabel(value)} /></div>

                                </div>
                            </>
                        ))
                    }
                </div> */}
                <div className="notes-list">
                    {showNotes && <Notes label={labelID} ></Notes>}
                </div>
                { params.action ? <AddNewLabelPopup props={params.id} onClose={()=> {history.push("/labels/")}}></AddNewLabelPopup> : ""}
            </div>
           
        </>
    )
}

export default Labels
