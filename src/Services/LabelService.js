import axios from 'axios';

class LabelService {

    getAllLabels(){
        return axios.get("http://localhost:8080/api/v1/getAllLabels",{
            headers: {
                crossdomain: true,
            }
        }).then(res => res.data);
    }

    getNotesOfLabel(id){
        return axios.get("http://localhost:8080/api/v1/label/getNotes",{
            headers: {
                crossdomain: true,
            },params: {
                "labelId" :id,
            }
        }).then(res => res.data);
    }

    addLabel(label)
    {
        return axios.post("http://localhost:8080/api/v1/addLabel",label,{
            headers: {
                crossdomain: true,
            }
        }).then(res => res.data);
    }
  
}

export default new LabelService();


