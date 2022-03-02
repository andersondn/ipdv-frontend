import React from 'react';
import message from "antd/lib/message";
import { useState } from "react";
import DepartmentForm from "./DepartmentForm"
import { Department } from '../../types/departmentTypes';
import DepartmentController from '../../controllers/DepartmentController';
import { useNavigate } from 'react-router-dom';

const CreateDepartment: React.FC = () => {
    const departmentController = new DepartmentController();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    async function handlerSubmit(formData: Department) {
        setIsLoading(true)
        const result = await departmentController.createDepartment(formData)

        if(result.success){
            message.success(`Departamento cadastrado com sucesso!`);
            navigate('/departments')
        }else {
            message.error(result.message || `Erro ao cadastrar o Departamento.`);
        }
        setIsLoading(false)

    }

    return (
        <>
        <h1>Adicionar departamento</h1>
        <DepartmentForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
            submitTitle="Adicionar"

        />
        </>
    )
}

export default CreateDepartment;