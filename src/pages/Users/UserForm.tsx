import { Form, Input, Select, Button } from 'antd';
import useSWR from 'swr';
import { formLayout } from '../../helpers/form';
import { User } from '../../types/userTypes';
// import { companiesToOptionMap, formLayout } from "../../lib/helpers";
// import { IUser, ICompany } from '../../types';
const { Option } = Select;
const RoleList = {
    ADMIN: 'Administrador',
    MANAGER: 'Gerente',
    EMPLOYEE: 'Funcionário',

}

interface IUserForm {
    user?: User,
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: User): Promise<void>,
}

const UserForm = ({ user, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: IUserForm) => {
  
    const { data: departments } = useSWR('/departments')

    return (
        <>
            <Form
                {...formLayout}
                name="basic"
                onFinish={handlerSubmit}
                initialValues={user}
            >
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor informe o nome do usuário.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor informe o email do usuário.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Departamento"
                    name="department_id"
                    rules={[{ required: true, message: 'Por favor selecione um usuário.' }]}
                >
                    <Select defaultValue="">
                        <Option value="">Selecionar dapartamento</Option>
                        {departments?.map(department => ((
                            <Option key={department.id} value={department.id} >{department.title}</Option>
                        )))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Cargo"
                    name="role"
                    rules={[{ required: true, message: 'Por favor selecione um usuário.' }]}
                >
                    <Select defaultValue="">
                        <Option value="">Selecionar cargo</Option>
                        {Object.entries(RoleList)?.map(([role, title]) => ((
                            <Option key={role} value={role} >{title}</Option>
                        )))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor informe a senha do usuário.'}, {min: 6, message: 'A senha deve ter no mínimo 6 caracteres.'}]}
                >
                    <Input type="password" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 1, span: 6 }}>
                    <Button
                        type="primary"
                        loading={isLoading}
                        htmlType="submit"

                    >
                        {isLoading ? 'Salvando...' : submitTitle}
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}


export default UserForm