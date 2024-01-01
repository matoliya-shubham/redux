//slice file contains reducer code required for accounts related feature and all these reducers are then stored in store.js file

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

//note: this whole code was in store.js previously
// 1st method By creating store (which is now deprecated)
/*
store.dispatch({ type: "account/deposite", payload: 500 });
console.log(store.getState());  will console {
  balance: 500,
  loan: 0,
  loanPurpose: "",
}
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState()); will console {
  balance: 300,
  loan: 0,
  loanPurpose: "",
}
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState()); will console {
  balance: 1300,
  loan: 1000,
  loanPurpose: "Buy a car",
}
store.dispatch({
  type: "account/payLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState()); will console {
  balance: 300,
  loan: 0,
  loanPurpose: "",
}
*/
//import ./store where we want to see this console
// we will create separate functions for each dispatcher

//2nd method (By action creator functions)
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //if we return a function instead of an object then redux knows that it is the async action that we want to execute before dispatching anything to the store
  return async function (dispatch, getState) {
    //API CALL
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
    //return action
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
