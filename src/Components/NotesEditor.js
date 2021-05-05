import React from 'react'
import "../css/NotesEditor.css"
import ReactDom from "react-dom"
import axios from 'axios'
import { useState, useEffect } from 'react';
import { AiOutlineBold } from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BiLabel } from "react-icons/bi";
import { MdLabel } from "react-icons/md";
import DeletePopup from "./DeletePopup"

function NotesEditor({notesDetails, onClose }) {

    const [isFav, setIsFav] = useState(notesDetails.favourite)
    const[isDeletePopup,setIsDeletePopup] = useState(false);
    const[isLabelPopup,setIsLabelPopup] = useState(false);

    const addFavourite = (note) => {
        const url = (note.favourite) ? "http://localhost:8080/api/v1/removeFavourite" : "http://localhost:8080/api/v1/addFavourite";
        axios.post(url, null,  {
            headers: {
                crossdomain: true
            },params:{
                "notesId" : note.id
            }
        }).then(res => {
            setIsFav(isFav => !isFav);
        });
    }

    const deleteNote = () => {
        console.log("will delete it");
        setIsDeletePopup(false);
        onClose();
    }


    const toolbarRightIcons = [
        {
            icon: (isFav) ? <AiFillHeart size="25" color="#2fa6ea" /> : <AiOutlineHeart size="25" />,
            onClick: "addFavourite(notesDetails)",
            className: "toolbar-items"
        },
        {
            icon: (notesDetails.label) ? <MdLabel size="25" /> : <BiLabel size="25" />,
            onClick: "",
            className: "toolbar-items"
        },
        {
            icon: <AiOutlineDelete size="25" />,
            onClick: "setIsDeletePopup(true)",
            className: "toolbar-items"
        }
    ];

    const saveNote = (note) => {
        const content = document.getElementById('editor-content').innerHTML;
        const title = document.getElementById('editor-title').textContent;
        notesDetails.title = title;
        notesDetails.content = content;
        const url = (typeof notesDetails.id != 'undefined') ? `http://localhost:8080/api/v1/updateNote` : `http://localhost:8080/api/v1/addNote`
        axios.post(url, notesDetails, {
            headers: {
                crossdomain: true
            }
        }).then(res => {
            if (res.status)
                onClose();
        });
    }

    return (
        <>
            <div className="editorOverlay">
                <div className="empty-space"></div>
                <div className="notesEditorContainer">
                    <div id='editor-title' contentEditable='true' data-placeholder='Title...' className='editor-title' >{notesDetails.title}</div>
                    <div className="toolbar">
                        <div className="toolbar-left">
                            <AiOutlineBold size="25" className="toolbar-items" />
                            <AiOutlineItalic size="25" className="toolbar-items" />
                        </div>
                        <div className="toolbar-right">
                            {
                                toolbarRightIcons.map((item, index) => (
                                    <div key={index} className={item.className} onClick={() => eval(item.onClick)}>{item.icon}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='editor-content' id='editor-content' contentEditable='true' data-placeholder='Body...' dangerouslySetInnerHTML={{ __html: notesDetails.content }}></div>
                    <div className="editor-footer">
                        <button name="Save" className="common-button" onClick={() => saveNote()}>Save</button>
                        <button name="Close" className="common-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>

            {(isDeletePopup) ? <DeletePopup props = {"Aree you sure you want to delete this note?"} deleteAction={()=>deleteNote()} onClose={()=> setIsDeletePopup(false)}></DeletePopup> : ""}
        </>
    )
}

export default NotesEditor
