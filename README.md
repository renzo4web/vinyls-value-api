
# Vinyl Pricing API


## Description

API rest to know waht is the value of a vinyl record



## Design

  - Users sign up with email/password
  - User get and estimate for how much their vinil record is worth based on
      year/artist/condition
  - User can report what they sold their vinyls
  - Admins have to approve reported sales, to avoid span or fraud


#### TODO

  ***Routes***
    ---Public Routes---

  - POST --> /auth/signup  Body(dto) --> {email,password} [Create new user]

  - POST --> /auth/signin  Body(dto) --> {email,password} [Sign in an existing
      user]

    ---Private Routes---

  - GET --> /reports  QS --> (artist?,year?,condition?,country?) [get a
      estimate for the vinyl value]

  - POST --> /reports  Body(dto) --> {artist,year,condition} [Report how much
      the vinyl was sold for]

  - PUT --> /reports/:id  Body(dto) --> {approved} [Admins approve or reject a
      submitted report]

      Resources Users && Records (vinyls values)
      
      UsersModule

      - Controller
      - Service
      - Repository


      RecordsModule

      - Controller
      - Service
      - Repository


## Installation

```bash
$ yarn 
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

