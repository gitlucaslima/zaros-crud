export interface UserDTO {
    id: string;
    nome: string;
    email: string;
    idade: number | undefined;
    ativo: boolean | undefined;
}