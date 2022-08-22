import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import NewsContainer from "../components/NewsContainer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Slider />
      <NewsContainer />
      <Footer />
    </div>
  )
}