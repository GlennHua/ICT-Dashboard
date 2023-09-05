import Course from '../db/schema_course'

export const getCourseByCourseTitle = async (req, res) =>{
    
    const courseTitle = req.body.courseTitle

    if(courseTitle){
        try {

            const course = await Course.findOne({
                CourseTitle: courseTitle
            }).select('-_id')

            if(course){
                res.status(200).json(course)
            } else{
                res.status(404).send('Failed to find this course')
            }
            
        } catch (error) {
            res.status(400).send(`Error: ${error}`)
        }

    } else{
        res.status(400).send('Invalid input of course title')
    }
}


export const getCourseBySubjectAndCatalogue = async (req, res) =>{
    
    const subject = req.body.subject
    const catalogue = req.body.catalogue
    // console.log(subject=="COMPSCI")
    // console.log(catalogue=="732")

    console.log(subject)
    console.log(catalogue)
    
    if(subject && catalogue){
        try {
            const course = await Course.findOne({
                Subject: subject,
                Catalogue: catalogue
            }).select('-_id')

            console.log(course)

            if(course){
                res.status(200).json({
                    Subject: course.Subject,
                    Catalogue: course.Catalogue,
                    CourseTitle: course.CourseTitle,
                    Description: 'Mock description: This course is designed to meet the demand for industry-ready ICT professionals who possess the right mix of technological skills, critical thinking and business awareness to drive innovation in New Zealand.'
                })
            } else{
                res.status(404).send('Failed to find this course')
            }
            
        } catch (error) {
            res.status(400).send(`Error: ${error}`)
        }

    } else{
        res.status(400).send('Invalid input of course catalogue or subject')
    }
}


export const createNewCourse = async (req, res) =>{

    if(req.body.Subject && req.body.CourseTitle && req.body.Catalogue){
        try {
            if(await Course.findOne({CourseTitle: req.body.CourseTitle, 
                Subject: req.body.Subject, 
                Catalogue: req.body.Catalogue})){
                    res.status(406).send('This course already exist')
            } else{
                const newCourse = await Course.create(req.body)
                res.status(200).send(newCourse)
            }
            
        } catch (error) {
            res.status(400).send('Invalid input of course catalogue or subject')
        }
    } else{
        res.status(400).send('Invalid input')
    }
}


export const updateCourseTitle = async (req, res) =>{
    
    const Subject = req.body.Subject
    const Catalogue = req.body.Catalogue
    const newCourseTitle = req.body.CourseTitle

    console.log(req.body)

    if(Subject && Catalogue && newCourseTitle){
        try {
            const course = await Course.findOne({
                Subject,
                Catalogue
            })

            if(course){
                course.CourseTitle = newCourseTitle
                course.save()
                res.status(200).send(`Course ${course.Subject + course.Subject} has been updated`)
            } else{
                res.status(404).send('Failed to find this course')
            }
            
        } catch (error) {
            res.status(400).send(`Error: ${error}`)
        }

    } else{
        res.status(406).send('Invalid input of course catalogue or subject')
    }
}


export const deleteCourseBySubjectAndCatalogue = async (req, res) =>{
    
    const subject = req.body.Subject
    const catalogue = req.body.Catalogue

    if(subject && catalogue){
        try {
            const course = await Course.findOne({
                Subject: subject,
                Catalogue: catalogue
            })

            if(course){
                course.remove()
                res.status(200).send(`Course ${course.CourseTitle} has been removed`)
            } else{
                res.status(404).send('Failed to find this course')
            }
            
        } catch (error) {
            res.status(400).send(`Error: ${error}`)
        }

    } else{
        res.status(406).send('Invalid input of course catalogue or subject')
    }
}


export const getCoursesCount = async (req, res) =>{
    try {
        const coursesCount = await Course.count()
        res.status(200).send({
            coursesCount
        })
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
}

export const getAllCourses = async (req, res) =>{
    try {
        const courses = await Course.find().select('-_id')
        res.status(200).send(courses)
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
}




