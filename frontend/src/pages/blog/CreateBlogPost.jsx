import { useState } from "react";
import { client } from "../../sanityClient";
import "./blog.css";

function CreateBlogPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Convert the body text to Portable Text format
      const portableTextBody = [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: body
            }
          ]
        }
      ];

      // Create the blog post document in Sanity
      const result = await client.create({
        _type: "post",
        title,
        body: portableTextBody,
        publishedAt: new Date().toISOString(),
      });

      setSubmitStatus({ type: "success", message: "Blog post created successfully!" });
      // Clear the form
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating blog post:", error);
      setSubmitStatus({ 
        type: "error", 
        message: "Failed to create blog post. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-blog-post">
      <h2>Create New Blog Post</h2>
      
      {submitStatus && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Write your blog post content here..."
            rows="10"
          />
          <small className="form-help-text">
            Use plain text for now. Rich text editing coming soon!
          </small>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPost; 