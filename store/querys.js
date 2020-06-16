export const state = () => ({
  list: [],
  counter: 0
});

export const mutations = {
  add(state, text) {
    state.counter++;
    state.list.push({
      id: state.counter,
      text,
      done: false
    });
  },

  remove(state, query) {
    state.list.splice(state.list.indexOf(query), 1);
  },

  toggle(state, query) {
    query.done = !query.done;
  }
};
