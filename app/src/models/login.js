

import {  routerRedux } from 'dva/router';
import { patch } from '../services/login';

import { setCookie} from '../utils/helper';

export default {
    namespace: 'login',
    state: {
        name: "登录",
        isLogin: false,
    },
    reducers: {
        querySuccess(state) {
            return {...state};
        },
        loginSuccess(state, { payload }) {
            const { user } = payload;
            return { ...state, name: user, isLogin: true };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/login') {
                    dispatch({
                        type: 'querySuccess',
                        payload: {}
                    });
                }
            });
        }
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(patch, payload);
            if (data) {
                setCookie("token", data.token);   //设置全局的cookie
                setCookie("username", data.user);
                yield put({
                    type: 'loginSuccess',
                    payload: data,
                });
                yield put(routerRedux.push('/'));
            }
        },
    }
};