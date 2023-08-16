import { rest } from 'msw'

export const handlers = [
  rest.get('https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": "fbe15159-c1cf-4516-b7bd-5e77ac84d166",
          "name": "The Shawshank Redemption",
          "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "rating": 9.3,
          "duration": 8520,
          "genres": [
            "drama"
          ],
          "releasedAt": "1994-10-13T22:00:00.000Z"
        },
        {
          "id": "750f14e5-0ce9-49bb-86b3-72847c09cb33",
          "name": "The Godfather",
          "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
          "rating": 9.2,
          "duration": 10500,
          "genres": [
            "crime"
          ],
          "releasedAt": "1972-03-23T22:00:00.000Z"
        },
        {
          "id": "6daba5d7-2421-48a0-bf36-8d49cbeb9c62",
          "name": "12 Angry Men",
          "description": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "rating": 8.9,
          "duration": 5760,
          "genres": [
            "drama"
          ],
          "releasedAt": "1957-04-09T22:00:00.000Z"
        }
      ])
    )
  }),
]
