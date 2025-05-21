import { useState, useEffect } from "react";
import { client } from "../../sanityClient";
import "./blog.css";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function BlogPostCard() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && title == "How Factually Correct is Jurassic Park?"][0]{
          title,
          body,
          "authorName": author->name,
          "authorImage": author->image,
          "categories": categories[]->title
        }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  if (!post) return <h3>Laddar...</h3>;

  return (
    <>
      <section className="blog-post-card">
        <h2 className="blog-post-card-title">{post.title}</h2>
      </section>
    </>
  );
}

export default BlogPostCard;
