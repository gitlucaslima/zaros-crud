import {SwaggerOptions} from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ZAROS-API-CRUD',
            version: '1.0.0',
            description: 'Documentação da API de CRUD de usuários',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID do usuário',
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome do usuário',
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                        },
                        idade: {
                            type: 'integer',
                            description: 'Idade do usuário',
                        },
                        ativo: {
                            type: 'boolean',
                            description: 'Status do usuário',
                        }
                    },
                    required: ['nome', 'email', 'idade', 'ativo'],
                },
            },
        },
    },
    apis: ['./src/routes/*.ts']
};

export default swaggerOptions;