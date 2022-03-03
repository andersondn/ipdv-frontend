import {
  Button,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React from "react";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import CostController from "../../controllers/CostController";
import { Cost } from "../../types/costTypes";
import { DateTime } from "luxon";
import { integerToCurrency } from "../../helpers/format";
import useCostsFilter from "../../hooks/filterCosts";
import Search from "antd/lib/input/Search";
const { Option } = Select;

const Costs: React.FC = () => {
  const { data: costs, error } = useSWR("/costs");
  const { data: departments } = useSWR("/departments");
  const { data: users } = useSWR("/users");
  const [filteredCosts, setCostFilter] = useCostsFilter(costs);

  const isDataLoading = !error && !costs;
  const costController = new CostController();

  async function handleDelete(costId: number) {
    const result = await costController.deleteCost(costId);
    if (result.success) {
      mutate(
        "/costs",
        (costs: Cost[]) => costs && costs.filter((cost) => cost.id !== costId),
        true
      );
    } else {
      message.error(result.message || `Erro ao excluir o Usuário.`);
    }
  }

  const actionsButtons = (text: string, cost: any) => (
    <Space>
      <Tooltip title="Editar">
        <Link to={`/costs/edit/${cost.id}`}>
          <Button shape="circle" icon={<EditTwoTone />} />
        </Link>
      </Tooltip>
      <Tooltip title="Apagar">
        <Popconfirm
          placement="leftBottom"
          title={`Deseja realmente apagar o usuário ${cost.name}?`}
          onConfirm={() => handleDelete(cost.id)}
          okText="Sim"
          cancelText="não"
        >
          <Button
            shape="circle"
            icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
            danger
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );

  const columns: any = [
    {
      title: "Titulo",
      dataIndex: "title",
    },
    {
      title: "Valor",
      dataIndex: "amount",
      render: (text: string) => `R$ ${integerToCurrency(text)}`,
    },
    {
      title: "Criado por",
      dataIndex: "user_name",
    },
    {
      title: "Departamento",
      dataIndex: "department_title",
    },
    {
      title: "Data",
      dataIndex: "date",
      render: (date: string) =>
        DateTime.fromMillis(+date).toFormat("dd/MM/yyyy"),
    },
    {
      title: "Ações",
      key: "actions",
      width: 20,
      render: actionsButtons,
    },
  ];

  return (
    <>
      <h1>Central de custos</h1>
      <Space
        size={6}
        className="flex-gap"
        wrap={true}
        style={{ marginBottom: "1em" }}
      >
        <Search
          placeholder="Pesquisar por titulo, usuário ou departamento"
          allowClear
          onChange={(event) => setCostFilter({ search: event.target.value })}
          style={{ width: 330 }}
        />

        <Select
          defaultValue=""
          style={{ width: 180 }}
          onChange={(department: String) => setCostFilter({ department })}
        >
          <Option value="">Todos departamentos</Option>
          {departments?.map((department) => (
            <Option key={department.id} value={department.id}>
              {department.title}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue=""
          style={{ width: 180 }}
          onChange={(user: String) => setCostFilter({ user })}
        >
          <Option value="">Todos usuários</Option>
          {users?.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>

        <Link to="/costs/add">
          <Button icon={<PlusOutlined />}>Adicionar</Button>
        </Link>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredCosts}
        rowKey="id"
        loading={isDataLoading}
      />
    </>
  );
};

export default Costs;
