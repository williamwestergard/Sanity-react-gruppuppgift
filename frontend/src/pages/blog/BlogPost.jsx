import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanityClient";
import { PortableText } from "@portabletext/react";
import "./blog.css";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          body,
          "authorName": author->name,
          "authorImage": author->image,
          "categories": categories[]->title
        }`,
        { slug }
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  if (!post) return <h3>Laddar...</h3>;

  return (
    <>
      <h1 className="blog-post-title">{post.title}</h1>
      <section className="blog-post-author">
        <p>
          <span style={{ fontWeight: "700" }}>Author:</span> {post.authorName}
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

      <article
        className="blog-post-text"
        style={{ maxWidth: "60%", textAlign: "left" }}
      >
        <PortableText value={post.body} />
      </article>
    </>
  );
}

export default BlogPost;
