import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName);
  // whenever store will get updated then components subscribed to that store will get rerendered
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
