export interface Movie {
    "id": string,
    "name": string,
    "description": string,
    "thumbnail": string,
    "rating": number,
    "duration": number,
    "genres": string[],
    "releasedAt": string
}

export type MovieCollection = Movie[]
