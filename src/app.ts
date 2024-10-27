import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swaggerConfig';

const app = express();

app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', userRoutes);

sequelize.sync()
    .then(() => {
        console.log('DB Connected');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

export default app;