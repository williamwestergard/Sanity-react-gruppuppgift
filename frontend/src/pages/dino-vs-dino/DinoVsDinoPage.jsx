import DinoVsDino from "../../components/game/DinoVsDino";
import Navbar from "../../components/navbar/Navbar.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

export default function DinoVsDinoPage() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <DinoVsDino />;
    </div>
  );
}
