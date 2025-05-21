import DinoRPG from "../../components/game/DinoRPG";
import Navbar from "../../components/navbar/Navbar.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

export default function DinoRPGPage() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <DinoRPG />;
    </div>
  );
}
