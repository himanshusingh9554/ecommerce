import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API for a simple e-commerce application',
    },
    tags: [
      { name: 'Auth', description: 'User authentication' },
      { name: 'Products', description: 'Product catalog management' },
      { name: 'Orders', description: 'Order placement' },
      { name: 'Reports', description: 'Sales reporting' },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
  },

    apis: [
    `${__dirname}/routes/auth.js`,
    `${__dirname}/routes/products.js`,
    `${__dirname}/routes/orders.js`,
  ],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

db.sequelize.sync().then(() => {
  console.log('Database synced.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});