const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');
const endpointJSON = require('../endpoints.json')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
    describe('Basic request checks', () => {
      test('returns status 200 on successful request', () => {
        return request(app).get('/api/topics').expect(200);
      });
      test('response contains an array of objects for each topic, which contains the correct properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).toHaveLength(3);
            expect(body.topics).toEqual(
              expect.objectContaining([
                {
                  description: 'The man, the Mitch, the legend',
                  slug: 'mitch'
                },
                {
                  description: 'Not dogs',
                  slug: 'cats'
                },
                {
                  description: 'what books are made of',
                  slug: 'paper'
                }
              ]))
          });
      });
    });
    describe('errors', () => {
      test('should respond with 404 when table doesn\'t exist due to invalid endpoint', () => {
        return request(app)
          .get('/api/topicsxxx')
          .expect(404)
          .then(({ body }) => {
            expect(body).toEqual({});


          });
      });
    })
  });
describe('GET /api', () => {
    describe('Basic request checks', () => {
      test('returns status 200 on successful request', () => {
        return request(app).get('/api').expect(200);
      });
      test('response contains a JSON object that is an exact copy of all endpoints which contains the correct properties for each valid endpoint', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then(({ body }) => {
            expect(typeof body).toBe('object')
            expect(body).toEqual(endpointJSON);
          });
      });
      test('object contains the correct properties for each valid endpoint', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then(({ body }) => {
            for (const endpoint in body) {
              const expectedProperties = endpointJSON[endpoint];
              if (expectedProperties) {
                expect(body[endpoint]).toEqual(expect.objectContaining(expectedProperties));
              }
            }
          });
      });
    })
    describe('errors', () => {
      test('should respond with 404 when api is misspelled', () => {
        return request(app)
          .get('/apilsdfkl')
          .expect(404)
          .then(({ body }) => {
            expect(body).toEqual({});
          });
      });
    })
    })