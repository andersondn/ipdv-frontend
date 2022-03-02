import { Form, Input,  Button } from 'antd';
import { formLayout } from '../../helpers/form';
import { Department } from '../../types/departmentTypes';


interface IDepartmentForm {
    department?: Department,
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: Department): Promise<void>,
}

const DepartmentForm = ({ department, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: IDepartmentForm) => {
  
    return (
        <>
            <Form
                {...formLayout}
                name="basic"
                onFinish={handlerSubmit}
                initialValues={department}
            >
                <Form.Item
                    label="Nome"
                    name="title"
                    rules={[{ required: true, message: 'Por favor informe o nome do departamento.' }]}
                >
                    <Input />
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


export default DepartmentForm