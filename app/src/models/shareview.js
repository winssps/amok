
import { sharegroups } from '../services/getgroups';
import { setCookie } from '../utils/helper';

export default {
    namespace: 'shareview',
    state: {
        list: [],
        loading: false,
        type: 1
    },
    reducers: {
        showLoading(state, action) {
            return { ...state, loading: true };
        }, // 控制加载状态的 reducer
        querySuccess(state, { payload }) {
            return { ...state, ...payload, loading: false };
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                let regexp = new RegExp('^/share/[A-Za-z0-9]+$');
                let reg = new RegExp('[A-Za-z0-9]+$');
                if (regexp.test(location.pathname)) {

                    var newstr = location.pathname.match(reg);
                        setCookie("share",newstr);
                    dispatch({
                        type: 'share',
                        url: newstr[0]
                    });
                }
            });
        }
    },
    effects: {
        *share({ url }, { select, call, put }) {  //拉取列表
            yield put({ type: 'showLoading' });
            let { data } = yield call(sharegroups, url);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data,
                        type: 1
                    }
                });
            }
        },
    }
};
