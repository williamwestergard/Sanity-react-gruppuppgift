import "./timeperiods.css";
import Navbar from "../../components/navbar/Navbar";

export default function TimePeriod() {
  return (
    <>
      <Navbar />
      <section id="timeline-containers">
        <h1>Time Periods</h1>
        <p>Learn about the three time periods when dinosaurs ruled the Earth – and when they disappeared.</p>


        <section className="time-period">
          <h2>Triassic Period</h2>
          <p>
            The Triassic period lasted from about <strong>252 to 201 million years ago</strong>. After the largest mass extinction in Earth's history, life slowly began to recover. At first, reptiles and amphibians dominated, but it was during the late Triassic that the <strong>first true dinosaurs appeared</strong>. The climate was hot and dry, and all the land on Earth was connected in one massive continent called <strong>Pangaea</strong>. This period ended with another extinction event, which cleared the way for dinosaurs to take over in the next era.
          </p>
        </section>

        <section className="time-period">
          <h2>Jurrasic Period</h2>
          <p>
          The Jurassic period lasted from about <strong>201 to 145 million years ago</strong>. During this time, dinosaurs grew larger and more diverse. Massive plant-eaters like <strong>Brachiosaurus</strong> and <strong>Diplodocus</strong> roamed the forests, while predators like <strong>Allosaurus</strong> hunted them. The supercontinent Pangaea began to break apart, creating new coastlines and environments. The first <strong>birds</strong> also appeared, evolving from small feathered dinosaurs. It was a warm, lush world with plenty of vegetation.
          </p>
        </section>

        <section className="time-period">
          <h2>Cretaceous Period</h2>
          <p>
            The Cretaceous period lasted from about <strong>145 to 66 million years ago</strong>. It was the final chapter of the dinosaur age and saw the rise of many famous dinosaurs like <strong>Tyrannosaurus rex</strong>, <strong>Triceratops</strong>, and <strong>Velociraptor</strong>. Flowering plants appeared for the first time. The continents were drifting into their modern positions. But around 66 million years ago, a huge <strong>asteroid impact</strong> caused a mass extinction that wiped out the dinosaurs.
          </p>
        </section>
      </section>
    </>
  );
}