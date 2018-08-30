import { routerRedux } from 'dva/router';
import { register } from '../services/auth';


export default {
    namespace: 'register',
    state: {
        name: null,
        isLogin: false,
    },
    reducers: {
        querySuccess(state, { payload }) {
            return { ...state, name: payload };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/reg') {
                }
            });
        }
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(register, payload);
            if (data) {
                yield put({
                  type: 'querySuccess',
                  payload: data.message,
                });
            }
            else {
              yield put({
                type: 'querySuccess',
              });
            }
        },
    }
};
