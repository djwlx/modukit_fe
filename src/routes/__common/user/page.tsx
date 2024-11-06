import { UserModel } from '@/models/user';
import { updateUserInfo } from '@/services/user';
import { IconKey, IconUser } from '@douyinfe/semi-icons';
import { Tabs, Form, Button } from '@douyinfe/semi-ui';
import { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useModel } from '@modern-js/runtime/model';
import { useEffect, useState } from 'react';

const { Input, Section } = Form;
function User() {
  const [formApi, setFormApi] = useState<SFormApi>();
  const [{ userInfo }] = useModel(UserModel);

  const updateInfo = async () => {
    try {
      const res = await formApi?.validate();
      const result = await updateUserInfo(res);
      console.log(result, 'res');
    } catch (e) {}
  };

  useEffect(() => {
    if (formApi) {
      formApi.setValues(userInfo, { isOverride: true });
    }
  }, [userInfo, formApi]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
      <Form getFormApi={setFormApi}>
        <Tabs tabPosition="left" type="button">
          <Tabs.TabPane icon={<IconUser />} tab="基本信息" itemKey="1">
            <Section text="基本信息" style={{ width: 400, paddingLeft: 30 }}>
              <Input autoComplete="off" field="nickname" label="昵称" />
              <Input autoComplete="off" field="email" label="邮箱" />
              <Button theme="solid" onClick={updateInfo}>
                更新信息
              </Button>
            </Section>
          </Tabs.TabPane>
          <Tabs.TabPane icon={<IconKey />} tab="账号安全" itemKey="2">
            <Section text="账号安全" style={{ width: 400, paddingLeft: 30 }}>
              <Input autoComplete="off" field="username" label="用户名" />
              <Input mode="password" field="oldword" label="旧密码" />
              <Input mode="password" field="newword" label="新密码" />
              <Input mode="password" field="renewword" label="请再次输入新密码" />
              <Button theme="solid">保存</Button>
            </Section>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </div>
  );
}
export default User;
