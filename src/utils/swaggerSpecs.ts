import swaggerJsDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce-API",
      version: "1.0.0",
      description: "A simple yet clean Ecommerce-API",
    },
    servers: [{ url: "http://localhost:5001" }],
  },
  apis: ["./src/modules/**/routes/*.ts"],
}

const specs = swaggerJsDoc(options)

export default specs
