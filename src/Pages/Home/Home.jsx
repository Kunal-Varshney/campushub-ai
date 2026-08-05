import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import FAQ from "../../components/FAQ/FAQ";
import Stats from "../../components/Stats/Stats";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTA from "../../components/CTA/CTA";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>

  );
}

export default Home;