import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NewsDetail from "./components/NewsDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ModifyUserForm from "./pages/ModifyUserForm";
import PaymentStripe from "./pages/PaymentStripe";
import SubscriptionCards from "./pages/SubscriptionCards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/:id/edit" element={<ModifyUserForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/subscription" element={<SubscriptionCards />} />
      <Route path="/payment" element={<PaymentStripe />} />
    </Routes>
  );
}

export default App;