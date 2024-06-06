import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: CounterState = {
  value: 25,
  status: "idle",
  error: null,
};

const fetchCounterValue = createAsyncThunk<number, void, { state: RootState }> (
  "counter/fetchValue",
  async (_, { getState }) => {
    const { value } = getState().counter;
    const response = await new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: value }), 1000)
    );
    return response.data;
  }
);


const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = initialState.value;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementBy: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounterValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCounterValue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchCounterValue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { reset, incrementBy, decrementBy } = counterSlice.actions;
export { fetchCounterValue };
export default counterSlice.reducer;
