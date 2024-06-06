import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useState } from "react";
import { fetchCounterValue } from "./components/ReduxToolkit/CounterSlice";

export const Display = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.counter.status);
  const error = useSelector((state: RootState) => state.counter.error);
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState<number>();

  const handleClick = () => {
    dispatch(fetchCounterValue());
    setIsFetching(true);
    setValue(counterValue);
  };

  let buttonText;
  if (status === "loading") {
    buttonText = "Fetching";
  } else if (status === "failed") {
    buttonText = "retry";
  } else {
    buttonText = "Fetch";
  }

  return (
    <div>
      <h1>{status === "succeeded" && isFetching ? value : ""}</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && <p>Fetch Successful!</p>}
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};
