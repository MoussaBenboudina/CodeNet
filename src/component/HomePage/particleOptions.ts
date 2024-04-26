export const optionsParticles = {
  fpsLimit: 1220,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        node: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true,
        delay: 30,
      },
    },
    modes: {
      push: {
        default: true,
        groups: [],
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 1,
      },
    },
  },
  particles: {
    color: {
      value: "#6050dc",
    },
    links: {
      color: "#6050dc",
      distance: 220,
      enable: true,
      opacity: 0.7,
      velocityRate: -10,
      opacityRate: 2,
      width: 1.1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: undefined,
      enable: true,
      random: true,
      speed: 1.5,
      straight: true,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 150,
    },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
