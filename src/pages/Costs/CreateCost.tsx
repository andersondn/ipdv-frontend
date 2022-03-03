import React from 'react';
import message from "antd/lib/message";
import { useState } from "react";
import CostForm from "./CostForm"
import { Cost } from '../../types/costTypes';
import CostController from '../../controllers/CostController';
import { useNavigate } from 'react-router-dom';

const CreateCost: React.FC = () => {
    const costController = new CostController();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    async function handlerSubmit(formData: Cost) {
        setIsLoading(true)
        const result = await costController.createCost(formData)

        if(result.success){
            message.success(`Usuário cadastrado com sucesso!`);
            navigate('/costs')
        }else {
            message.error(result.message || `Erro ao cadastrar o Usuário.`);
        }
        setIsLoading(false)

    }

    return (
        <>
        <h1>Adicionar custo</h1>
        <CostForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
            submitTitle="Adicionar"

        />
        </>
    )
}

export default CreateCost;