import app from "../server";
import supertest from 'supertest';
import chai from 'chai';
import Take from '../db/schema_take_course';

const request = supertest(app);
let dummyTake1 = 
{
    "Term": 1163,
    "AcademicYear": 2016,
    "Campus": "City",
    "Semester": "S1",
    "Grade": "B+",
    "GpaPoint": 6,
    "Subject": "COMPSCI",
    "Catalogue": 321,
    "StudentId": 123456,
    "__v": 0
  }
let dummyTake2 = 
{
    "Term": 1163,
    "AcademicYear": 2016,
    "Campus": "City",
    "Semester": "S1",
    "Grade": "B+",
    "GpaPoint": 6,
    "Subject": "COMPSCI",
    "Catalogue": 123,
    "StudentId": 654321,
    "__v": 0
}
let dummyTake3 = {
    "Term": 1163,
    "AcademicYear": 2018,
    "Campus": "City",
    "Semester": "S1",
    "Grade": "B+",
    "GpaPoint": 6,
    "Subject": "COMPSCI",
    "Catalogue": 302,
    "StudentId": 123654,
    "__v": 0
}
    before(async ()=>{
       
       const newTake1 = new Take(dummyTake2);
        await newTake1.save();
       const newTake2 = new Take(dummyTake3);
        await newTake2.save(); 
        dummyTake2 =await Take.findOne({StudentId:654321})
        dummyTake3 = await Take.findOne({StudentId:123654})
    
    })

    after(async()=>{
        await Take.deleteMany({StudentId:123456});
        await Take.deleteMany({StudentId:654321});
        await Take.deleteMany({StudentId:123654});
    })

    describe('GET /api/take/:id',()=>{
        it('get a take by studentID',(done)=>{
            request.get('/api/take/123654')
                    .expect(200)
                    .end((err,res)=>{
                        const takes = res.body;
                        chai.expect(takes).to.have.lengthOf(1);
                        takes.forEach((e)=>{
                        
                            chai.expect(e.StudentId).to.equal(123654);
                        })
                    })
                    done();
        })
    })

    describe('POST /api/take/createNewTake',()=>{
        it('create a new take',(done)=>{
            
            request.post('/api/take/createNewTake')
                .send(dummyTake1)
                .expect(200)
                .end((err,res)=>{
                    if(err) return done(err);
                    const newTake = res.body;
                    chai.expect(newTake).to.be.an('object')
                    chai.expect(newTake.StudentId).to.equal(123456)
                     done();
                })
               
        })
    })

    describe("PUT /api/take/update",()=>{
        it('update one take and body contains _id and other info',(done)=>{
            const updateTake = {
                "_id": dummyTake3._id.toString(),
                "Term": 1163,
                "AcademicYear": 2016,
                "Campus": "City",
                "Semester": "S1",
                "Grade": "B+",
                "GpaPoint": 6,
                "Subject": "COMPSCI",
                "Catalogue": 702,
                "StudentId": 654321,
            }
            request.put('/api/take/update')
                   .send(updateTake)
                   .expect(200)
                   .end((err,res)=>{
                    if(err) return done(err);
                    chai.expect(res.body).to.be.an('object');
                    chai.expect(res.body._id).to.equal(dummyTake3._id.toString())
                    done();
                   })
        })
    })

    describe('DELETE /api/take/delete/:id',()=>{
      it('delete a take by take _id',(done)=>{
        const _id = dummyTake2._id.toString()
       
        request.delete(`/api/take/delete/${_id}`)
               .expect(200)
               .end((err,res)=>{
                if(err) return done(err);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body._id).to.equal(_id);
               })
            done();
      })
    })

    describe("DELETEALL /api/take/deleteAll/:id",()=>{
        it('delete one student takes by studentId',(done)=>{
            const StudentId = dummyTake1.StudentId;
            request.delete(`/api/take/deleteAll/${StudentId}`)
                   .expect(200)
                   .end((err,res)=>{
                    if(err) return done(err);
                    chai.expect(res.text).to.equal('All takes were successfully deleted!')
                   })
                   done();
        })
    })

    describe('POST /api/take/getTakesByCourse',()=>{
        it('get takes by course subjece and catalogue',(done)=>{
            
            request.post('/api/take/getTakesByCourse')
                   .send({"Subject": "COMPSCI",
                          "Catalogue": 732})
                   .expect(200)
                   .end((err,res)=>{
                    if(err) return done(err);
                    const takes = res.body;
                    takes.forEach(e=>{
                        chai.expect(e.Catalogue).to.equal(732);
                        chai.expect(e.Subject).to.equal("COMPSCI");
                    })
                    done();
                   })
        })
    })

    describe('POST /api/take/getTakesByCourseAndTerm',()=>{
        it('get takes by course and Term',(done)=>{
            request.post('/api/take/getTakesByCourseAndTerm')
                   .send({
                    "Subject": "COMPSCI",
                    "Catalogue": 732,
                    "Term":1163
                   })
                   .expect(200)
                   .end((err,res)=>{
                    if(err) return done(err);
                    const takes = res.body;
                    chai.expect(takes).to.have.lengthOf(2);
                    takes.forEach(e=>{
                        chai.expect(e.Term).to.equal(1163);
                        chai.expect(e.Catalogue).to.equal(732);
                        chai.expect(e.Subject).to.equal('COMPSCI');
                    })
                   })
                   done();
        })
    })

    describe('Fail to create new take',()=>{
        it('if this take is existed',(done)=>{
            request.post('/api/take/createNewTake')
                   .send(dummyTake3)
                   .expect(400)
            done();
        })
    })
   
    describe('Fail to get takes by studentId',()=>{
        it('the studentId do not cover any takes',(done)=>{
            request.get('/api/take/121111')
                   .expect(404)
                   .end((err,res)=>{
                    if(err) return done(err);
                    chai.expect(res.text).to.equal('This student does not take courses')
                    done();
                })        
        })
    })

    describe('Fail to delete a take',()=>{
        it('the id of take is wrong',(done)=>{
            request.delete(`/api/take/delete/1231231231`)
                   .expect(400)
                   done();
        })
    })

    describe('Fail to update a take',()=>{
        it('wrong take _id',(done)=>{
            request.put('/api/take/update')
                   .expect(406)
                   .end((err,res)=>{
                    if(err) return done(err);
                    chai.expect(res.text).to.equal('Failed to find this take')
                    done();
                })
        })
    })