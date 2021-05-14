import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/HomePage.css"
import { CgNotes } from "react-icons/cg";
import { BiLabel } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { GrNotes } from "react-icons/gr";

export default function SideBar() {

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
            name: "Favorite",
            route: "/favourite",
            icon: <GrFavorite />
        },
        {
            name: "Trash",
            route: "/trash",
            icon: <BsTrash />
        }
    ]
    const [activeItem, setActiveItem] = useState(0);

    useEffect(() => {
    }, [activeItem])

    const history = useHistory();
    const handleClick = (url, index) => {
        history.push(url);
        setActiveItem(index);
        console.log(index);
    }

    return (
        <>
            <div className="sideBar">
                <h1 className="row"><GrNotes/></h1>
                <ul className="sideBarList">

                    {
                        sideBarItems.map((item, index) => (
                            <li key={index} className="row"
                                id={index == activeItem ? "active" : "test"}
                                onClick={() => handleClick(item.route, index)}>
                                <div id="icon">{item.icon}</div>
                                <div id="title">{item.name}</div>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        </>
    )
}