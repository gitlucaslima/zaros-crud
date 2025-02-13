import { Op } from 'sequelize';
import {UserQueryParams} from "../Interfaces/UserQueryParams";

export const buildUserFilters = ({ nome, idadeMin, idadeMax, email }: UserQueryParams) => {
    const filters: any = {};

    // Filtro parcial por nome
    if (nome) {
        filters.nome = { [Op.like]: `%${nome}%` };
    }

    // Filtro por faixa de idade, se definido
    const minAge = idadeMin ? parseInt(idadeMin, 10) : undefined;
    const maxAge = idadeMax ? parseInt(idadeMax, 10) : undefined;

    if (minAge !== undefined || maxAge !== undefined) {
        filters.idade = {};
        if (minAge !== undefined) filters.idade[Op.gte] = minAge;
        if (maxAge !== undefined) filters.idade[Op.lte] = maxAge;
    }

    // Filtro por email
    if (email) { // Corrigido aqui
        filters.email = { [Op.like]: `%${email}%` };
    }

    return filters;
};