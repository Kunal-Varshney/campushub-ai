import CommunityPost from "../models/CommunityPost.js";

// ============================================================
// GET ALL POSTS
// GET /api/community/posts
// ============================================================

export const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find({
      isApproved: true,
    })
      .populate("author", "-password")
      .populate("comments.user", "-password")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),

      likes: post.likes.length,
      bookmarks: post.bookmarks.length,

      userLiked: post.likes.some(
        (id) => id.toString() === req.user._id.toString()
      ),

      userBookmarked: post.bookmarks.some(
        (id) => id.toString() === req.user._id.toString()
      ),

      commentsCount: post.comments.length,
    }));

    res.status(200).json({
      success: true,
      count: formattedPosts.length,
      posts: formattedPosts,
    });
  } catch (error) {
    console.error("GET COMMUNITY POSTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch community posts",
    });
  }
};


// ============================================================
// CREATE POST
// POST /api/community/posts
// ============================================================

export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      codeSnippet,
      imageUrl,
      poll,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const post = await CommunityPost.create({
      author: req.user._id,

      title: title.trim(),
      content: content.trim(),

      category: category || "general",

      tags: Array.isArray(tags) ? tags : [],

      codeSnippet: codeSnippet || null,

      imageUrl: imageUrl || null,

      poll: poll || null,
    });

    const populatedPost = await CommunityPost.findById(post._id)
      .populate("author", "-password")
      .populate("comments.user", "-password");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: {
        ...populatedPost.toObject(),

        likes: 0,
        bookmarks: 0,

        userLiked: false,
        userBookmarked: false,

        commentsCount: 0,
      },
    });
  } catch (error) {
    console.error("CREATE COMMUNITY POST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};


// ============================================================
// LIKE / UNLIKE POST
// PUT /api/community/posts/:id/like
// ============================================================

export const toggleLike = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      userLiked: !alreadyLiked,
      likes: post.likes.length,
    });
  } catch (error) {
    console.error("TOGGLE LIKE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
};


// ============================================================
// BOOKMARK / UNBOOKMARK POST
// PUT /api/community/posts/:id/bookmark
// ============================================================

export const toggleBookmark = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyBookmarked = post.bookmarks.some(
      (id) => id.toString() === userId
    );

    if (alreadyBookmarked) {
      post.bookmarks = post.bookmarks.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.bookmarks.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      userBookmarked: !alreadyBookmarked,
      bookmarks: post.bookmarks.length,
    });
  } catch (error) {
    console.error("TOGGLE BOOKMARK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update bookmark",
    });
  }
};


// ============================================================
// ADD COMMENT
// POST /api/community/posts/:id/comments
// ============================================================

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.unshift({
      user: req.user._id,
      text: text.trim(),
      likes: 0,
    });

    await post.save();

    const updatedPost = await CommunityPost.findById(post._id)
      .populate("comments.user", "-password");

    const newComment =
      updatedPost.comments[0];

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
      commentsCount: updatedPost.comments.length,
    });
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};


// ============================================================
// VOTE POLL
// POST /api/community/posts/:id/poll/vote
// ============================================================

export const votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;

    if (
      optionIndex === undefined ||
      optionIndex === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Option index is required",
      });
    }

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.poll || !post.poll.options.length) {
      return res.status(400).json({
        success: false,
        message: "This post does not contain a poll",
      });
    }

    if (
      optionIndex < 0 ||
      optionIndex >= post.poll.options.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid poll option",
      });
    }

    post.poll.options[optionIndex].votes += 1;
    post.poll.totalVotes += 1;

    await post.save();

    const totalVotes = post.poll.totalVotes;

    const options = post.poll.options.map((option) => ({
      label: option.label,
      votes: option.votes,
      percentage:
        totalVotes === 0
          ? 0
          : Math.round(
              (option.votes / totalVotes) * 100
            ),
    }));

    res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      poll: {
        question: post.poll.question,
        totalVotes,
        options,
      },
      selectedOption: Number(optionIndex),
    });
  } catch (error) {
    console.error("VOTE POLL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to vote in poll",
    });
  }
};