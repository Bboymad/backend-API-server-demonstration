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
          .then(({ body }) => {
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
    test('should respond with 404 when invalid endpoint is used', () => {
      return request(app)
      .get('/api/topicsxxx')
      .expect(404)
      .then(({ body }) => {
      expect(body.msg).toEqual("Invalid endpoint");
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
          .then(({ body }) => {
            expect(typeof body).toBe('object')
            expect(body).toEqual(endpointJSON);
          });
      });
    })
})
// describe('GET /api/articles/:article_id', () => {
//   describe('Basic request checks', () => {
//     test('returns status 200 on successful request', () => {
//       return request(app).get('/api/articles/:article_id').expect(200);
//     });
//     test('response contains an object of 1 article', () => {
//       return request(app)
//       .get('/api/topics')
//       .expect(200)
//       .then(({ body }) => {
//         expect(body.topics).toHaveLength(3);
//         expect(body.topics).toEqual(
//         expect.objectContaining([
//           {
//             description: 'The man, the Mitch, the legend',
//             slug: 'mitch'
//           },
//           {
//             description: 'Not dogs',
//             slug: 'cats'
//           },
//           {
//           description: 'what books are made of',
//           slug: 'paper'
//           }
//         ]))
//       });
//     });
//     test('response object contains the correct properties')
//   });
//   describe('errors', () => {
//         test('should respond with 404 when table doesn\'t exist due to invalid endpoint', () => {
//           return request(app)
//             .get('/api/topicsxxx')
//             .expect(404)
//             .then(({ body }) => {
//               expect(body).toEqual({});
  
  
//             });
//         });
//   })
// });