import { useState } from "react";
import { Select, SelectedOption } from "./Select";
import Counter from "./Counter";
import { Provider } from "react-redux";
import { store } from "./store";
import { Display } from "./display";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];
function App() {
  const [value1, setValue1] = useState<SelectedOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectedOption | undefined>(options[0]);
  return (
    <Provider store={store}>
      <div>
        <Select
          multiple
          options={options}
          value={value1}
          onchange={(o) => setValue1(o)}
        />
        <Select
          options={options}
          value={value2}
          onchange={(o) => setValue2(o)}
        />
        <h1>This is a redux setup</h1>
        <Counter />

        <h2>Display from another component</h2>
        <Display />
      </div>
    </Provider>
  );
}

export default App;
