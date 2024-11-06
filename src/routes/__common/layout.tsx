import { Avatar, Dropdown, Nav, Space } from '@douyinfe/semi-ui';
import { Outlet, useMatches, useNavigate } from '@modern-js/runtime/router';
import { IconTree } from '@douyinfe/semi-icons-lab';
import { useEffect, useMemo, useState } from 'react';
import styles from './layout.module.scss';
import { getUserInfo } from '@/services/user';
import { useModel } from '@modern-js/runtime/model';
import { UserModel } from '@/models/user';

function Layout() {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathKey: string = matches[matches?.length - 1]?.pathname;
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [{ userInfo }, { setUserInfo }] = useModel(UserModel);

  const menuItems = useMemo(() => {
    return [
      {
        itemKey: '/task',
        text: '任务管理',
        icon: <IconTree />,
        items: [
          {
            itemKey: '/task/list',
            text: '我的任务',
          },
        ],
      },
    ];
  }, []);

  useEffect(() => {
    setSelectKeys([pathKey]);
  }, [pathKey]);

  useEffect(() => {
    getUserInfo().then(res => {
      if (res.data?.code === 0) {
        setUserInfo(res.data.data);
      }
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <header className={styles.header}>
        <Space>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Modukit
          </span>
        </Space>
        <Dropdown
          render={
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  localStorage.removeItem('modukit-token');
                  navigate('/login');
                }}
              >
                退出登录
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Avatar src={userInfo?.avatar} size="default" style={{ margin: 4 }} alt="User">
            {userInfo?.nickname || 'M'}
          </Avatar>
        </Dropdown>
      </header>
      <div style={{ height: 'calc(100vh - 60px)', display: 'flex' }}>
        <Nav
          selectedKeys={selectKeys}
          defaultSelectedKeys={[pathKey]}
          items={menuItems}
          footer={{
            collapseButton: true,
          }}
          onSelect={data => {
            navigate(data.itemKey as string);
          }}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;
