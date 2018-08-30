

import {  routerRedux } from 'dva/router';
import { login } from '../services/auth';

import { setCookie, getCookie} from '../utils/helper';

export default {
    namespace: 'login',
    state: {
        name: null,
        message: null,
        isLogin: false,
    },
    reducers: {
        querySuccess(state, { payload }) {
            return {...state, message: payload};
        },
        loginSuccess(state, { payload }) {
            const { userName, message } = payload;
            return { ...state, name: userName, isLogin: true, message: message };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/login') {
                    let username = getCookie("username");
                    if(username !== null) {
                        dispatch(
                            routerRedux.push({
                                pathname: '/admin',
                        }));
                    }
                }
            });
        }
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(login, payload);
            if (data) {
                  if(data.message == "登录成功") {
                      setCookie("token", data.token);   //设置全局的cookie
                      setCookie("username", data.user);
                      yield put({
                          type: 'loginSuccess',
                          payload: data,
                      });
                      yield put(routerRedux.push('/admin'));
                  } else {
                    yield put({
                        type: 'querySuccess',
                        payload: data.message,
                    });
                  }
            }
        },
    }
};
