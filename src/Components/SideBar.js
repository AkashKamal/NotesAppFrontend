import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/HomePage.css"
import { CgNotes} from "react-icons/cg";
import { BiLabel} from "react-icons/bi";

export default function SideBar() {

    const sideBarItems = [
        {
            name: "Notes",
            route: "/notes",
            icon: <CgNotes/>
        },
        {
            name: "Labels",
            route: "/labels",
            icon: <BiLabel/>
        }
    ]
    const [activeItem, setActiveItem] = useState(0);
    
    useEffect(() => {
    }, [activeItem])

    const history = useHistory();
    const handleClick = (url,index) => {
        history.push(url);
        setActiveItem(index);
        console.log(index);
    }

    return (
        <>
            <div className="sideBar">
                <ul className="sideBarList">
                    <h1 className="row">Logo</h1>
                    {
                        sideBarItems.map((item,index) => (
                            <li key={index} className="row"
                                id={index == activeItem ? "active" : "test"}
                                onClick={() => handleClick(item.route,index)}>
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