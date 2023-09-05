import axios from 'axios'

export const subjectList = () => {
    return axios.get('/api/take/subjectList')
}

export const courseList = (selectSubject) => {
    return axios.get(`/api/take/courseList/${selectSubject}`)
}

export const semesterList = (selectSubject,selectCourse) => {
    return axios.get(`/api/take/semesterList/${selectSubject}/${selectCourse}`)
}

export const passedFailedBySubject = (subject) => {
    return axios.get(`/api/take/passedFailed/${subject}`)
}

export const passedFailedBySubjectAndCourse = (selectSubject,course) => {
    return axios.get(`/api/take/passedFailed/${selectSubject}/${course}`)
}

export const passedFailedBySubjectAndCourseAndSemester = (selectSubject,selectCourse,semester) => {
    return axios.get(`/api/take/passedFailed/${selectSubject}/${selectCourse}/${semester}`)
}

export const studentNumberBySemester = () => {
    return axios.get(`/api/student/stuBySemester`)
}

export const top5CoursesBySemester = (semester) => {
    return axios.get(`/api/take/top5CourseBySemester/${semester}`)
}

export const averageGPAByTechnicalAndProfessionalSkill = () => {
    return axios.get(`/api/take/averageGPAByTechnicalAndProfessionalSkill`)
}

export const resStatus = () => {
    return axios.get(`/api/take/resStatus`)
}