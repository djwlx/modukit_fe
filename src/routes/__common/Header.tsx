import { Avatar, Dropdown, Space } from '@douyinfe/semi-ui';
import styles from './layout.module.scss';
import { useNavigate } from '@modern-js/runtime/router';
import { IconExit, IconUser } from '@douyinfe/semi-icons';
import { useModel } from '@modern-js/runtime/model';
import { UserModel } from '@/models/user';
function Header() {
  const [{ userInfo }] = useModel(UserModel);
  const navigate = useNavigate();

  return (
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
              icon={<IconUser />}
              onClick={() => {
                localStorage.removeItem('modukit-token');
                navigate('/user');
              }}
            >
              个人设置
            </Dropdown.Item>
            <Dropdown.Item
              icon={<IconExit />}
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
  );
}

export default Header;
