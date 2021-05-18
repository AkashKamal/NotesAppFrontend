import axios from 'axios';

class NotesService {

    getAllNotes() {
        return axios.get(`http://localhost:8080/allNotes`, {
            headers: {
                crossdomain: true,
            }
        }).then(res => { return res.data })

    }

    toogleFavourite(note){
        console.log(note)
        const url = (note.favourite) ? "http://localhost:8080/api/v1/removeFavourite" : "http://localhost:8080/api/v1/addFavourite";
        return axios.post(url, null,{
            headers: {
                crossdomain: true
            },params:{
                "notesId" : note.id
            }
        }).then(res => {
            return res;
        });
    }

    saveNote(notesDetails){
        const url = (typeof notesDetails.id != 'undefined') ? `http://localhost:8080/api/v1/updateNote` : `http://localhost:8080/api/v1/addNote`
         return axios.post(url, notesDetails, {
            headers: {
                crossdomain: true
            }
        }).then(res => {
            if (res.status)
               console.log(res);
               return res;
        });
    }

    deleteNote(noteId){
        const url = "http://localhost:8080/api/v1/deleteNote"
        return axios.delete(url,{
            headers: {
                crossdomain: true
            },params:{
                "notesId" : noteId
            }}).then(res => res)
    }

}
export default new NotesService();
