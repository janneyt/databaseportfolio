import axios from 'axios';

axios.post(
    'http://localhost:5000/select_data',
    {columns:'idItem',table:"Items"},
    {
        headers:{
        'content-type':'application/json'
        }
    }
)