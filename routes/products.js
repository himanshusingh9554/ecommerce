import express from 'express';
import { createProduct, getAllProducts } from '../controllers/productController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * {
 * "/api/products": {
 * "get": {
 * "tags": ["Products"],
 * "summary": "Retrieve all products",
 * "responses": { "200": { "description": "A list of products" } }
 * },
 * "post": {
 * "tags": ["Products"],
 * "summary": "Create a new product (Admin only)",
 * "security": [{ "bearerAuth": [] }],
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "name": {"type": "string"},
 * "price": {"type": "number"},
 * "category": {"type": "string"},
 * "available": {"type": "boolean"},
 * "stock_quantity": {"type": "integer"}
 * }
 * }
 * }
 * }
 * },
 * "responses": { "201": { "description": "Product created" } }
 * }
 * }
 * }
 */
router.get('/', getAllProducts);
router.post('/', [verifyToken, isAdmin], createProduct);

export default router;