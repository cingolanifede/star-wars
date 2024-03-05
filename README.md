# Specifications:

You have 7 days to complete the challenge, we are going to evaluate your implementation more than how far you go. On the last day send an email with a link to the repository.

# Entities and Attributes:

- Planet: Attributes: Name, Population, Climate, Terrain, Coordinates (latitude and longitude)
- Character: Attributes: Name, Species, Sensitivity to the Force, Current Location (Reference to Planet)
- Starship: Attributes: Name, Model, Cargo Capacity, Current Location (coordinates), Passengers (Reference to Characters), Enemies (Reference to other Starships)

# API Endpoints:

- Standard CRUD operations for Planet, Character, and Starship.
- Functionality to relocate a character from one planet to another.
- Boarding or disembarking a character from a starship.
- Traveling capability for a starship from its current location to a destination planet.
- Calculate the distance of a starship from a specified planet using a GPS-like algorithm.
- Recognize nearby enemy starships within a set range.
- Spawn random enemy starships in the universe.

# NestJS Star Wars API

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

- Crafted for Docker environments (Dockerfile support and environment variables + docker-compose)
- GraphQL API with [Mongoose](https://mongoosejs.com/) and [Redis](https://redis.io/) support
- Gaaph playground, [Joi](https://github.com/hapijs/joi) validation, NestJS logger, ...
- Folder structure, code samples and best practices, CLEAN code

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM
- A database such as Mongodb and Redis. You may use the provided `docker-compose.yml` file.

[Docker](https://www.docker.com/) may also be useful for advanced testing and image building, although it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation or click on ["Use this template"](https://github.com/new?template_name=nestjs-template&template_owner=Saluki) in Github.

```sh
git clone https://github.com/cingolanifede/star-wars.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./star-wars
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing the environment variables used for development.

```
cp .env.example .env
vi .env
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server
npm run start:dev
```

You can now head to `http://localhost:3000/graphql` and see Apollo Sandbox.

> There is no restricted routes. In case needed, a graphql middleware could be use ti validate a JWT
> token. Also use of NestJS guards.

### 1.4 Docker run

You can use docker to launch the NestJS application using the command below.

```sh
# In project folder.
docker-compose up -d
```
> This will dowload images if needed an run 3 containers (api, mongodb and redis) locally. You can now head to `http://localhost:3001/graphql` and see Apollo Sandbox.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├──── app.module.ts
│   ├── core/  # The core module contains abstractas classes, database config, enums and genal code and providers used in the whole application
├── modules
│   └── planet/  # A module example that manages "planet" resources
│      ├── entities/
│      │   └── planet.entity.ts
│      ├── interfaces/
│      │   └── planet.interface.ts # All interface definitions
│      ├── infrastucture/  # All graphql definitions & proveiders used in the module
│      │   └── graphql/
|      |       └── dtos
|      |       └── resolvers
|      |           └── planet.resolver.ts
│      ├── planet.module.ts
│      ├── service/
│      │   └── planet.service.ts
│      └── planet.repository.ts    #abstract class that extends GenericRepository
│      └── planet.factory.ts    # Create data as input (create or update)
│      └── spec/
└── schema.gql    # Auto generated schema
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start:dev

# Transpile the TypeScript files
npm run build

# Run the project' seeder
npm run seed

# Run the project' functional tests (WIP)
npm run test

# Lint the project files using TSLint
npm run lint
```

## 5. Healtcheck support

A healthcheck API is a REST endpoint that can be used to validate the status of the service along with its dependencies. The healthcheck API endpoint internally triggers an overall health check of the service. This can include database connection checks, system properties, disk availability and memory availability.

The example healthcheck endpoint can be request with the token located in the `HEALTH_TOKEN` environment variable.

```sh
curl http://localhost:3000/app/version
```

## 6. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for GraphQL API projects that are built with NestJS.

### 6.1 Working functionalities

- Standard CRUD operations for Planet, Character, and Starship.
- Add & remove characters from starships
- A GPS-like algorithm to calculate distance between ships in km (it uses The Haversine formula to calculate distances between two points on the surface of a sphere using the latitude and longitude of the two points)

```sh
        mutation CalculateDistance($input: DistanceInput!) {
          calculateDistance(input: $input) {
            distance
          }
        }
```
- Recognize a nearby enemy starships within a set range, it uses the algorithm above. 
> Disclaimer: All existing ships are queried and the calculates the distances between the actual ship and the range. The starship model could be updated and add a region to minimize the quantity of data from the query.

```sh
    mutation CheckForEnemies($input: EnemiesCheckInput!) {
      checkForEnemies(input: $input) {
        id
        name
      }
    }
    
    {
      "input": {
        "whoami": "65e5dca860ab26e539f9ce64", # spachip id
        "range": 30    #range in kilometers
      }
    }

```
- To relocate a character from one planet to another.
WE can use the update endpoint to just update the location (planet reference). This way:

```sh
    mutation UpdateCharacter($input: CharacterUpdateInput!) {
      updateCharacter(input: $input) {
        id
        name
        location {
          id
          name
        }
      }
    }
    
    {
      "input": {
        "id": "65e509da021cd97e34880682",         #character id
        "location": "65e4e9963c3f22bb7e144713"    #planet id
      }
    }

### 6.2 Pending functionalities

- Unit testing (WIP)


## 7. Contributing

Feel free to suggest an improvement, report a bug, or ask something: [https://github.com/cingolanifede/star-wars](https://github.com/cingolanifede/star-wars)
