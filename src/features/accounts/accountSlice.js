//slice file contains reducer code required for accounts related feature and all these reducers are then stored in store.js file

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      //mutating current state
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      //if there are multiple arguments passed then we have to make it one
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice); //check

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//work as Thunk
export function deposit(amount, currency) {
  //we can define action creators in classic redux way also but convention to write type will be "account/deposit" that's how redux will know that this function is an action creator
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
export default accountSlice.reducer;

/*
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
*/
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

/* 
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
*/
