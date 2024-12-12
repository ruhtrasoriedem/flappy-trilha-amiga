import { motion } from 'framer-motion';

interface BirdProps {
  position: number;
  velocity: number;
}

export const Bird = ({ position, velocity }: BirdProps) => {
  return (
    <motion.div
      className="absolute w-12 h-12 left-24"
      style={{
        top: position,
        transition: 'none',
      }}
      animate={{ rotate: velocity * 2 }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 360 360"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <g transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)" fill="#F2994A" stroke="none">
          <path d="M1460 2560 l0 -70 -140 0 -140 0 0 -70 0 -70 -70 0 -70 0 0 -71 0 -70 -67 2 -68 3 -3 -67 -3 -67 -64 0 -65 0 0 -210 0 -210 -70 0 -70 0 0 -210 0 -210 70 0 70 0 0 -70 0 -70 275 0 275 0 0 -70 0 -70 346 2 345 3 4 67 4 68 -350 0 -349 0 0 140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -280 0 -281 0 3 138 3 137 68 3 67 3 0 64 0 65 70 0 70 0 0 70 0 70 140 0 140 0 0 70 0 70 210 0 210 0 0 -70 0 -70 -70 0 -70 0 0 -205 0 -205 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 70 0 71 0 -2 -58 c-1 -31 -1 -63 0 -69 1 -10 77 -13 346 -13 l345 0 0 70 0 70 70 0 70 0 0 140 0 140 70 0 70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 205 0 205 -70 0 -70 0 0 -205 0 -205 -275 0 -274 0 -3 68 -3 67 -67 3 -68 3 0 204 0 204 67 3 67 3 -3 68 -2 67 140 0 140 0 3 -67 3 -68 68 -3 67 -3 0 -70 0 -70 68 3 67 3 3 68 3 67 -71 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -415 0 -415 0 0 -70z m0 -970 l0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -205 0 -204 0 -3 206 c-2 113 -1 208 1 210 2 2 159 4 348 4 l343 0 0 -70z" />
          <path d="M2294 2211 c-2 -2 -4 -64 -4 -138 l0 -133 70 0 70 0 0 135 c0 101 -3 135 -12 136 -47 3 -120 3 -124 0z" />
        </g>
      </svg>
    </motion.div>
  );
};