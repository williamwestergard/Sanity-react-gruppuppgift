import { useState, useEffect } from "react";
import { client } from "../../sanityClient";
import "./blog.css";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function BlogPostCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
    title,
    "slug": slug.current,  // 🔥 FLATTEN slug so it's a string
    "categories": categories[]->title,
    "author": author->name,
    body
  }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (!posts.length) return <h3>Laddar...</h3>;

  return (
    <div className="blog-card-list">
      {posts.map((post) => (
        <Link
          to={`/blog/${post.slug}`}
          key={post.slug}
          className="blog-post-link"
        >
          <section className="blog-post-card">
            <h2 className="blog-card-title">{post.title}</h2>
            <h4 className="blog-card-category">
              {post.categories?.join(", ")}
            </h4>
          </section>
        </Link>
      ))}
    </div>
  );
}

export default BlogPostCard;
