import API from "./api";

// ============================================================
// GET POSTS
// ============================================================

export const getCommunityPosts = async () => {
  const response = await API.get("/community/posts");
  return response.data;
};

// ============================================================
// CREATE POST
// ============================================================

export const createCommunityPost = async (postData) => {
  const response = await API.post(
    "/community/posts",
    postData
  );

  return response.data;
};

// ============================================================
// LIKE / UNLIKE
// ============================================================

export const toggleCommunityLike = async (postId) => {
  const response = await API.put(
    `/community/posts/${postId}/like`
  );

  return response.data;
};

// ============================================================
// BOOKMARK / UNBOOKMARK
// ============================================================

export const toggleCommunityBookmark = async (postId) => {
  const response = await API.put(
    `/community/posts/${postId}/bookmark`
  );

  return response.data;
};

// ============================================================
// ADD COMMENT
// ============================================================

export const addCommunityComment = async (
  postId,
  text
) => {
  const response = await API.post(
    `/community/posts/${postId}/comments`,
    {
      text,
    }
  );

  return response.data;
};

// ============================================================
// POLL VOTE
// ============================================================

export const voteCommunityPoll = async (
  postId,
  optionIndex
) => {
  const response = await API.post(
    `/community/posts/${postId}/poll/vote`,
    {
      optionIndex,
    }
  );

  return response.data;
};