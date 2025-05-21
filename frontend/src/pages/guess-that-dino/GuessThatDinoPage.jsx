import GuessThatDino from "../../components/game/GuessThatDino";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";

export default function GuessThatDinoPage() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <GuessThatDino />
    </div>
  );
}
