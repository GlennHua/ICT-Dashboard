import app from '../server';
import request from 'supertest';
import assert from 'assert';
import {describe, it, before, after, afterEach, beforeEach} from 'mocha';

describe('HTTP GET request for fetching a course by course title', () => {

    let testCourse = {
        CourseTitle: 'Testing Testing',
        Subject: 'Testing',
        Catalogue: '001'
    }
    let invalidCourseTitle = 'Bad request'

    before(async () => {

        await request(app)
            .post('/api/course/')
            .send(testCourse)
            .then((response) => {
                console.log(response.body)
            })
    });

    after(async () => {
        await request(app)
            .delete('/api/course/')
            .send({
                Subject: 'Testing',
                Catalogue: '001'
            })
            .then((response) => {
                console.log(response.body)
            })
    });

    it('should return 200 status if successfully get a course by title', async () => {
        await request(app)
            .get('/api/course/getCourseByTitle')
            .send({courseTitle: testCourse.CourseTitle})
            .then( res => {
                assert.equal(res.status, 200);
            })
    });

    it('should return 404 status if course title is not existing', async () => {
        await request(app)
            .get('/api/course/getCourseByTitle')
            .send({courseTitle: invalidCourseTitle})
            .then( res => {
                assert.equal(res.status, 404);
            })
    });

    it('should return 400 status if course title is not provided', async () => {
        await request(app)
            .get('/api/course/getCourseByTitle')
            .send({courseTitle: ''})
            .then( res => {
                assert.equal(res.status, 400);
            })
    });
    
});


describe('HTTP GET request for fetching a course by subject and catalogue', () => {
    
        let testCourse = {
            CourseTitle: 'Testing Testing',
            Subject: 'Testing',
            Catalogue: '001'
        }
        let invalidSubject = 'Bad request'
        let invalidCatalogue = '100000'
    
        before(async () => {
    
            await request(app)
                .post('/api/course/')
                .send(testCourse)
                .then((response) => {
                    console.log(response.body)
                })
        });
    
        after(async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001'
                })
                .then((response) => {
                    console.log(response.body)
                })
        });
    
        it('should return 200 status if successfully get a course by subject and catalogue', async () => {
            await request(app)
                .get('/api/course/getCourseBySubjectAndCatalogue')
                .send({
                    subject: testCourse.Subject,
                    catalogue: testCourse.Catalogue
                })
                .then( res => {
                    assert.equal(res.status, 200);
                })
        });

        it('should return 404 status if subject and catalogue is null', async () => {
            await request(app)
                .get('/api/course/getCourseBySubjectAndCatalogue')
                .send({
                    subject: '',
                    catalogue: ''
                })
                .then( res => {
                    assert.equal(res.status, 400);
                })
        });

        it('should return 404 status if subject and catalogue is not existing', async () => {
            await request(app)
                .get('/api/course/getCourseBySubjectAndCatalogue')
                .send({
                    subject: invalidSubject,
                    catalogue: invalidCatalogue
                })
                .then( res => {
                    assert.equal(res.status, 404);
                })
        });
        
    });


    describe('HTTP POST request for creating a new course', () => {
    
        let testCourse = {
            CourseTitle: 'Testing Testing',
            Subject: 'Testing',
            Catalogue: '001'
        }
    
        afterEach(async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001'
                })
                .then((response) => {
                    console.log(response.body)
                })
        });
    
        it('should return 200 status if successfully create a new course', async () => {
            await request(app)
                .post('/api/course/')
                .send(testCourse)
                .then( res => {
                    assert.equal(res.status, 200);
                })
        });

        it('should return 400 status if course title is not provided', async () => {
            await request(app)
                .post('/api/course/')
                .send({
                    CourseTitle: '',
                    Subject: 'Testing',
                    Catalogue: '001'
                })
                .then( res => {
                    assert.equal(res.status, 400);
                })
        });

        it('should return 400 status if subject is not provided', async () => {
            await request(app)
                .post('/api/course/')
                .send({
                    CourseTitle: 'Testing Testing',
                    Subject: '',
                    Catalogue: '001'
                })
                .then( res => {
                    assert.equal(res.status, 400);
                })
        });

        it('should return 400 status if catalogue is not provided', async () => {
            await request(app)
                .post('/api/course/')
                .send({
                    CourseTitle: 'Testing Testing',
                    Subject: 'Testing',
                    Catalogue: ''
                })
                .then( res => {
                    assert.equal(res.status, 400);
                })
        });
        
    });

    describe('HTTP DELETE request for deleting a course', () => {
    
        let testCourse = {
            CourseTitle: 'Testing Testing',
            Subject: 'Testing',
            Catalogue: '001'
        }
    
        beforeEach(async () => {
            await request(app)
                .post('/api/course/')
                .send(testCourse)
                .then((response) => {
                    console.log(response.body)
                })
        });
    
        it('should return 200 status if successfully delete a course', async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001'
                })
                .then( res => {
                    assert.equal(res.status, 200);
                })
        });

        it('should return 404 status if the combination of subject and catalogue is not existing', async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing invalid',
                    Catalogue: '00000000'
                })
                .then( res => {
                    assert.equal(res.status, 404);
                })
        });

        it('should return 400 status if subject is not provided', async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: '',
                    Catalogue: '001'
                })
                .then( res => {
                    assert.equal(res.status, 406);
                })
        });

        it('should return 400 status if catalogue is not provided', async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: ''
                })
                .then( res => {
                    assert.equal(res.status, 406);
                })
        });

    });

    describe('HTTP PUT request for updating a course', () => {
    
        let testCourse = {
            CourseTitle: 'Testing Testing',
            Subject: 'Testing',
            Catalogue: '001'
        }
    
        before(async () => {
            await request(app)
                .post('/api/course/')
                .send(testCourse)
                .then((response) => {
                    console.log(response.body)
                })
        });
    
        afterEach(async () => {
            await request(app)
                .delete('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001'
                }).then(
                    await request(app)
                    .post('/api/course/')
                    .send(testCourse)
                )
        });
    
        it('should return 200 status if successfully update a course', async () => {
            await request(app)
                .put('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001',
                    CourseTitle: 'Testing Updated 01'
                })
                .then( res => {
                    assert.equal(res.status, 200);
                }).then()
        });

        it('should return 400 status if course title is not provided/acceptable', async () => {
            await request(app)
                .put('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '001',
                    CourseTitle: ''
                })
                .then( res => {
                    assert.equal(res.status, 406);
                })
        });

        it('should return 400 status if subject is not provided/acceptable', async () => {
            await request(app)
                .put('/api/course/')
                .send({
                    Subject: '',
                    Catalogue: '001',
                    CourseTitle: 'Testing Updated'
                })
                .then( res => {
                    assert.equal(res.status, 406);
                })
        });

        it('should return 400 status if catalogue is not provided/acceptable', async () => {
            await request(app)
                .put('/api/course/')
                .send({
                    Subject: 'Testing',
                    Catalogue: '',
                    CourseTitle: 'Testing Updated'
                })
                .then( res => {
                    assert.equal(res.status, 406);
                })
        });

        it('should return 404 status if combination of subject and catalogue is not existing', async () => {
            await request(app)
                .put('/api/course/')
                .send({
                    Subject: 'Testing invalid',
                    Catalogue: '00000000000',
                    CourseTitle: 'Testing Updated'
                })
                .then( res => {
                    assert.equal(res.status, 404);
                })
        });
        
    });




