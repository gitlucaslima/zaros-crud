import User from "../models/user";
import {UserDTO} from "../controllers/Interfaces/getUserInterface";


export const mapUserToDTO = (user: User): UserDTO => ({
    id: user.id,
    nome: user.nome,
    email: user.email,
    idade: user.idade,
    ativo: user.ativo,
});
