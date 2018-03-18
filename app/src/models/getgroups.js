
import { message } from 'antd';

import { patch, deleteGroups, downLoad } from '../services/getgroups';

export default {
    namespace: 'getgroups',
    state: {
        list:[],
        loading: false,
    },
    reducers: {
        showLoading(state, action) {
            return { ...state, loading: true };
        }, // 控制加载状态的 reducer
        querySuccess(state, { payload}) {
            return { ...state, ...payload, loading: false };
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if(location.pathname === '/') {
                    dispatch({
                        type: 'query',
                        payload: {}
                    });
                }
            });
        }
    },
    effects: {
        *query({ payload }, { select, call, put }) {  //拉取列表
            yield put({ type: 'showLoading' });
            let { data } = yield call(patch);
            if (data) {
                console.log(data);
               yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                    }
                });
                yield put({
                    type: 'newgroups/ok',
                });
            }
        },
        *delete({ payload: id }, { select, call, put }) {  //拉取列表
            yield put({ type: 'showLoading' });
            const { data } = yield call(deleteGroups, id);
            if (data) {
                
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                    }
                });
            }
        },
        *download({ payload: id }, { select, call, put }) {  //拉取列表
            const { data } = yield call(downLoad, id);
            if(data) {
                message.info(data.message);
            }
        },
    }
};