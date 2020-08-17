import supertest from 'supertest'
import application from '@application'

const client = supertest(application)

export default client
