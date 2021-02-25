# potter-api-challenge

This is a Node.js app that provides a simple CRUD REST API.

The API intention is to manage characters from the Harry Potter universe, 
allowing you to list, create, update and delete any character.

## API

The following endpoints are available:

### `GET /character`

Returns the list of characters. An empty list is returned if no character is 
registered.

```
GET /character HTTP/1.1
Host: localhost:3000
```

On success returns `200 OK` with the following content:

```json
[
    {
        "id": "603815a3de8a3b000a806ea3",
        "createdAt": "2021-02-25T21:24:51.388Z",
        "updatedAt": "2021-02-25T21:24:51.388Z",
        "name": "Harry Potter",
        "role": "Student",
        "school": "Hogwarts",
        "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
        "patronus": "Stag"
    },
    {
        "id": "6038122cd7c2bf000845127f",
        "createdAt": "2021-02-25T21:10:04.514Z",
        "updatedAt": "2021-02-25T21:10:04.514Z",
        "name": "Hermione Granger",
        "role": "Student",
        "school": "Hogwarts",
        "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
        "patronus": "Otter"
    },
    {
        "id": "6038122cd7c2bf000845127f",
        "createdAt": "2021-02-25T21:10:04.514Z",
        "updatedAt": "2021-02-25T21:10:04.514Z",
        "name": "Ron Weasley",
        "role": "Student",
        "school": "Hogwarts",
        "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
        "patronus": "Jack Russell Terrier"
    }
]
```

### `GET /character/:id`

Retuns a character by its ID.

```
GET /character/603815a3de8a3b000a806ea3 HTTP/1.1
Host: localhost:3000
```

On success returns `200 OK` with the following content:

```json
{
    "id": "603815a3de8a3b000a806ea3",
    "createdAt": "2021-02-25T21:24:51.388Z",
    "updatedAt": "2021-02-25T21:24:51.388Z",
    "name": "Harry Potter",
    "role": "Student",
    "school": "Hogwarts",
    "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
    "patronus": "Stag"
}
```

If the ID is invalid, a `404 Not Found` error is returned.

### `POST /character`

Creates a new character and returns it.

Only `name` and `house` are required. All fields are of type `string`.

```
POST /character HTTP/1.1
Host: localhost:3000

{
    "name": "Harry Potter",
    "role": "Student",
    "school": "Hogwarts",
    "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
    "patronus": "Stag"
}
```

On success returns `200 OK` with the following content:

```json
{
    "id": "603815a3de8a3b000a806ea3",
    "createdAt": "2021-02-25T21:24:51.388Z",
    "updatedAt": "2021-02-25T21:24:51.388Z",
    "name": "Harry Potter",
    "role": "Student",
    "school": "Hogwarts",
    "house": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
    "patronus": "Stag"
}
```

If some field is invalid, a `422 Unprocessable Entity` error is returned.

### `PUT /character/:id`

Updates a character by its ID.

```
PUT /character/603815a3de8a3b000a806ea3 HTTP/1.1
Host: localhost:3000

{
    "name": "Harry P.",
}
```

On success returns `204 No Content`.

If the ID is invalid, a `404 Not Found` error is returned.

If some field is invalid, a `422 Unprocessable Entity` error is returned.

### `DELETE /character/:id`

Deletes a character by its ID. If the ID is invalid, a `404 Not Found` error is 
returned.

```
DELETE /character/603815a3de8a3b000a806ea3 HTTP/1.1
Host: localhost:3000
```

On success returns `204 No Content`.

If the ID is invalid, a `404 Not Found` error is returned.

### `GET /house`

Returns the list of available houses. An empty list is returned if no 
house is registered.

```
GET /house HTTP/1.1
Host: localhost:3000
```

On success returns `200 OK` with the following content:

