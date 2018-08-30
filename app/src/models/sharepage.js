

import { getlink } from '../services/newgroups';


export default {
    namespace: 'sharepage',
    state: {
        visible: false,
        link: null,
    },
    reducers: {
        show(state, {link }) {
            const visible = true;
            return { ...state, visible: visible, link:link };
        },
        ok(state, { payload }) {
            const visible = false;
            return { ...state, visible: visible };
        },
        cancel(state) {
            const visible = false;
            return { ...state, visible: visible };
        },
    },
    effects: {
        *showshare({ payload }, { select, call, put }) {
            const { data } = yield call(getlink, payload);
            if (data) {
                yield put({
                    type: 'show',
                    link: data.sharelink,
                });
            }
        },
    }
};
