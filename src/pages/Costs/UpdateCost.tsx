import {  useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from 'swr';
import CostForm from "./CostForm";
import { message, Spin, Result } from 'antd';
import { useState } from "react";
import { Cost } from "../../types/costTypes";
import CostController from "../../controllers/CostController";

const UpdateCost = () => {
    const costController = new CostController();

    const { costId } = useParams<Record<string, string | undefined>>();
    const { data: cost, error } = useSWR<Cost>(`/costs/${costId}`)
    const isDataLoading = !error && !cost
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    // 

    async function handlerSubmit(formData: Cost) {
        setIsLoading(true)
        const result = await costController.updateCost(cost.id, formData)

        if(result.success){
            message.success(`Custo atualizado com sucesso!`);
            mutate(`/costs/${costId}`)
            navigate('/costs')
        }else {
            message.error(result.message || `Erro ao cadastrar o Custo.`);
        }
        setIsLoading(false)

    }

    if (error) return (
        <>
        {JSON.stringify(error)}
        <Result
            status="500"
            title="Erro ao carregar os custos."
            subTitle="Por favor, verifique se usuário existe e se o servidor está respondendo corretamente"
            />
            </>
    )
    return (
        <>
        <h1>Editar custo</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <CostForm
                    cost={cost}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                    submitTitle="Editar"
                />

            }
        </>
    )
}

export default UpdateCost