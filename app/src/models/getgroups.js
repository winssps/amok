
import { patch, deleteGroups, delist, recoveryGroup } from '../services/getgroups';
import { getCookie } from '../utils/helper';

export default {
    namespace: 'getgroups',
    state: {
        list:[],
        loading: false,
        type: 1,
    },
    reducers: {
        showLoading(state, action) {
            return { ...state, loading: true };
        }, // 控制加载状态的 reducer
        querySuccess(state, { payload}) {
            return { ...state, ...payload, loading: false };
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if(location.pathname === "/admin") {
                    dispatch({
                        type: 'query',
                        payload: getCookie("username"),
                    });
                }
            });
        }
    },
    effects: {
        *query({ payload }, { select, call, put }) {  //拉取列表
            yield put({ type: 'showLoading' });
            let { data } = yield call(patch, payload);
            if (data) {
               yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                        type: 1,
                    }
                });
            }
        },
        *delete({payload}, {select, call, put}) {
            let { data } = yield call(deleteGroups, payload);
            if (data) {
              let { data } = yield call(patch, payload);
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                        type: 1,
                    }
                });
            }
        },
        *delist({payload}, {select, call, put}) {
        yield put({ type: 'showLoading' });
        let { data } = yield call(delist, payload);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data,
              type: 3,
            }
          });
        }
      },
      *recovery({payload}, {select, call, put}) {
        yield put({ type: 'showLoading' });
        let { data } = yield call(recoveryGroup, payload);
        if (data) {

          let { data } = yield call(delist, payload);
          yield put({
            type: 'querySuccess',
            payload: {
              list: data,
              type: 3,
            }
          });
        }
      },
    }
};
