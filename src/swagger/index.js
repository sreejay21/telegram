const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const schemas = require('./schema');

module.exports = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Telegram API',
        version: '1.0.0',
        description: 'Telegram integration API with authentication and chat management',
        contact: {
          name: 'API Support'
        }
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Development server'
        }
      ],
      components: {
        schemas: schemas,
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'JWT Authorization header using the Bearer scheme'
          }
        }
      },
      security: [
        {
          BearerAuth: []
        }
      ]
    },
    apis: [
      './src/routes/**/*.js'
    ]
  };

  const specs = swaggerJsDoc(options);

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  );
};