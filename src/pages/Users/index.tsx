import { Button, Row, Space, Table, Tooltip } from "antd";
import React from "react";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";
import useSWR from "swr";

// import { Container } from './styles';

const Users: React.FC = () => {
  const { data: users, error } = useSWR("/users");
  const isDataLoading = !error && !users


	const actionsButtons = (text: string, user: any) => (
		<Space>
			<Tooltip title="Editar">
				<Link to={`/users/edit/${user.id}`}>
					<Button
						shape="circle"
						icon={<EditTwoTone />}
					/>
				</Link>
			</Tooltip>
			<Tooltip title="Apagar">
				<Button
					shape="circle"
					// onClick={() => deleteUser(user._id)}
					icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
					danger
				/>
			</Tooltip>
		</Space>
	)

  const columns: any = [
		{
			title: 'Nome',
			dataIndex: 'name',

		},
		{
			title: 'E-mail',
			dataIndex: 'email',

		},
		{
			title: 'Cargo',
			dataIndex: 'role',
		},
    {
      title: 'Departamento',
      dataIndex: 'department_id',
    },
		{
			title: 'Ações',
			key: 'actions',
			width: 20,
			render: actionsButtons
		},
	]

  return (
    <>
      <h1>Usuários</h1>

      <Row justify='end'>
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
