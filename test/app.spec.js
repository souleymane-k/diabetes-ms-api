// const { expect } = require('chai')
// const supertest = require('supertest')
const { expect } = require('chai');
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, boilerplate!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, boilerplate!')
  })
  

})
describe('GET /months', () => {
  it('should return an array of months', () => {
    return supertest(app)
      .get('/months')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
      const month = res.body[0];
      expect(month).to.include.all.keys( 
        'monthName', 'mealName', 'result', 'date', 'description','dtype')
      })
  })
  it('should sort by monthName', () => {
   return supertest(app)
   .get('/months')
   .query({sort:'monthName'})
   .expect(200)
   .expect('Content-Type', /json/)
   .then(res => {
    expect(res.body).to.be.an('array');
    let sorted = true;

    let i = 0;
    // iterate once less than the length of the array
    // because we're comparing 2 items in the array at a time
    while (i < res.body.length - 1) {
      // compare book at `i` with next book at `i + 1`
      const monthAtI = res.body[i];
      const monthAtIPlus1 = res.body[i + 1];
      // if the next book is less than the book at i,
      if (monthAtIPlus1.monthName < monthAtI.monthName) {
        // the books were not sorted correctly
        sorted = false;
        break; // exit the loop
      }
      i++;
    }
    expect(sorted).to.be.true;
  });
  })
});


