//slice file contains reducer code required for accounts related feature and all these reducers are then stored in store.js file

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        ...action.payload,
      };
    case "account/updateName":
      return { ...state, fullName: action.payLoad };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
//we should not create any side effects in reducer hence we are creating createdAt field here only

export function updateName(fullName) {
  return { type: "account/updateName", payLoad: fullName };
}
