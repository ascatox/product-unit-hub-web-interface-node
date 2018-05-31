import * as supertest from 'supertest'
import app from './ProductUnitWebInterface'

describe('SmartBay', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})
