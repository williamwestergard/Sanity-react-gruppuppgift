import "./didyouknowcard.css";

export default function DidYouKnowCard() {
  return (
    <>
      <section className="did-you-know-card-container">
        <article className="did-you-know-card-info">
          <h2>Did You Know?</h2>
          <p>The Stegosaurus had a brain the size of a walnut. </p>
        </article>
        <article className="did-you-know-card-read-more">
          <button className="did-you-know-card-button">Read more</button>
        </article>
      </section>
    </>
  );
}
