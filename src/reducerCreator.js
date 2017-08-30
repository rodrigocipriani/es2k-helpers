
const reducerCreator = (initialState, actionsMap) => {
  return (state = initialState, action = {}) => {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  };
};

export default reducerCreator;
