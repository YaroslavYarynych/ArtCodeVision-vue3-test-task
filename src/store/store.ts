import { createStore } from 'vuex';
import { Card } from '../components/utils/types';

export const store = createStore({
  state(): { array: Card[]; initialData: Card[] } {
    return {
      array: [],
      initialData: [],
    };
  },
  mutations: {
    set(state, payload: Card[]) {
      (state.array = [...payload]), (state.initialData = [...payload]);
    },

    get(state) {
      state.array;
    },
    delete(state, payload: number) {
      state.array = state.array.filter((item) => item.id !== +payload);
    },
    create(state, payload: Card) {
      state.array.unshift(payload);
    },
    update(state, payload: Card) {
      state.array = state.array.map((item) => {
        if (item.id === +payload.id) {
          return {
            ...item,
            ...payload,
          };
        } else {
          return item;
        }
      });
    },
  },
});
