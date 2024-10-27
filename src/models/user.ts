import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
    public id!: string;
    public nome!: string;
    public email!: string;
    public idade?: number;
    public ativo!: boolean;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    idade: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;