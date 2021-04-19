import React from 'react'
import "../css/Notes.css"
import ReactDom from "react-dom"
import axios from 'axios'

function NotesEditor({open,notesDetails,onClose}) {


    const saveNote = (note) => {
        const content = document.getElementById('editor-content').innerHTML;
        const title = document.getElementById('editor-title').textContent;
        notesDetails.title = title;
        notesDetails.content = content;
        axios.post(`http://localhost:8080/api/v1/updateNote`, notesDetails, {
            headers: {
                crossdomain: true
            }
        }).then(res => {
            return "success"
        });
    }

    if (!open) return null
    console.log(open)
    return ReactDom.createPortal(
        <>
            <div className="editorOverlay">
                <div className="notesEditorContainer">
                    <div id='editor-title' contentEditable='true' data-placeholder='Title...' className='editor-title' >{notesDetails.title}</div>
                    <div className='editor-content' id='editor-content' contentEditable='true' data-placeholder='Body...' dangerouslySetInnerHTML={{__html: notesDetails.content}}></div>
                    <div className = "editor-footer">
                    <button name="Save" className = "common-button"onClick={() => saveNote()}>Save</button>
                    <button name="Close" className = "common-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("editor")
    )
}

export default NotesEditor
