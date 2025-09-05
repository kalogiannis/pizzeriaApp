

import React from "react";
import hero from "../assets/pizza.png";
import Example from "./Example";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full"
  
      style={{ minHeight: "320px" }}
    >
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[600px] overflow-hidden">
        <img
          src={hero}
          alt="Pizzalicious hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-3xl px-4 text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Pizzalicious — Η πιο νόστιμη πίτσα στην πόλη
            </h1>

            <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-100/95">
              Φτιαγμένη με φρέσκα υλικά, παραδοσιακή ζύμη και αγάπη.
              Παραγγείλετε για παράδοση ή παραλαβή — κάθε μπουκιά μια γιορτή.
            </p>

            <div className="mt-4 flex justify-center">
              <Link
                to="/menu"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-sm"
              >
                Δείτε το Μενού
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Example />
    </section>
  );
};

export default Hero;
