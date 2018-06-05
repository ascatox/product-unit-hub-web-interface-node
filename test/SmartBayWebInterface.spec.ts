import * as supertest from 'supertest'
import app from '../src/ProductUnitWebInterface'

describe('ProductUnitWebInterface', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})
