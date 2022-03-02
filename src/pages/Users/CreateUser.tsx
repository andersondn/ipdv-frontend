import React from 'react';
import message from "antd/lib/message";
import { useState } from "react";
// import { useHistory } from "react-router";
// import { createUser } from "../../controllers/UserController";
// import { IUser } from "../../types";
import UserForm from "./UserForm"
import { User } from '../../types/userTypes';
import UserController from '../../controllers/UserController';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

const CreateUser: React.FC = () => {
    const userController = new UserController();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    async function handlerSubmit(formData: User) {
        setIsLoading(true)
        const result = await userController.createUser(formData)

        if(result.success){
            message.success(`Usuário cadastrado com sucesso!`);
            navigate('/users')
        }else {
            message.error(result.message || `Erro ao cadastrar o Usuário.`);
        }
        setIsLoading(false)

    }

    return (
        <>
        <h1>Adicionar Usuário</h1>
        <UserForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
            submitTitle="Adicionar"

        />
        </>
    )
}

export default CreateUser;