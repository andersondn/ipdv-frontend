import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { DateTime } from '../../../node_modules/luxon/build/amd/luxon';

// import { Container } from './styles';
type LoginForm = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [isLoading, setLoading] = React.useState(false);
    const [expireAt, setExpireAt] = React.useState<string>();
    let navigate = useNavigate();

    const auth = useAuth();

    function calculateSessionExpireTime(){
        if(auth?.user.exp)
         return DateTime.fromSeconds(auth?.user?.exp).diff(DateTime.now()).toFormat('mm:ss');
        return '00:00';

    }
    useEffect(() => {
        const timer = setInterval(() => {
            setExpireAt(calculateSessionExpireTime());
            console.log('aa')
        }, 1000);
      
        return () => clearTimeout(timer);
      },[]);

  const onFinish = async ({email, password}: LoginForm) => {
    setLoading(true);
    const result =  await  auth.logIn({
            email,
            password,
      });
      if(result.success){
        navigate("/");
      }
    console.log(result);
    setLoading(false);

  };

  return (
    <>
      <h1>Login page</h1>
    {JSON.stringify(auth)}
    <br />
   Sessão expira em: {expireAt}
    
     {/* //~> in 3 hr, 13 min} */}
      <Form
        name="basic"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Por favor informe seu e-mail." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[
            { required: true, message: "Por favor informe sua senha." },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 6 }}>
                    <Button
                        type="primary"
                        loading={false}
                        htmlType="submit"

                    >
                        {isLoading ? 'Entrando...' : "Entrar"}
                    </Button>
                </Form.Item>
      </Form>
    </>
  );
};

export default Login;
