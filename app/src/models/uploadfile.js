import dva from 'dva';

import { hashHistory } from 'dva/router';

import { patch } from '../services/upload';
import {getCookie} from '../utils/helper';
export default {
    namespace: 'upload',
    state: {
        visible: false,
        file: {},
    },
    reducers: {
        show(state) {
            const visible = true;
            return { ...state, visible: visible };
        },
        ok(state, { payload }) {
            const visible = false;
            return { ...state, ...payload, visible: visible };
        },
        cancel(state) {
            const visible = false;
            return { ...state, visible: visible };
        },
    },
    subscriptions: {

    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(patch, getCookie("groupsname"));
            if (data) {
                yield put({
                    type: 'showinfo/query',
                });
            }
        },
    }
};