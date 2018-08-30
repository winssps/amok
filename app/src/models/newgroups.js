

import { newgroups }  from '../services/newgroups';
import { getCookie } from '../utils/helper';


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
            return { visible: true };
        },
        ok(state, { payload }) {

            return { visible: false };
        },
        cancel(state) {
            return { visible: false };
        },
    },
    effects: {
        *submit({ payload }, { select, call, put }) {
            payload.attribute = getCookie("username");
            console.log(payload);
            const { data } = yield call(newgroups, payload);
              if (data) {
                  yield put({
                      type: 'ok',
                  });
                  yield put({
                      type: 'getgroups/query',
                  });
              }
        },
    }
};
