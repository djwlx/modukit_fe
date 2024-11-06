import { model, useModel } from '@modern-js/runtime/model';

interface UserModel {
  userInfo: {
    id: number;
    username: string;
    password?: string;
    nickname?: string;
    avatar?: string;
    email?: string;
    status?: string;
  };
}

export const UserModel = model<UserModel>('user').define({
  state: {
    userInfo: {
      nickname: 'M',
    },
  },
  actions: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
});
