import { routerRedux } from 'dva/router';
import { register } from '../services/auth';


export default {
    namespace: 'register',
    state: {
        name: "注册",
        isLogin: false,
    },
    reducers: {
        querySuccess(state) {
            return { ...state };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/reg') {
                    console.log(location);
                }
            });
        }
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(register, payload);
            if (data) {

                yield put(routerRedux.push('/login'));
            }
        },
    }
};