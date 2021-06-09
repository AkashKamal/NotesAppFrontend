import { useState, useEffect } from 'react';
import { useHistory,useRouteMatch } from 'react-router-dom';
import "../css/HomePage.css"
import { CgNotes } from "react-icons/cg";
import { BiLabel } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { GiGriffinSymbol } from "react-icons/gi";
import { RiAddLine } from "react-icons/ri";
import Notes from '../Pages/Notes';
import NotesEditor from "../Components/NotesEditor"
//import OpenNewEditor from '../Pages/Notes';

export default function SideBar() {
    let { path, url } = useRouteMatch();
    const [isPopupOpen, setPopupState] = useState(false)
    const sideBarItems = [
        {
            name: "Notes",
            route: "/notes",
            icon: <CgNotes />
        },
        {
            name: "Labels",
            route: "/labels",
            icon: <BiLabel />
        },
        {
            name: "Trash",
            route: "/trash",
            icon: <BsTrash />
        }
    ]

    const newEditor = () => {
        setPopupState(true)
       
    }

    const history = useHistory();
    const handleClick = (url, index) => {
        history.push(url);
    }

    return (
        <>
            <div className="sideBar">
                <h1 className="row"><GiGriffinSymbol/></h1>
                <div className="new-note" onClick={() => newEditor()}>
                                <RiAddLine size={20} />
                                <span>Add Note</span>
                            </div>
                <ul className="sideBarList">

                    {
                        sideBarItems.map((item, index) => (
                            <li key={index} className="row"
                                id={path.startsWith(item.route) ? "active" : ""}
                                onClick={() => handleClick(item.route, index)}>
                                <div id="icon">{item.icon}</div>
                                <div id="title">{item.name}</div>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
            {
                (isPopupOpen) ? <NotesEditor notesDetails={{ title: "", content: "" }} onClose={() => setPopupState(false)}></NotesEditor> : <div></div>
            }
        </>
    )
}