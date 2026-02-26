// Import your images here so the bundler sees them
import idleSheet from "../assets/sprites/idle.png";
import runSheet from "../assets/sprites/running.png";
// import winSheet from "../assets/sprites/winner.png";

export const MAMBO_ANIMS = {
  IDLE: {
    file: idleSheet,
    frames: 702,
    cols: 27,
    width: 200,
    height: 200,
    fps: 60,
    loop: true,
  },
  RUNNING: {
    file: runSheet,
    frames: 36,
    cols: 6,
    width: 200,
    height: 200,
    fps: 60,
    loop: true,
  },
  // WINNER: {
  //   file: winSheet,
  //   frames: 60,
  //   cols: 8,
  //   width: 300,
  //   height: 300,
  //   fps: 20,
  //   loop: false,
  // },
};
