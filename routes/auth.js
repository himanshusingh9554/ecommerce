import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * {
 * "/api/auth/register": {
 * "post": {
 * "tags": ["Auth"],
 * "summary": "Register a new user",
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "email": {"type": "string", "format": "email"},
 * "password": {"type": "string", "format": "password"},
 * "role": {"type": "string", "enum": ["customer", "admin"]}
 * }
 * }
 * }
 * }
 * },
 * "responses": { "201": { "description": "User registered" } }
 * }
 * },
 * "/api/auth/login": {
 * "post": {
 * "tags": ["Auth"],
 * "summary": "Logs in a user",
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "email": {"type": "string", "format": "email"},
 * "password": {"type": "string", "format": "password"}
 * }
 * }
 * }
 * }
 * },
 * "responses": { "200": { "description": "Login successful" } }
 * }
 * }
 * }
 */
router.post('/register', register);
router.post('/login', login);

export default router;