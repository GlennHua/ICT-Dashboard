//create REST API route for student cotroller


import express from 'express'
import {
  getStudent,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentTakeCourse,
  getToalStudent,
  getToalStudentByYear,
  getToalStudentByCourseName,
  getStudentByName,
  getToalStudentBySemester,
  getToalStudentByCourseNameForCurrentSemester,
  getStudentByIdNew,
  importCSV,
  checkSingleStuInternshipEligibility,
  conditionalCheckStudentsInternshipEligibility
} from '../../controllers/studentController'
const router = express.Router()

router.route('/').get(getStudent).post(createStudent)
router.route('/allStuInternshipStatus').get(conditionalCheckStudentsInternshipEligibility)
router.route('/totalstu').get(getToalStudent);
router.post('/getStudentByName',getStudentByName);
router.route('/stuBySemester').get(getToalStudentBySemester)
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/:id/takeCourse', getStudentTakeCourse);
router.route('/totalstu/:year').get(getToalStudentByYear)

router.route('/importCSV').post(importCSV)

router.route('/stuByCourse/:courseName').get(getToalStudentByCourseName)
router.route('/stuByCourseAndYear').post(getToalStudentByCourseNameForCurrentSemester)
router.route('/stuDetails/:id').get(getStudentByIdNew)
router.route('/stuInternshipEligibility/:id').get(checkSingleStuInternshipEligibility)


router
  .route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent)

router.get('/:id/takeCourse', getStudentTakeCourse)

export default router
