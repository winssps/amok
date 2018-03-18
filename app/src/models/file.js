
import { routerRedux } from 'dva/router';
import { patch } from '../services/files';
import { setLocalStorage } from '../utils/helper';
import moment from 'moment';
export default {
    namespace: 'showinfo',
    state: {
        list: [],
        loading: false,
    },
    reducers: {
        showLoading(state, action) {
            return { ...state, loading: true };
        }, // 控制加载状态的 reducer
        querySuccess(state, { payload }) {
         //   console.log(payload);
            let filearr = [];
            let fileobj = {};
                for (let i = 0; i < payload.length;i++) {
                    let { name, size, lastModified, etag} = payload[i];
                    let time = new moment(lastModified).format('YYYY-MM-DD HH:mm:ss');
                    if (size > 0) {
                        fileobj = {
                            name: name,
                            size: size,
                            time: time,
                            id: etag
                        };
                        filearr.push(fileobj); 
                    }
                }
            return { ...state, list: filearr, loading: false};
        },
        queryFail(state, { payload }) {
            return { ...state, list: payload, loading: false };
        },
        queryok(state, {payload}) {
            return { ...state, id: payload.id };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/showinfo') {
                 //   console.log('重定向接收参数：%o', location.state);
                    let state  = location.state;
                    
                    if (state !== undefined) {
                    //    setCookie("groupsname",state.id);
                        setLocalStorage('groupsname', state.id);
                        dispatch({
                            type: 'query',
                            payload: state.id
                        });
                    }
                    /* else if(getCookie("groupsname")) {
                        dispatch({
                            type: 'query',
                        });
                    }*/
                    else {
                        dispatch(
                            routerRedux.push({
                                pathname: '/',
                            }));
                    }
                }
            });
        }
    },
    effects: {
        *query({payload: id} , { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(patch, id);
            if (data.objects !== undefined) {
                yield put({
                    type: 'querySuccess',
                    payload: data.objects,
                })
            } else {
                yield put({
                    type: 'queryFail',
                    payload: null,
                })
            }
        },
    }
};