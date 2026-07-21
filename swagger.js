const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Lock Dep API',
    description: 'Backend API Documentation for Frontend Team',
  },
  host: 'localhost:3000', 
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);