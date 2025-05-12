const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Internify by HUMIC Engineering APIs",
      version: "1.0.0",
      description: "API for managing internship application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const setupSwaggerDocs = (app) => {
  const isProduction = process.env.NODE_ENV === "production";
  const swaggerEnabled = process.env.SWAGGER_ENABLED === "true" && !isProduction;

  if (swaggerEnabled) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger UI available at /api-docs");
  } else {
    console.log("Swagger UI is disabled.");
  }
};

module.exports = setupSwaggerDocs;
