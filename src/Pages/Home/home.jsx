import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import headerImg from "../../assets/images/header.png";
import { Button } from "../../components/ui/button";
import aboutImg from "../../assets/images/about.svg";
import { scrollToSection } from "../../assets/home";
import { Link } from "react-router-dom";
import WordPullUp from "../../components/ui/word-pull-up";

const scrollToAbout = () => scrollToSection("about");

export default function Home() {
  const [isWord1Visible, setWord1Visible] = useState(false);
  const [isWord2Visible, setWord2Visible] = useState(false);
  const [isWord3Visible, setWord3Visible] = useState(false);

  useEffect(() => {
    const delays = [0, 1100, 1800]; // Délais en millisecondes

    const timeouts = [
      setTimeout(() => setWord1Visible(true), delays[0]),
      setTimeout(() => setWord2Visible(true), delays[1]),
      setTimeout(() => setWord3Visible(true), delays[2]),
    ];

    // Nettoyer les timeouts
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#e6f2ff] to-white py-12 md:py-20 lg:py-28">
      <header>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-8 md:gap-12">
          <div className="space-y-4 md:text-left flex flex-col max-w-screen-lg">
            <h1 className="flex flex-col items-start text-left text-xl font-bold text-[#272643] sm:text-2xl md:text-3xl lg:text-4xl font-serif capitalize">
              {isWord1Visible && (
                <WordPullUp words="Streamline Health Insurance for Everyone." />
              )}
              {isWord2Visible && (
                <WordPullUp words="One Platform." />
              )}
              {isWord3Visible && (
                <WordPullUp words="Endless Benefits."  />
              )}
            </h1>
            <p className="max-w-[600px] text-lg text-[#272643] md:text-xl font-serif">
              Simplify health insurance benefits management for insurers, companies, doctors, patients, and pharmacies with our innovative SaaS solution.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button className="transition-colors duration-300 hover:bg-[#1e2a78] hover:text-white bg-whitesmoke font-serif" variant="secondary">
                <Link to="signup">Sign Up</Link>
              </Button>
              <Button variant="primary" className="bg-[#000000] text-white font-serif" onClick={scrollToAbout}>
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              alt="Header Image"
              className="w-full max-w-[400px] mx-auto md:max-w-none rounded-lg"
              height={400}
              src={headerImg}
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
              width={600}
            />
          </div>
        </div>
      </header>
      <section id="about" className="w-full mt-[200px]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-8 md:gap-12">
          <div className="flex-1">
            <img
              alt="About Us Image"
              className="w-full max-w-[400px] mx-auto md:max-w-none rounded-lg"
              height={400}
              src={aboutImg}
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
              width={600}
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#272643] sm:text-4xl md:text-5xl lg:text-6xl font-serif capitalize">
              About AssurConnect
            </h2>
            <p className="max-w-[600px] text-lg text-[#272643] md:text-xl font-serif">
              Acme Inc is a leading provider of innovative products and services for businesses of all sizes. Our mission is to empower our customers with the tools and solutions they need to succeed in today's competitive landscape.
            </p>
            <p className="max-w-[600px] text-lg text-[#272643] md:text-xl font-serif">
              With years of industry experience and a commitment to excellence, we strive to deliver exceptional value to our clients. Our team of dedicated professionals works tirelessly to understand your unique needs and provide tailored solutions that drive your business forward.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button variant="primary">Learn More</Button>
              <Button variant="secondary">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
