import {  useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import DepartmentForm from "./DepartmentForm";
import { message, Spin, Result } from 'antd';
import { useState } from "react";
import { Department } from "../../types/departmentTypes";
import DepartmentController from "../../controllers/DepartmentController";

const UpdateDepartment = () => {
    const departmentController = new DepartmentController();

    const { departmentId } = useParams<Record<string, string | undefined>>();
    const { data: department, error } = useSWR<Department>(`/departments/${departmentId}`)
    const isDataLoading = !error && !department
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    async function handlerSubmit(formData: Department) {
        setIsLoading(true)
        const result = await departmentController.updateDepartment(department.id, formData)

        if(result.success){
            message.success(`Departamento atualizado com sucesso!`);
            navigate('/departments')
        }else {
            message.error(result.message || `Erro ao cadastrar o Departamento.`);
        }
        setIsLoading(false)

    }

    if (error) return (
        <>
        {JSON.stringify(error)}
        <Result
            status="500"
            title="Erro ao carregar dados do departamento."
            subTitle="Por favor, verifique se o departamento existe e se o servidor está respondendo corretamente"
            />
            </>
    )
    return (
        <>
        <h1>Editar departamento</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <DepartmentForm
                    department={department}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                    submitTitle="Editar"
                />

            }
        </>
    )
}

export default UpdateDepartment