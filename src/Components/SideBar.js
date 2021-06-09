import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import "../css/HomePage.css"
import { CgNotes } from "react-icons/cg";
import { BiLabel } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GiGriffinSymbol } from "react-icons/gi";
import { RiAddLine } from "react-icons/ri";
import NotesEditor from "../Components/NotesEditor"
import LabelService from "../Services/LabelService"

//import OpenNewEditor from '../Pages/Notes';

export default function SideBar() {
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const [isPopupOpen, setPopupState] = useState(false)
    const [labelsList, setLabelsList] = useState([])
    const [showLabel, setShowLabel] = useState(false)

    useEffect(() => {
        LabelService.getAllLabels().then(res => {
            setLabelsList(res)
            // console.log(res);
            // if(!params.id){
            //    params.id = res[0].id;
            // }
            // setLabelId(params.id)
            // setShowNotes(true);

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
                                <div key={index} className="row"
                                    id={path.startsWith(item.route) ? "active" : ""}
                                    onClick={() => handleClick(item.route, item.subMenu)}>
                                    <div id="icon">{item.icon}</div>
                                    <div id="title">{item.name}</div>

                                </div>
                               
                                    {(item.subMenu && item.subMenu.subMenuStateVariable) ? item.subMenu.subList.map((subItem, index) => (
                                        <div  key={index} className="row" onClick={() => handleLabelClick(item.subMenu.route,subItem.id)}>
                                            <div id="icon">{item.subMenu.subMenuIcon}</div>
                                    <div id="title">{subItem.labelName}</div></div>
                                    )) : ""}
                               
                            </>
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