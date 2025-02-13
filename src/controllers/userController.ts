
import { Request, Response } from 'express';
import User from '../models/user';
import { buildUserFilters } from './Filters/UserFilters';
import { UserQueryParams } from './Interfaces/UserQueryParams';
import {Mapper} from "../mappers/mapper";
import {UserDTO} from "./Interfaces/getUserInterface";
import {mapUserToDTO} from "../mappers/userMapper"; // Ajuste o caminho conforme necessário


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, idade, ativo } = req.body;
        const user = await User.create({ nome, email, idade, ativo });

        const userDTO: UserDTO = Mapper.toDTO(user, mapUserToDTO);
        res.status(201).json(userDTO);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', details: (error as Error).message });

    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters = buildUserFilters(req.query as UserQueryParams);
        const users = await User.findAll({ where: filters });

        const userDTOs: UserDTO[] = Mapper.toDTOArray(users, mapUserToDTO);

        res.status(200).json(userDTOs);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', details: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const userDTO: UserDTO = Mapper.toDTO(user, mapUserToDTO);

        res.status(200).json(userDTO);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário', details: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nome, email, idade, ativo } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const userDTO: UserDTO = Mapper.toDTO(await user.update({ nome, email, idade, ativo  }), mapUserToDTO);

        res.status(200).json(userDTO);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', details: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', details: (error as Error).message });

    }
};
