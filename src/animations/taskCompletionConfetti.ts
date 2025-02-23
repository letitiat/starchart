import confetti from 'canvas-confetti'

// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }

const getOrigin = (x: number, y: number) => ({
  y: y / window.innerHeight,
  x: x / window.innerWidth
})

export const triggerTaskCompletionConfetti = (x: number, y: number) => {
  getOrigin(x, y);

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.89,
    startVelocity: 10,
    angle: 0,
    origin: getOrigin(x, y)
    // colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: .8,
    shapes: ['star'],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.65,
    shapes: ['circle']
  });

  return (() => {
    setTimeout(triggerTaskCompletionConfetti, 0);
    setTimeout(triggerTaskCompletionConfetti, 100);
  })

}