import request from 'supertest';
import { expect } from 'chai';
import app from "../server";
import Student from '../db/schema_studentInfo.js';
import Take from '../db/schema_take_course.js';

describe('Student API', () => {
    const take1 = {
        Term: 1163,
        AcademicYear: 2016,
        Campus: "City",
        Semester: "S1",
        Grade: "B+",
        GpaPoint: 6,
        Subject: "COMPSCI",
        Catalogue: 732,
        StudentId: 999,
    }
    const take2 = {
        Term: 1163,
        AcademicYear: 2016,
        Campus: "City",
        Semester: "S1",
        Grade: "A+",
        GpaPoint: 6,
        Subject: "INFOSYS",
        Catalogue: 700,
        StudentId: 999,
    }
    
    
    before(async () => {
        const newTake = new Take(take1);
        await newTake.save();
        const newTake2 = new Take(take2);
        await newTake2.save();
    })
    after(async () => {
        await Student.deleteOne({StudentId: 999});
        await Take.deleteMany({StudentId: 999});
    })

    describe('GET /api/student', () => {
        it('should get all students', (done) => {
            request(app)
                .get('/api/student')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.equal(275);
                    done();
                })
            
        })
    })
    describe('POST /api/student', () => {
        it('should create a student', (done) => {
            const newStudent = {
                StudentId: 999,
                Name: {
                    FirstName: 'testJohn',
                    LastName: 'testDoe'
                },
                StudentEmail: 'test123@gmial.com',
                AcadPlan: 'INFT-MIT',
                ResStatus: 'Citizen',
                Gender:'M'
            }
            request(app)
                .post('/api/student')
                .send(newStudent)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.StudentId).to.be.equal(999);
                    done();
                })
        })
    })
    describe('GET /api/student/:id', () => {
        it('should get student by id', (done) => {
            request(app)
                .get('/api/student/999')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.StudentId).to.be.equal(999);
                    done();
                })
        })
    })
    describe('PUT /api/student/:id', () => {
        it('should update a student', (done) => {
            const updateStudent = {
                StudentId: 999,
                Name: {
                    FirstName: 'John',
                    LastName: 'Doe'
                },
                StudentEmail: 'test999@gmail.com',
                AcadPlan: 'INFT-MIT',
                ResStatus: 'Citizen',
                Gender:'M'
            }
            request(app)
                .put('/api/student/999')
                .send(updateStudent)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.StudentEmail).to.be.equal('test999@gmail.com');
                    done();
                })
        })
    })
    describe('GET /api/student/:id/takeCourse', () => {
        it('should get all courses taken by student', (done) => {
            request(app)
                .get('/api/student/999/takeCourse')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.equal(2);
                    done();
                })
        })
    })
    describe('DELETE /api/student/:id', () => {
        it('should delete a student', (done) => {
            request(app)
                .delete('/api/student/999')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.be.equal('Student deleted successfully.');
                    done();
                })
        })
    })
})
