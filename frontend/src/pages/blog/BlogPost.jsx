import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanityClient";
import "./blog.css";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Comments from "../../components/comments/comments.jsx";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Components for the PortableText renderer
const components = {
  block: {
    // Ex. for styling different text blocks
    normal: ({ children }) => <p className="blog-post-text">{children}</p>,
    h1: ({ children }) => <h1 className="blog-post-heading">{children}</h1>,
    h2: ({ children }) => <h2 className="blog-post-subheading">{children}</h2>,
  },
  marks: {
    // Ex. for styling text marks
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          title,
          body,
          publishedAt,
          "authorName": author->name,
          "authorImage": author->image,
          "categories": categories[]->title,
          _id
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading posts...</h3>;
  if (!posts.length) return <p>No blog posts yet!</p>;

  return (
    <div className="blog-posts-container">
      {posts.map((post) => (
        <article key={post._id} className="blog-post">
          <h1 className="blog-post-title">{post.title}</h1>

          <section className="blog-post-author">
            <p>
              <span style={{ fontWeight: "700" }}> Author: </span>{" "}
              {post.authorName}
            </p>
            {post.authorImage && (
              <img
                className="blog-post-profile-pic"
                src={urlFor(post.authorImage).width(80).url()}
                alt={post.authorName}
                style={{ borderRadius: "1000px" }}
              />
            )}
          </section>

          {post.categories?.length > 0 && (
            <p className="blog-post-category">{post.categories.join(", ")}</p>
          )}

          <div className="blog-post-content">
            <PortableText value={post.body} components={components} />
          </div>

          <div className="blog-post-meta">
            <p className="blog-post-date">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>

          <section className="blog-post-comments">
            <h3>Comments</h3>
            <Comments postId={post._id} />
          </section>
        </article>
      ))}
    </div>
  );
}

export default BlogPost;
