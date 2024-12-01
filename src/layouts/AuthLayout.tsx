import { ReactNode } from 'react';
import { Layout } from 'antd';
import '../styles/global.css';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Layout className="auth-container">
      <div className="fade-in">
        {children}
      </div>
    </Layout>
  );
};

export default AuthLayout;
