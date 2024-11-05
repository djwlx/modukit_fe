import { Form, Button, Toast, Space, Typography } from '@douyinfe/semi-ui';
import type { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useState } from 'react';
import { useNavigate } from '@modern-js/runtime/router';
import { login, register } from '@/services/user';
import { IconArrowLeft } from '@douyinfe/semi-icons';

const { Input, Checkbox } = Form;
const { Text } = Typography;
function Login() {
  const [formApi, setFormApi] = useState<SFormApi>();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const redirect = new URLSearchParams(window.location.search)?.get('redirect');

  const registerMethod = async () => {
    try {
      const res = await formApi?.validate();
      setLoading(true);
      const result = await register(res);
      if (result.data?.code === 0) {
        Toast.success('注册成功');
        setMode('login');
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const loginMethod = async () => {
    try {
      const res = await formApi?.validate();
      setLoading(true);
      const result = await login(res);
      if (result.data?.code === 0) {
        const { token } = result.data?.data || {};
        localStorage.setItem('modukit-token', token);
        if (redirect) {
          navigate(redirect);
        } else {
          navigate('/');
        }
        Toast.success('登录成功');
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--semi-color-fill-1)',
        justifyContent: 'center',
      }}
    >
      <main
        style={{
          width: 400,
          maxWidth: '100%',
          minWidth: 350,
          textAlign: 'center',
          padding: 16,
          margin: 16,
          backgroundColor: 'var(--semi-color-bg-0)',
          boxShadow: 'var(--semi-color-shadow) 0px 0.5rem 2rem',
        }}
      >
        <header
          style={{
            fontSize: 20,
            fontWeight: 'bolder',
            color: 'var(--semi-color-primary)',
            position: 'relative',
          }}
        >
          {mode === 'register' && (
            <Button
              style={{ position: 'absolute', left: 0 }}
              onClick={() => setMode('login')}
              icon={<IconArrowLeft />}
            ></Button>
          )}
          {mode === 'login' ? '登录' : '注册'}
        </header>
        <Form labelPosition="inset" getFormApi={setFormApi} style={{ width: '100%' }}>
          <Input autoComplete="off" rules={[{ required: true }]} field="username" label="用户名" />
          <Input rules={[{ required: true }]} field="password" mode="password" label="密码" />
          {mode === 'login' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <Text>
                如果没有账号，请先
                <Text link size="inherit" onClick={() => setMode('register')}>
                  注册
                </Text>
              </Text>
              <Checkbox initValue={true} field="auto">
                30天内自动登录
              </Checkbox>
            </div>
          )}
        </Form>
        <Button
          theme="solid"
          onClick={() => {
            if (mode === 'login') {
              loginMethod();
            } else {
              registerMethod();
            }
          }}
          loading={loading}
          style={{ width: '100%' }}
        >
          {mode === 'login' ? '登录' : '注册'}
        </Button>
      </main>
    </div>
  );
}

export default Login;
