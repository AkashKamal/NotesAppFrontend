import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import "../css/HomePage.css"
import { CgNotes } from "react-icons/cg";
import { BiLabel } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { GiGriffinSymbol } from "react-icons/gi";
import { RiAddLine } from "react-icons/ri";
import NotesEditor from "../Components/NotesEditor"
import AddNewLabelPopup from "../Components/AddNewLabelPopup"
import LabelService from "../Services/LabelService"
import { FiSettings } from "react-icons/fi";
import ManageLabels from "../Components/ManageLabels"

//import OpenNewEditor from '../Pages/Notes';

export default function SideBar() {
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const [isPopupOpen, setPopupState] = useState(false)
    const [labelsList, setLabelsList] = useState([])
    const [showLabel, setShowLabel] = useState(false)
    const [addNewLabelPopup,setAddNewLabelPopup] = useState(false)

    useEffect(() => {
        LabelService.getAllLabels().then(res => {
            setLabelsList(res)
        })
    }, []);

    const sideBarItems = [
        {
            name: "Notes",
            route: "/notes",
            icon: <CgNotes />
        },
        {
            name: "Labels",
            route: "/labels",
            icon: (showLabel) ? <IoIosArrowUp /> : <IoIosArrowDown/>,
            subMenu: {
                subList : labelsList,
                subMenuIcon :<BiLabel /> ,
                subMenuStateVariable :  showLabel,
                route : "/labels/"}
        },
        {
            name: "Trash",
            route: "/trash",
            icon: <BsTrash />
        }
    ]

    const labelSettings = {
        icon : labelsList.length >0 ? <FiSettings/> : <RiAddLine />,
        message : labelsList.length >0 ? "Manage Labels" : "Create New Label"
    }

    const newEditor = () => {
        setPopupState(true)

    }

   const handleLabelClick = (url,id) => {
        history.push(url+id)
   }

    const handleClick = (url, sublist) => {
        (sublist) ? setShowLabel(x => !x) : history.push(url)
    }


    return (
        <>
            <div className="sideBar">
                <h1 className="row"><GiGriffinSymbol /></h1>
                <div className="new-note" onClick={() => newEditor()}>
                    <RiAddLine size={20} />
                    <span>Add Note</span>
                </div>
                <ul className="sideBarList">

                    {
                        sideBarItems.map((item, index) => (
                            <>
                                <div key={index} className="menu-row"
                                    id={path.startsWith(item.route) ? "active" : ""}
                                    onClick={() => handleClick(item.route, item.subMenu)}>
                                    <div id="icon">{item.icon}</div>
                                    <div id="title">{item.name}</div>

                                </div>
                               
                                    {(item.subMenu && item.subMenu.subMenuStateVariable) ? item.subMenu.subList.map((subItem, index) => (
                                        <div  key={index} className="submenu-row menu-row" onClick={() => handleLabelClick(item.subMenu.route,subItem.id)}>
                                            <div id="icon">{item.subMenu.subMenuIcon}</div>
                                    <div id="title">{subItem.labelName}</div></div>
                                    )) : ""}
                                    {item.name == "Labels" && item.subMenu.subMenuStateVariable?  <div  className="submenu-row menu-row" onClick={()=> setAddNewLabelPopup(true)}>
                                            <div id="icon">{labelSettings.icon}</div>
                                    <div id="title">{labelSettings.message}</div></div> : ""}
                               
                            </>
                        )
                        )
                    }
                </ul>
                { addNewLabelPopup ? (
                labelsList.length >0 ? <ManageLabels labels={labelsList} onClose={()=> setAddNewLabelPopup(false)}/> :
                <AddNewLabelPopup labelsList ={labelsList} onClose={()=> setAddNewLabelPopup(false)}></AddNewLabelPopup>) : ""}
            </div>
            {
                (isPopupOpen) ? <NotesEditor notesDetails={{ title: "", content: "" }} onClose={() => setAddNewLabelPopup(false)}></NotesEditor> : <div></div>
            }
        </>
    )
}