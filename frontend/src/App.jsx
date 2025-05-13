import Posts from "./components/posts";
import DidYouKnow from "./components/DidYouKnow";
import "./App.css";

function App() {
  return (
    <>
      <h1>Dinosaurier.com</h1>
      <p>Skapad av dinosaurieexperter runt om i Sverige.</p>

      <Posts />
      <DidYouKnow />
    </>
  );
}

export default App;
