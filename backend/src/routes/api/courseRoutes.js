import express from 'express';
import { getCourseByCourseTitle, 
    getCourseBySubjectAndCatalogue, 
    createNewCourse,
    updateCourseTitle,
    deleteCourseBySubjectAndCatalogue,
    getCoursesCount,
    getAllCourses
 } 
    from '../../controllers/courseController'

const router = express.Router()

router.route('/getCourseByTitle').get(getCourseByCourseTitle)

router.route('/getCourseBySubjectAndCatalogue').post(getCourseBySubjectAndCatalogue)

router.route('/').post(createNewCourse)
.put(updateCourseTitle)
.delete(deleteCourseBySubjectAndCatalogue)
.get(getAllCourses)

router.route('/totalcourse').get(getCoursesCount)


export default router