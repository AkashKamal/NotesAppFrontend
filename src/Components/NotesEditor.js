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

function NotesEditor({ open, notesDetails, onClose }) {


    const addFavourite = (note) => {
        console.log(note.id)
        const url = (note.favourite) ? "http://localhost:8080/api/v1/removeFavourite" :"http://localhost:8080/api/v1/addFavourite";
        const noteId = note.id;
        axios.post(url, note, {
            headers: {
                crossdomain: true
            }
        }).then(res => {
           notesDetails.favourite = !notesDetails.favourite
           
        });
    }

    useEffect(() => {
    }, [], notesDetails)

    const toolbarRightIcons = [
        {
            icon: (notesDetails.favourite) ? <AiFillHeart size="25" color="#2fa6ea"/> :<AiOutlineHeart size = "25" />,
            onClick: "addFavourite(notesDetails)",
            className : "toolbar-items"
        },
        {
            icon: (notesDetails.label) ? <MdLabel size="25"/> : <BiLabel size = "25"/>,
            onClick: " ",
            className : "toolbar-items"
        },
        {
            icon: <AiOutlineDelete size="25" />,
            onClick: " ",
            className : "toolbar-items"
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

    if (!open) return null
    console.log(open)
    return ReactDom.createPortal(
        <>
            <div className="editorOverlay">
                <div className="notesEditorContainer">
                    <div id='editor-title' contentEditable='true' data-placeholder='Title...' className='editor-title' >{notesDetails.title}</div>
                    <div className="toolbar">
                        <div className="toolbar-left">
                            <AiOutlineBold size="25" className="toolbar-items" />
                            <AiOutlineItalic size="25" className="toolbar-items" />
                        </div>
                        <div className="toolbar-right">
                            {/* <AiOutlineHeart size="25" className="toolbar-items" />
                            <BiLabel size="25" className="toolbar-items" />
                            <AiOutlineDelete size="25" className="toolbar-items" /> */}
                             {/* <div className="toolbar-items" ><AiOutlineDelete/></div> */}
                            {
                                toolbarRightIcons.map((item,index)=>(
                                  <div id ={index} className={item.className} onClick={() => eval(item.onClick)}>{item.icon}</div>
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
        </>,
        document.getElementById("editor")
    )
}

export default NotesEditor
