import {  useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from 'swr';
import UserForm from "./UserForm";
import { message, Spin, Result } from 'antd';
import { useState } from "react";
import { User } from "../../types/userTypes";
import UserController from "../../controllers/UserController";

const UpdateUser = () => {
    const userController = new UserController();

    const { userId } = useParams<Record<string, string | undefined>>();
    const { data: user, error } = useSWR<User>(`/users/${userId}`)
    const isDataLoading = !error && !user
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    async function handlerSubmit(formData: User) {
        setIsLoading(true)
        const result = await userController.updateUser(user.id, formData)

        if(result.success){
            message.success(`Usuário atualizado com sucesso!`);
            mutate(`/users/${userId}`)
            navigate('/users')
        }else {
            message.error(result.message || `Erro ao cadastrar o Usuário.`);
        }
        setIsLoading(false)

    }

    if (error) return (
        <>
        {JSON.stringify(error)}
        <Result
            status="500"
            title="Erro ao carregar dados do usuário."
            subTitle="Por favor, verifique se usuário existe e se o servidor está respondendo corretamente"
            />
            </>
    )
    return (
        <>
        <h1>Editar usuário</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <UserForm
                    user={user}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                    submitTitle="Editar"
                />

            }
        </>
    )
}

export default UpdateUser