import express from 'express';
import { createOrder, getDailyReport } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * {
 * "/api/orders": {
 * "post": {
 * "tags": ["Orders"],
 * "summary": "Place a new order",
 * "security": [{ "bearerAuth": [] }],
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "customer_name": {"type": "string"},
 * "items": {
 * "type": "array",
 * "items": {
 * "type": "object",
 * "properties": {
 * "productId": {"type": "integer"},
 * "quantity": {"type": "integer"}
 * }
 * }
 * }
 * }
 * }
 * }
 * }
 * },
 * "responses": { "201": { "description": "Order placed" } }
 * }
 * },
 * "/api/orders/reports/daily": {
 * "get": {
 * "tags": ["Reports"],
 * "summary": "Get daily sales report (Admin only)",
 * "security": [{ "bearerAuth": [] }],
 * "responses": { "200": { "description": "Daily sales data" } }
 * }
 * }
 * }
 */
router.post('/', [verifyToken], createOrder);
router.get('/reports/daily', [verifyToken, isAdmin], getDailyReport);

export default router;