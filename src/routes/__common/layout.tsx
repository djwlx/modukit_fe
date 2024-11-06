import { Nav } from '@douyinfe/semi-ui';
import { Outlet, useMatches, useNavigate } from '@modern-js/runtime/router';
import { IconTree } from '@douyinfe/semi-icons-lab';
import { useEffect, useMemo, useState } from 'react';
import { getUserInfo } from '@/services/user';
import { useModel } from '@modern-js/runtime/model';
import { UserModel } from '@/models/user';
import Header from './Header';

function Layout() {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathKey: string = matches[matches?.length - 1]?.pathname;
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [, { setUserInfo }] = useModel(UserModel);

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

  const noNavMenu = useMemo(() => {
    return ['/user'];
  }, []);

  const showNav = !noNavMenu.some(item => pathKey === item);

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
      <Header />
      <div style={{ height: 'calc(100vh - 60px)', display: 'flex' }}>
        {showNav && (
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
        )}

        <main style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;
