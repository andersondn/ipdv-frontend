import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// import { Container } from './styles';
type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [isLoading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const auth = useAuth();

  const onFinish = async ({ email, password }: LoginForm) => {
    setLoading(true);
    const result = await auth.logIn({
      email,
      password,
    });
    if (result.success) {
      return navigate("/");
    }
    message.error(result.message || "Erro ao logar");
    setLoading(false);
  };

  return (
    <>
      <Row style={{ height: "100%" }} justify="center" align="middle">
        <Col xl={6} sm={18} md={14} xs={24}>
          <h1>Central de custo - Login</h1>
          <br />

          <Form name="basic" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor informe seu e-mail." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Senha"
              name="password"
              rules={[
                { required: true, message: "Por favor informe sua senha." },
                { min: 6, message: "A senha deve ter no mínimo 6 caracteres." },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Row justify="space-between">
              <Form.Item wrapperCol={{ offset: 1, span: 6 }}>
                <Button type="primary" loading={false} htmlType="submit">
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </Form.Item>
              <Link to={"/signUp"}>
                <p>Criar conta</p>
              </Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
