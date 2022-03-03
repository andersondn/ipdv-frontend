import { Col, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import Countdown from "antd/lib/statistic/Countdown";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// import { Container } from './styles';

const AppHeader: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onFinish = async () => {
    auth.logOut();
    navigate("/login");
  }

  return (
    <>
      <Header
        className="site-layout-sub-header-background color-white"
        style={{ padding: 0 }}
      >
        <Row justify="end">
            {auth.user?.exp && (
              <Countdown
                title="Sessão expira em"
                value={auth.user.exp * 1000}
                valueStyle={{ color: "#ccc" }}
                style={{color: '#fff'}}
                onFinish={onFinish}
              />
            )}
        </Row>
      </Header>
    </>
  );
};

export default AppHeader;
