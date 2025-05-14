# Typescript Node REST API Template
A generic template for building scalable and maintainable REST APIs using Node.js, TypeScript, and industry best practices.

## Features

- **TypeScript**: Static type-checking for improved developer productivity and code quality.
- **Express.js**: Robust and flexible web application framework for Node.js.
- **Authentication**: JWT-based authentication.
- **Logging**: Structured logging with Morgan and request logging helper.
- **Linting and Formatting**: Consistent code style with ESLint and Prettier.
- **Error Handling**: Centralized error handling and reporting.
- **Configuration Management**: Environment-specific configuration using dotenv.
- **Security**: Best practices for secure API development (CORS).

## Getting Started

### Prerequisites

- Node.js (>= 22.x)
- npm (>= 10.x)

### Installation

- Clone the repository:

``` bash
git clone https://github.com/D-Polyon/typescript-node-rest-template.git
```
- Install dependencies:
```
cd typescript-node-rest-template
npm install
```

## Development
To start the development server, run:
```
npm run start:dev
```
This will start the server at `http://localhost:3000` with hot-reloading enabled.

## Linting and Formatting
- This project uses ESLint for linting and Prettier for code formatting. To lint the codebase, run:
```
npm run eslint
```
- To automatically fix linting issues, run:
```
npm run eslint-fix
```

## Building
- To build the production-ready bundle, run:
```
npm run build
```
- To build the development bundle, run:
```
npm run build:dev
```

## License
This project is licensed under the MIT License.

***This README provides a comprehensive overview of the project, highlighting its key features, technologies used, and best practices followed. It covers all aspects of the development lifecycle, including installation, development, building, linting, formatting, and contributing guidelines. Feel free to modify or expand it further based on your project's specific requirements.***
