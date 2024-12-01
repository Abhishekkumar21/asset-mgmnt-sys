import { useState } from 'react';
import { Card, Form, Input, Button, Select, Typography } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;
const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        contactNumber: values.contactNumber,
        address: values.address,
      });
      navigate('/login');
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 mx-auto">
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <Card className="w-full shadow-2xl rounded-xl bg-white/90 backdrop-blur-md border border-white/20">
            <div className="text-center mb-8">
              <Title level={2} className="!text-primary !m-0">
                Create Account
              </Title>
              <Text className="text-gray-500 mt-2 block">
                Join us to manage company assets
              </Text>
            </div>

            <Form
              name="register"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="max-w-sm mx-auto"
            >
              {/* Name and Gender in one row */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Full Name"
                    className="auth-input"
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: 'Please select your gender!' }]}
                >
                  <Select 
                    placeholder="Gender" 
                    className="auth-input"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </div>

              {/* Email field */}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Email"
                  className="auth-input"
                  autoComplete="email"
                />
              </Form.Item>

              {/* Password and Confirm Password in one row */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Password"
                    className="auth-input"
                    autoComplete="new-password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Confirm"
                    className="auth-input"
                    autoComplete="new-password"
                  />
                </Form.Item>
              </div>

              {/* Contact and Address in one row */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="contactNumber"
                  rules={[{ required: true, message: 'Please input contact!' }]}
                >
                  <Input 
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="Contact Number"
                    className="auth-input"
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[{ required: true, message: 'Please input address!' }]}
                >
                  <Input.TextArea 
                    placeholder="Address"
                    className="rounded-lg !min-h-[44px] resize-none"
                    autoSize={{ minRows: 1, maxRows: 2 }}
                  />
                </Form.Item>
              </div>

              <Form.Item className="mb-4">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="auth-button"
                  block
                >
                  Register
                </Button>
              </Form.Item>

              <div className="text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:text-primary-dark">
                  Login now!
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
