import "./blog.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import BlogPostCard from "./BlogPostCard.jsx";

const Blog = () => {
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
                Dino <span style={{ fontWeight: "500" }}> Blog </span>{" "}
              </h1>

              <p> Dino content</p>
            </section>

            <BlogPostCard />

            <br />
            <br />
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
