
# Imagine - Simple Store App

A simple art shop. Created using Javascript and a relational database

## Technologies
Frontend layer:
- Vue.js 3
- Pinia (state management)
- Axios
- Tailwind CSS
- Formkit

Backend layer:
- Nest.js
- Postgres database
- JWT (JSON Web Tokens)
- TypeOrm as ORM


## Run Locally

Clone the project

```bash
  git clone https://github.com/AdrianTech/imagine.git
```

Go to the project directory

Frontend:

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm run serve
```
Backend:

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  npm run start:dev
```

## Installation

After running the server, migration will be making immediately. Next step is to create a new user account (with 'Admin' role) in your postgres database. Notice, password should be hashed
by Bcrypt [bcrypt-generator](https://bcrypt-generator.com). After this step you should be able to log in via /login route.

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in /server directory

`DB_TYPE`
`DB_PORT`
`DB_HOST`
`DB_USER`
`DB_PASS`
`DB_NAME`
`JWT_SECRET`
`ORIGIN`

## License

[MIT](https://choosealicense.com/licenses/mit/)