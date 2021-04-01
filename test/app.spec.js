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
      })
  })
});


