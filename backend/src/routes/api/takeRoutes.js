import express from 'express';
import { createNewTake,
    getTakesByStudentId,
    deleteAllTakesByStudentId,
    deleteTakeById,
    updateTake,
    getTakesByCourseAndTerm,
    getTakesByCourse,
    getTakesByTerm,
    getAllTakes,
    getDomesticAndInternationalStudentsByYearAndTerm,
    getAverageGPAbyCourse,
    getResStatusbyCourse,
    getDomesticAndInternationalStudentsByYearAndTermAndCourse,
    getTakesByAcadYear,
    getTakesByAcadYearAndSemester,
    getSubjectList,
    getCourseList,
    getSemesterList,
    getPassedFailedBySubject,
    getPassedFailedBySubjectAndCourse,
    getPassedFailedBySubjectAndCourseAndSemester,
    getTop5CourseBySemester,
    getAverageGPAByTechnicalAndProfessionalSkill,
    getTakesByCourseAndAcadYear,
    getTakesByCourseAcadYearAndSemester,
    getResStatus,
    getAllPassedFailed,
    getAllPassedFailedByAcadYear,
    getAllPassedFailedByAcadYearAndSemester,
    deleteATake
} from '../../controllers/takeController';


// all notation is the API of frontend

const router = express.Router();

router.route('/studentRatio').post(getDomesticAndInternationalStudentsByYearAndTerm)

router.route('/studentRatioForCourse').post(getDomesticAndInternationalStudentsByYearAndTermAndCourse)

router.route('/subjectList').get(getSubjectList)

router.route('/resStatus').get(getResStatus)

router.route('/averageGPAByTechnicalAndProfessionalSkill').get(getAverageGPAByTechnicalAndProfessionalSkill)

router.route('/top5CourseBySemester/:semester').get(getTop5CourseBySemester)

router.route('/passedFailed/:subject/:course/:semester').get(getPassedFailedBySubjectAndCourseAndSemester)

router.route('/passedFailed/:subject/:course').get(getPassedFailedBySubjectAndCourse)

router.route('/passedFailed/:subject').get(getPassedFailedBySubject)

router.route('/courseList/:subject').get(getCourseList)

router.route('/semesterList/:subject/:course').get(getSemesterList)

router.route('/deleteATake').post(deleteATake)

router.route('/:id').get(getTakesByStudentId);

router.route('/').get(getAllTakes)

router.route('/averageGPAbyCourse/:courseName').get(getAverageGPAbyCourse)

router.route('/resStatusbyCourse/:courseName').get(getResStatusbyCourse)

router.post('/getAllPassedFailed',getAllPassedFailed)

router.post('/getAllPassedFailedByAcadYear',getAllPassedFailedByAcadYear)

router.post('/getAllPassedFailedByAcadYearAndSemester',getAllPassedFailedByAcadYearAndSemester)

// post request : api/take/createNewTake, format of body is same as Take schema in json
router.post('/createNewTake',createNewTake);

// delete request: /api/take/deleteAll/159448  
router.delete('/deleteAll/:id',deleteAllTakesByStudentId);

// delete request: /api/take/delete/(64268cc691b7976e858dadc4)  ()cantains take's _id in String format
router.delete('/delete/:id',deleteTakeById);

// body contains one take object in json
router.put('/',updateTake);

// 
router.post('/getTakesByCourse',getTakesByCourse);

router.post('/getTakesByAcadYear',getTakesByAcadYear);

router.post('/getTakesByAcadYearAndSemester',getTakesByAcadYearAndSemester);
//
router.post('/getTakesByTerm',getTakesByTerm);

router.post('/getTakesByCourseAndAcadYear',getTakesByCourseAndAcadYear);

router.post('/getTakesByCourseAcadYearAndSemester',getTakesByCourseAcadYearAndSemester)
// body contains Term and Subject of the Take schema, return an array of studentId who takes this course in this term
router.post('/getTakesByCourseAndTerm',getTakesByCourseAndTerm);

export default router;