import * as supertest from 'supertest'
import app from './SmartBayWebInterface'

describe('SmartBayWebInterface', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})
