import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/user';

export const validateUser: RequestHandler[] = [
    body('nome')
        .isString()
        .withMessage('Nome deve ser um texto')
        .isLength({ min: 3 })
        .withMessage('Nome deve ter pelo menos 3 caracteres'),

    body('email')
        .isEmail()
        .withMessage('Email deve ser válido')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value } });
            const userId = req.params?.id;

            if (user && (req.method !== 'PUT' || user.id !== userId)) {
                return Promise.reject('Email já está em uso');
            }
        }),

    body('idade')
        .isInt()
        .withMessage('Idade deve ser um número inteiro')
        .isInt({ min: 1 })
        .withMessage('Idade deve ser pelo menos 1'),

    body('ativo')
        .optional()
        .isBoolean()
        .withMessage('Ativo deve ser um valor booleano'),

    body('id')
        .optional()
        .isUUID()
        .withMessage('Id deve ser um UUID'),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
];