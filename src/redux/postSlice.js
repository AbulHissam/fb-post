import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});
export const { updatePosts } = postSlice.actions;
export const postsSelector = (state) => state.posts.posts;
export default postSlice.reducer;