```json
[
    {
        "id": "6037d572c3ec796df8d30b3a",
        "createdAt": "2021-02-25T16:50:58.369Z",
        "updatedAt": "2021-02-25T16:50:58.369Z",
        "uid": "df01bd60-e3ed-478c-b760-cdbd9afe51fc",
        "name": "Slytherin",
        "mascot": "serpent",
        "houseGhost": "The Bloody Baron",
        "values": [
            "ambition",
            "cunning",
            "leadership",
            "resourcefulness"
        ],
        "school": null,
        "headOfHouse": "Severus Snape",
        "founder": "Salazar Slytherin",
        "colors": [
            "green",
            "silver"
        ]
    },
    {
        "id": "6037d572c3ec796df8d30b39",
        "createdAt": "2021-02-25T16:50:58.365Z",
        "updatedAt": "2021-02-25T16:50:58.365Z",
        "uid": "56cabe3a-9bce-4b83-ba63-dcd156e9be45",
        "name": "Ravenclaw",
        "mascot": "eagle",
        "houseGhost": "The Grey Lady",
        "values": [
            "intelligence",
            "creativity",
            "learning",
            "wit"
        ],
        "school": "Hogwarts School of Witchcraft and Wizardry",
        "headOfHouse": "Fillius Flitwick",
        "founder": "Rowena Ravenclaw",
        "colors": [
            "blue",
            " bronze"
        ]
    },
    {
        "id": "6037d572c3ec796df8d30b38",
        "createdAt": "2021-02-25T16:50:58.360Z",
        "updatedAt": "2021-02-25T16:50:58.360Z",
        "uid": "542b28e2-9904-4008-b038-034ab312ad7e",
        "name": "Hufflepuff",
        "mascot": "badger",
        "houseGhost": "The Fat Friar",
        "values": [
            "hard work",
            "patience",
            "justice",
            "loyalty"
        ],
        "school": "Hogwarts School of Witchcraft and Wizardry",
        "headOfHouse": "Pomona Sprout",
        "founder": "Helga Hufflepuff",
        "colors": [
            "yellow",
            "black"
        ]
    },
    {
        "id": "6037d572c3ec796df8d30b37",
        "createdAt": "2021-02-25T16:50:58.334Z",
        "updatedAt": "2021-02-25T16:50:58.334Z",
        "uid": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
        "name": "Gryffindor",
        "mascot": "lion",
        "houseGhost": "Nearly Headless Nick",
        "values": [
            "courage",
            "bravery",
            "nerve",
            "chivalry"
        ],
        "school": "Hogwarts School of Witchcraft and Wizardry",
        "headOfHouse": "Minerva McGonagall",
        "founder": "Goderic Gryffindor",
        "colors": [
            "scarlet",
            "gold"
        ]
    }
]
```

### `GET /house/:uid`

Retuns a house by its UID.

```
GET /house/1760529f-6d51-4cb1-bcb1-25087fce5bde HTTP/1.1
Host: localhost:3000
```

On success returns `200 OK` with the following content:

```json
{
    "id": "6037d572c3ec796df8d30b37",
    "createdAt": "2021-02-25T16:50:58.334Z",
    "updatedAt": "2021-02-25T16:50:58.334Z",
    "uid": "1760529f-6d51-4cb1-bcb1-25087fce5bde",
    "name": "Gryffindor",
    "mascot": "lion",
    "houseGhost": "Nearly Headless Nick",
    "values": [
        "courage",
        "bravery",
        "nerve",
        "chivalry"
    ],
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "headOfHouse": "Minerva McGonagall",
    "founder": "Goderic Gryffindor",
    "colors": [
        "scarlet",
        "gold"
    ]
}
```

If the ID is invalid, a `404 Not Found` error is returned.

## Stack

The app takes advantage of various cutting-edge technologias to provide a simple 
yet scalable API, which includes:

- Express.js
- MongoDB
- AOP
- Docker

## Config

The configuration is done via a `.env` file. Just copy `.env.sample` to `.env`
and you're good to go.

By default the app runs on port 3000, but it can be changed in `.env`. Just 
remember to also update the npm scripts so the Docker commands work properly.

You also need to set the `API_KEY` field in the `.env` file. To get that value,
run the `npm run init` script bellow.

## Install dependencies

```
npm install
```

## Import the houses data

```
npm run init -- --name <Your Name> --email <your@email.com> --password <5tr0ngP@55w0Rd>
```

The command will emit a line with `Your API key: ...`. Copy that value and put 
it on `API_KEY` field of `.env`. Without that, everytime you run this script, it
will create a new account on the remote API.

## Start the application

The app will start and run on foreground.

```
npm run start
```

---

And that's it! Now you have a fully working REST API.

But if you want to go further, you can dokerize the API with the following 
commands.

## Build the image

The image will be tagged as `potter-api-challenge:latest`.

```
npm run docker-build
```

## Start the container

The container will be run as `potter-api-challenge` in the background.

```
npm run docker-run
```

## Stop the container

The container will be stoped and removed.

```
npm run docker-stop
```

## See container logs

The logs will be streamed as with `tail -f`.

```
npm run docker-logs
```

## Enter the container

If you wanna check how things are going on :)

```
npm run docker-exec
```

---

## Things to improve

- Add authentication
- Add tests
- Improve some validations