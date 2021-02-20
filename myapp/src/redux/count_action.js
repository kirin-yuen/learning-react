const createIncrementAction = (data) => ({ type: "increment", data });

const createDecrementAction = (data) => ({ type: "decrement", data });

export { createIncrementAction, createDecrementAction };
