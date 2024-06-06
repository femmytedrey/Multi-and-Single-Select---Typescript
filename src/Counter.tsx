import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { decrementBy, incrementBy, reset } from "./components/ReduxToolkit/CounterSlice";

const Counter: React.FC = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h3>Counter: {counterValue}</h3>
      <button onClick={() => dispatch(decrementBy(10))}>Decrease by 10</button>
      <button onClick={() => dispatch(decrementBy(5))}>Decrease by 5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(incrementBy(5))}>Increase by 5</button>
      <button onClick={() => dispatch(incrementBy(10))}>Increase by 10</button>
    </>
  );
};

export default Counter;
