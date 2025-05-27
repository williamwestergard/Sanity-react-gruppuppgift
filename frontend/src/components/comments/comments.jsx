import { useState, useEffect } from "react";
import { client } from "../../sanityClient";
import "./comments.css";

const Comments = ({ postId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Fetch existing comments for this post
    client
      .fetch(
        `*[_type == "comment" && post._ref == $postId] | order(publishedAt desc) {
          _id,
          name,
          comment,
          publishedAt
        }`,
        { postId }
      )
      .then(setComments)
      .catch(console.error);
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create the comment document in Sanity
      const result = await client.create({
        _type: "comment",
        post: {
          _type: "reference",
          _ref: postId
        },
        name,
        comment,
        publishedAt: new Date().toISOString()
      });

      // Add the new comment to the list
      setComments(prev => [{
        _id: result._id,
        name,
        comment,
        publishedAt: new Date().toISOString()
      }, ...prev]);

      setSubmitStatus({ type: "success", message: "Comment posted successfully!" });
      // Clear the form
      setName("");
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to post comment. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comments-section">
      <form className="comments-form-container" onSubmit={handleSubmit}>
        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <input
          className="comments-form-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          className="comments-form-text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <button
          className="comments-form-submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <strong>{comment.name}</strong>
              <span className="comment-date">
                {new Date(comment.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
