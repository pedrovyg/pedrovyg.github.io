import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-[100svh] w-full bg-[#050505] text-white">
      <Header />
      <main className="w-full">
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  );
}
