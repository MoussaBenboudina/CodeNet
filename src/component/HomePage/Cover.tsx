"use client";
import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { optionsParticles } from "./particleOptions";
// import Introduction from "../Introduction/Introduction";

const Cover = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <div id="cover-background" className="relative">
      <Particles
        id="tsparticles"
        options={optionsParticles}
      />
      {/* <Introduction /> */}
    </div>
  );
};

export default Cover;
