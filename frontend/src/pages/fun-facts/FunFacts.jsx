import "./funfacts.css";
import Navbar from "../../components/navbar/Navbar";
import FunFactPost from "./FunFactPost";

const FunFacts = () => {
  return (
    <>
      <Navbar />
      <h1>Fun Facts!</h1>
      <p>Created by dino experts all over Sweden.</p>
      <FunFactPost />
    </>
  );
};

export default FunFacts;
