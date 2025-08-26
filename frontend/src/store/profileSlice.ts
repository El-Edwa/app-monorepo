import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [] as any[],
  likedPosts: [] as any[],
  media: [] as any[],
  replies: [] as any[],
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPosts(state, action) {
      const newPosts = [...state.posts, ...action.payload];
      state.posts = newPosts;
    },
    removePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setLikedPosts(state, action) {
      const newLikedPosts = [...state.likedPosts, ...action.payload];
      state.likedPosts = newLikedPosts;
    },

    removeLikedPost(state, action) {
      state.likedPosts = state.likedPosts.filter(
        (post) => post.id !== action.payload
      );
    },
    setMedia(state, action) {
      const newMedia = [...state.media, ...action.payload];
      state.media = newMedia;
    },
    removeMedia(state, action) {
      state.media = state.media.filter((media) => media.id !== action.payload);
    },
    setReplies(state, action) {
      const newReplies = [...state.replies, ...action.payload];
      state.replies = newReplies;
    },
    removeReply(state, action) {
      state.replies = state.replies.filter(
        (reply) => reply.id !== action.payload
      );
    },
  },
});
export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
