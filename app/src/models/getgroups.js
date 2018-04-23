
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { patch, deleteGroups, downLoad } from '../services/getgroups';
import { getCookie } from '../utils/helper';

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
              /*  let regexp = new RegExp('^/share/[A-Za-z0-9]+$');
                let reg = new RegExp('[A-Za-z0-9]+$');
                console.log(location);
                if(regexp.test(location.pathname)) {
                  
                    var newstr = location.pathname.match(reg);
                    console.log(newstr[0]);
                      dispatch({
                        type: 'share',
                        url: newstr[0]
                    });
                }
                */
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
                console.log(data);
               yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                    }
                });
            }
        },
        *delete({payload}, {select, call, put}) {
            let { data } = yield call(deleteGroups, payload);
            if (data) {
              //  console.log(data);
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                    }
                });
            }
        }
    }
};