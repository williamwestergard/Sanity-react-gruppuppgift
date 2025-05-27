import "./blog.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import BlogPost from "./BlogPost.jsx";
import CreateBlogPost from "./CreateBlogPost";
import { useState } from "react";

const Blog = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section className="blog-container">
            <section className="blog-header">
              <h1
                style={{
                  fontWeight: "200",
                  textTransform: "uppercase",
                  fontSize: "2rem",
                }}
              >
                Dino <span style={{ fontWeight: "500" }}> Blog </span>
              </h1>
              <button
                className="create-post-toggle"
                onClick={() => setShowCreatePost(!showCreatePost)}
              >
                {showCreatePost ? "Hide Post Form" : "Create New Post"}
              </button>
            </section>

            {showCreatePost && <CreateBlogPost />}

            <BlogPost />
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
