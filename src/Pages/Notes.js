import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';



function Notes() {

    const [notesData, setNotesData] = useState([{}]);


    useEffect(() => {
        return axios.get(`http://localhost:8080/allNotes`, {
            headers: {
                crossdomain: true,
            }
        }).then(res => {
            // res.data.map(
            //     (item)=>(
                   
            //     )
            // )
            console.log(res.data);
            setNotesData(res.data)
            console.log(notesData);
            return "success"
        });
    }, [])


    return (
        <div>
            {/* {notesData} */}
        </div>
    )
}

export default Notes
