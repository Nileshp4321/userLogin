import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
    },
    reducers: {
      setUser: (state,actions) => {
            state.user=actions.payload
            console.log(state.user)
      },
    },
  })
  export const { setUser } = userSlice.actions
  export default userSlice.reducer;