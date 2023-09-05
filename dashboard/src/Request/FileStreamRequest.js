import axios from 'axios'

export const importCSV = (data) => {
    return axios.post('/api/student/importCSV',data)
}