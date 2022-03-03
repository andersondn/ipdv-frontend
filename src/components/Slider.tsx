import { Layout, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined,  ApartmentOutlined } from '@ant-design/icons';
import { Link, } from "react-router-dom";
const { Sider } = Layout;

const AppSlider = () => {


    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div className="logo">
                IPDV
            </div>
            <Menu theme="dark" mode="vertical" >

                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to="/">
                        Central de custos
                    </Link>
                </Menu.Item>

                <Menu.Item key="/departments" icon={<ApartmentOutlined />}>
                    <Link to="/departments">Departamentos</Link>
                </Menu.Item>
 
                <Menu.Item key="/users" icon={<UserOutlined />}>
                    <Link to="/users">Usuários</Link>
                </Menu.Item>

                <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                    <Link to="/logout">Sair</Link>
                </Menu.Item>
            </Menu>
        </Sider>)
}

export default AppSlider