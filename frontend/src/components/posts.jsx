import { useState, useEffect } from "react";
import { client } from "../sanityClient";

function SanityPosts() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && title == "Test"][0]{
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
      <h1> {post.title} </h1>
      <p>Författare: {post.authorName}</p>
      {post.authorImage && (
        <img
          src={urlFor(post.authorImage).width(80).url()}
          alt={post.authorName}
          style={{ borderRadius: "1000px" }}
        />
      )}
      <p>Kategorier: {post.categories?.join(", ")}</p>
      <article style={{ maxWidth: "50%", textAlign: "center", margin: "auto" }}>
        {post.body}
      </article>
    </>
  );
}

export default SanityPosts;
