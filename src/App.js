import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";

function App() {
  const customer = useSelector((store) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customer === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;

// redux-thunk is a middleware package used as a middleware for redux. In reducers we don't handle any async calls, hence we call async function either in component itself and send results to reducers as payload or we can modify the data in middleware before sending in reducers.

//redux-toolkit (code in branch redux-toolkit)
/*
  it is modern and preferred way of writing redux code.
  it forces us to use redux best practices
  it is 100% compatible with classic redux and we can use them both together
  it allows us to write less code to achieve same results

  main 3 things:
  1. we can write code that 'mutates' state inside reducers (will be converted to immutable logic behind the scenes by 'Immer' library)
  2. action creators are automatically created
  3. automatic setup of thunk middleware and devTools
*/
