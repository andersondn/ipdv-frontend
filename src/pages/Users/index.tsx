import { Button, message, Popconfirm, Row, Space, Table, Tooltip } from "antd";
import React from "react";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { RoleList } from "../../helpers/rolesList";
import UserController from "../../controllers/UserController";
import { User } from "../../types/userTypes";

const Users: React.FC = () => {
  const { data: users, error } = useSWR("/users");
  const isDataLoading = !error && !users;
  const userController = new UserController();

  async function handleDelete(userId: number) {
    const result = await userController.deleteUser(userId);
    if (result.success) {
      mutate(
        "/users",
        (users: User[]) => users && users.filter((user) => user.id !== userId),
        true
      );
    } else {
      message.error(result.message || `Erro ao excluir o Usuário.`);
    }
  }

  const actionsButtons = (text: string, user: any) => (
    <Space>
      <Tooltip title="Editar">
        <Link to={`/users/edit/${user.id}`}>
          <Button shape="circle" icon={<EditTwoTone />} />
        </Link>
      </Tooltip>
      <Tooltip title="Apagar">
        <Popconfirm
          placement="leftBottom"
          title={`Deseja realmente apagar o usuário ${user.name}?`}
          onConfirm={() => handleDelete(user.id)}
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
      dataIndex: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Cargo",
      dataIndex: "role",
      render: (role: string) => RoleList[role],
    },
    {
      title: "Departamento",
      dataIndex: "department_title",
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
      <h1>Usuários</h1>

      <Row justify="end">
        <Link to="/users/add">
          <Button icon={<PlusOutlined />}>Adicionar</Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isDataLoading}
      />
    </>
  );
};

export default Users;
