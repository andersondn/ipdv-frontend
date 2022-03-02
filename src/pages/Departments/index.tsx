import { Button, message, Popconfirm, Row, Space, Table, Tooltip } from "antd";
import React from "react";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import DepartmentController from "../../controllers/DepartmentController";
import { Department } from "../../types/departmentTypes";
import { DateTime } from 'luxon';

const Departments: React.FC = () => {
  const { data: departments, error } = useSWR("/departments");
  const isDataLoading = !error && !departments;
  const departmentController = new DepartmentController();

  async function handleDelete(departmentId: number) {
    const result = await departmentController.deleteDepartment(departmentId);
    if (result.success) {
      mutate(
        "/departments",
        (departments: Department[]) => departments && departments.filter((department) => department.id !== departmentId),
        true
      );
    } else {
      message.error(result.message || `Erro ao excluir o departamento.`);
    }
  }

  const actionsButtons = (text: string, department: any) => (
    <Space>
      <Tooltip title="Editar">
        <Link to={`/departments/edit/${department.id}`}>
          <Button shape="circle" icon={<EditTwoTone />} />
        </Link>
      </Tooltip>
      <Tooltip title="Apagar">
        <Popconfirm
          placement="leftBottom"
          title={`Deseja realmente apagar o departamento ${department.title}?`}
          onConfirm={() => handleDelete(department.id)}
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
      title: "Nome",
      dataIndex: "title",
    },

    {
      title: "Criado em:",
      dataIndex: "created_at",
      render: (date: string) => DateTime.fromMillis(+date).toFormat("dd/MM/yyyy - HH:mm") ,
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
      <h1>Departamentos</h1>

      <Row justify="end">
        <Link to="/departments/add">
          <Button icon={<PlusOutlined />}>Adicionar</Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={departments}
        rowKey="id"
        loading={isDataLoading}
      />
    </>
  );
};

export default Departments;
