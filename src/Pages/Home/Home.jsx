import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import FAQ from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";
import Stats from "../../components/Stats/Stats";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTA from "../../components/CTA/CTA";

function Home() {
  return (
    <div className="bg-slate-950">

      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />  
     

    </div>
  );
}

export default Home;