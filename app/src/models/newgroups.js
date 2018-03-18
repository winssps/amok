

import { patch }  from '../services/newgroups';


export default {
    namespace: 'newgroups',
    state: {
        visible: false,
        name: null,
        date: {},
        time: {},
    },
    reducers: {
        show(state) {
           const visible = true;
            return { ...state, visible: visible};
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
    subscriptions: {
       
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(patch, payload);
              if (data) {
               //   console.log(data);
                  yield put({
                      type: 'getgroups/query',
                  });
              }
        },
    }
};