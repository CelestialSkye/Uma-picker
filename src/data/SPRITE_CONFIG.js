// Import your images here so the bundler sees them
import idleSheet from "../assets/sprites/idle.png";
import runSheet from "../assets/sprites/running.png";
import winSheet from "../assets/sprites/winpose.png";
import winSheetLoop from "../assets/sprites/winloop.png";

export const MAMBO_ANIMS = {
  IDLE: {
    file: idleSheet,
    frames: 670,
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
  WINNER: {
    file: winSheet,
    frames: 50,
    cols: 8,
    width: 200,
    height: 200,
    fps: 60,
    loop: false,
  },
  WINNER_LOOP: {
    file: winSheetLoop,
    frames: 50,
    cols: 8,
    width: 200,
    height: 200,
    fps: 60,
    loop: true,
  },
};
