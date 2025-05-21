import { useState, useEffect } from "react";
import { client } from "../../sanityClient";
import "./blog.css";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function BlogPost() {
  const [post, setPost] = useState(null);

  client
    .fetch(
      `*[_type == "post" && title == "test 3"][0]{
        title,
        body,
        "authorName": author->name,
        "authorImage": author->image,
        "categories": categories[]->title
      }`
    )
    .then((data) => {
      console.log(data);
      setPost(data);
    });

  if (!post) return <h3>Laddar...</h3>;

  return (
    <>
      <h1 className="blog-post-title">{post.title}</h1>
      <section className="blog-post-author">
        <p>
          <span style={{ fontWeight: "700" }}> Author: </span> {post.authorName}
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
      <p className="blog-post-category">{post.categories?.join(", ")}</p>

      <article style={{ maxWidth: "60%", textAlign: "center", margin: "auto" }}>
        <p className="blog-post-text" style={{ whiteSpace: "pre-line" }}>
          {post.body}
        </p>
      </article>
    </>
  );
}

export default BlogPost;
