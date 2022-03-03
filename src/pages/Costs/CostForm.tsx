import { Form, Input, Select, Button, InputNumber, DatePicker } from "antd";
import { DateTime } from "luxon";
import moment from "moment";
import useSWR from "swr";
import { formLayout } from "../../helpers/form";
import { currencyToInteger, integerToCurrency } from "../../helpers/format";
import { RoleList } from "../../helpers/rolesList";
import { Cost } from "../../types/costTypes";
const { Option } = Select;

interface ICostForm {
  cost?: Cost;
  isLoading?: boolean;
  submitTitle?: String;
  handlerSubmit(formData: Cost): Promise<void>;
}

const CostForm = ({
  cost,
  isLoading = false,
  submitTitle = "Enviar",
  handlerSubmit,
}: ICostForm) => {
  const { data: departments } = useSWR("/departments");
  if (cost) cost.date = moment(cost.date) as any;
  return (
    <>
      <Form
        {...formLayout}
        name="basic"
        onFinish={handlerSubmit}
        initialValues={cost}
      >
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            { required: true, message: "Por favor informe o nome do custo." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Valor"
          name="amount"
          rules={[
            {
              required: true,
              message: "Por favor informe o valor.",
            },
          ]}
        >
          <InputNumber
            // defaultValue={1000}
            size="middle"
            style={{ width: 150 }}
            formatter={(value) => integerToCurrency(value)}
            parser={(value) => currencyToInteger(value)}
            //   onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Data"
          name="date"
          rules={[
            {
              required: true,
              message: "Por favor informe a data.",
            },
          ]}
        >
          {/* <Input /> */}

          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>

        <Form.Item
          label="Departamento"
          name="department_id"
          rules={[
            { required: true, message: "Por favor selecione um departamento." },
          ]}
        >
          <Select defaultValue="">
            <Option value="">Selecionar dapartamento</Option>
            {departments?.map((department) => (
              <Option key={department.id} value={department.id}>
                {department.title}
              </Option>
            ))}
          </Select>
        </Form.Item>





        <Form.Item wrapperCol={{ offset: 1, span: 6 }}>
          <Button type="primary" loading={isLoading} htmlType="submit">
            {isLoading ? "Salvando..." : submitTitle}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CostForm;
