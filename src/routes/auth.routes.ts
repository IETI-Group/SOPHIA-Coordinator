import { type IRouter, Router } from "express";
import { AuthController } from "../controllers/auth.service.js";

const router: IRouter = Router();
const authController = new AuthController();

/**
 * @route   POST /auth/signup
 * @desc    Registra un nuevo usuario en el sistema
 * @access  Public
 */
router.post("/signup", authController.signup);

/**
 * @route   POST /auth/login
 * @desc    Inicia sesión de un usuario en el sistema
 * @access  Public
 */
router.post("/login", authController.login);

/**
 * @route   GET /auth/callback
 * @desc    Redirige al servicio de autenticación para el callback después del login
 * @access  Public
 */
router.get("/callback", authController.callback);

/**
 * @route   GET /auth/logout
 * @desc    Redirige al servicio de autenticación para obtener la URL de logout
 * @access  Public
 */
router.get("/logout", authController.logout);

/**
 * @route   GET /auth/me
 * @desc    Redirige al servicio de autenticación para obtener la información del usuario autenticado
 * @access  Public (el servicio de autenticación validará el token)
 */
router.get("/me", authController.me);

/**
 * @route   POST /auth/verify
 * @desc    Redirige al servicio de autenticación para verificar un token JWT
 * @access  Public
 */
router.post("/verify", authController.verify);

export default router;
