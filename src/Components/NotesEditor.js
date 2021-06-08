import React from 'react'
import "../css/NotesEditor.css"
import { useState } from 'react';
import { AiOutlineBold } from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { BsArrowsAngleContract } from "react-icons/bs";
import { BiLabel } from "react-icons/bi";
import { MdLabel } from "react-icons/md";
import NotesService from "../Services/NotesService"
import DeletePopup from "./DeletePopup"
import { GrClose } from "react-icons/gr";

function NotesEditor({ notesDetails, onClose }) {

    const [isFav, setIsFav] = useState(notesDetails.favourite)
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [isLabelPopup, setIsLabelPopup] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFavourite = (note) => {
        NotesService.toogleFavourite(note).then(res => {
            setIsFav(isFav => !isFav);
            note.favourite = !note.favourite
        })

    }

    const deleteNote = (note) => {
        NotesService.deleteNote(notesDetails.id).then(res => {
            setIsDeletePopup(false);
            onClose();
        })

    }


    const toolbarRightIcons = [
        {
            icon: (isFav) ? <AiFillHeart size="25" color="#2fa6ea" /> : <AiOutlineHeart size="25" />,
            onClick: "toggleFavourite(notesDetails)",
            className: "toolbar-items",
            visible: notesDetails.id
        },
        {
            icon: ((notesDetails.label) ? <MdLabel size="25" /> : <BiLabel size="25" />),
            onClick: "",
            className: "toolbar-items",
            visible: notesDetails.id
        },
        {
            icon: <AiOutlineDelete size="25" />,
            onClick: "setIsDeletePopup(true)",
            className: "toolbar-items",
            visible: notesDetails.id
        }
    ];

    const saveNote = (note) => {
        const content = document.getElementById('editor-content').innerHTML;
        const title = document.getElementById('editor-title').textContent;
        notesDetails.title = title;
        notesDetails.content = content;
        NotesService.saveNote(notesDetails).then(res => {
            console.log(res);
            onClose();
        })
    }

    return (
        <>
            <div className="editorOverlay">
                <div id="container" className={isFullScreen ? "notesEditorContainer fullScreen" : "notesEditorContainer"}>
                    <div className="editor-header">
                        <div id='editor-title' contentEditable='true' data-placeholder='Title...' className='editor-title' >{notesDetails.title}</div>
                        <div className="close-icon" onClick={() => { onClose() }}><GrClose ></GrClose></div>
                    </div>
                    <div className="editor-body">
                        <div className="toolbar">
                            <div className="toolbar-left">
                                {(!isFullScreen) ? <BsArrowsAngleExpand onClick={() => setIsFullScreen(true)} size="25" className="toolbar-items" /> : <BsArrowsAngleContract onClick={() => setIsFullScreen(false)} size="25" className="toolbar-items" />}
                                <AiOutlineBold size="25" className="toolbar-items" />
                                <AiOutlineItalic size="25" className="toolbar-items" />
                            </div>
                            <div className="toolbar-right">
                                {
                                    toolbarRightIcons.filter((item) => item.visible).map((item, index) => (
                                        <div key={index} className={item.className} onClick={() => eval(item.onClick)}>{item.icon}</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='editor-content' id='editor-content' contentEditable='true' data-placeholder='Body...' dangerouslySetInnerHTML={{ __html: notesDetails.content }}></div>
                    </div>
                    <div className="editor-footer">
                        <button name="Save" className="common-button medium" onClick={() => saveNote()}>Save</button>
        
                    </div>
                </div>
            </div>

            {(isDeletePopup) ? <DeletePopup props={"Aree you sure you want to delete this note?"} deleteAction={() => deleteNote()} onClose={() => setIsDeletePopup(false)}></DeletePopup> : ""}
        </>
    )
}

export default NotesEditor
