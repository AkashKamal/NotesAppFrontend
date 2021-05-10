import React from 'react'
import "../css/DeletePopup.css"

function DeletePopup({ props, deleteAction, onClose }) {
    return (
        <div>
            {console.log("isopen")}
            <div className="delete-overlay">
                <div className="delete-popup-container">
                    <div className="delete-message-content">
                        <div className="delete-message">{props}</div>
                        <div className ="options">
                        <button name="Yes" className={"common-button"} onClick={() => deleteAction()}>Yes</button>
                        <button name="No" className="common-button" onClick={onClose}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup
