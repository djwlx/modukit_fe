import { Nav, Space } from '@douyinfe/semi-ui';
import { Outlet, useMatches, useNavigate } from '@modern-js/runtime/router';
import { IconTree } from '@douyinfe/semi-icons-lab';
import { useEffect, useMemo, useState } from 'react';
import styles from './layout.module.scss';

function Layout() {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathKey: string = matches[matches?.length - 1]?.pathname;
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

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

  return (
    <div style={{ height: '100vh' }}>
      <header className={styles.header}>
        <Space>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Modukit
          </span>
        </Space>
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
