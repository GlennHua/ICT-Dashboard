import axios from 'axios'

export const updateStduentById = (id, data) => {
    return axios.put(`/api/student/${id}`,data)
}

export const updateTakeById = (data) => {
    return axios.put(`/api/take`,data)
}

export const deleteTakeById = (data) => {
    return axios.post(`/api/take/deleteATake`,data)
}