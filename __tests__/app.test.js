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
describe.only('GET /api/articles/:article_id', () => {
  describe('Basic request checks', () => {
    test('returns status 200 on successful request', () => {
      return request(app).get('/api/articles/1').expect(200);
    });
    test('response contains an object of 1 article with correct properties', () => {
      return request(app)
      .get('/api/articles/1')
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: 100,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
        })
      });
    });
  });
  describe('errors', () => {
        test('should respond with 404 when article is not found', () => {
          return request(app)
            .get('/api/articles/99999999')
            .expect(404)
            .then(({ body }) => {
              expect(body).toEqual({ msg: 'Article not found' });
            });
        });
        test('should respond with 400 when invalid endpoint is used', () => {
          return request(app)
          .get('/api/articles/not_an_id')
          .expect(400)
          .then(({ body }) => {
          expect(body.msg).toEqual("invalid input syntax for type integer: \"not_an_id\"" || 'Bad request');
          });
        });
  })
});
// describe('GET /api/articles', () => {
//   describe('Basic request checks', () => {
//     test('returns status 200 on successful request', () => {
//       return request(app).get('/api/articles').expect(200);
//     });
//     test('response contains an array of objects of all articles with the correct properties', () => {
//       return request(app)
//       .get('/api/articles')
//       .then(({ body }) => {
//         expect(body.article).toEqual([
//           {
//             title: "Living in the shadow of a great man",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "I find this existence challenging",
//             created_at: 1594329060000,
//             votes: 100,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Sony Vaio; or, The Laptop",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
//             created_at: 1602828180000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Eight pug gifs that remind me of mitch",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "some gifs",
//             created_at: 1604394720000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Student SUES Mitch!",
//             topic: "mitch",
//             author: "rogersop",
//             body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
//             created_at: 1588731240000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "UNCOVERED: catspiracy to bring down democracy",
//             topic: "cats",
//             author: "rogersop",
//             body: "Bastet walks amongst us, and the cats are taking arms!",
//             created_at: 1596464040000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "A",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "Delicious tin of cat food",
//             created_at: 1602986400000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Z",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "I was hungry.",
//             created_at: 1578406080000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Does Mitch predate civilisation?",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
//             created_at: 1587089280000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "They're not exactly dogs, are they?",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "Well? Think about it.",
//             created_at: 1591438200000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Seven inspirational thought leaders from Manchester UK",
//             topic: "mitch",
//             author: "rogersop",
//             body: "Who are we kidding, there is only one, and it's Mitch!",
//             created_at: 1589433300000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Am I a cat?",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
//             created_at: 1579126860000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Moustache",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "Have you seen the size of that thing?",
//             created_at: 1602419040000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//           {
//             title: "Another article about Mitch",
//             topic: "mitch",
//             author: "butter_bridge",
//             body: "There will never be enough articles about Mitch!",
//             created_at: 1602419040000,
//             article_img_url:
//               "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//           },
//         ])
//       });
//     });
//   });
//   describe('errors', () => {
//         test('should respond with 404 when article is not found', () => {
//           return request(app)
//             .get('/api/articles/99999999')
//             .expect(404)
//             .then(({ body }) => {
//               expect(body).toEqual({ msg: 'Article not found' });
  
  
//             });
//         });
//   })
// });