import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GRAVITY = 0.8;
const JUMP_FORCE = -12;
const PIPE_SPEED = 3;
const PIPE_SPACING = 200;
const PIPE_WIDTH = 80;

interface Pipe {
  x: number;
  height: number;
  passed: boolean;
}

export const FlappyBird = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const gameRef = useRef<number>();
  const pipeRef = useRef<number>();

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setBirdVelocity(JUMP_FORCE);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setBirdPosition(300);
    setBirdVelocity(0);
    setPipes([]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameRef.current = requestAnimationFrame(updateGame);
      pipeRef.current = window.setInterval(createPipe, 3000);
    }
    return () => {
      if (gameRef.current) cancelAnimationFrame(gameRef.current);
      if (pipeRef.current) clearInterval(pipeRef.current);
    };
  }, [gameStarted, gameOver]);

  const createPipe = () => {
    const height = Math.random() * 300 + 100;
    setPipes(pipes => [...pipes, { x: 800, height, passed: false }]);
  };

  const updateGame = () => {
    setBirdPosition(pos => {
      const newPos = pos + birdVelocity;
      if (newPos > 600 || newPos < 0) {
        setGameOver(true);
        return pos;
      }
      return newPos;
    });

    setBirdVelocity(v => v + GRAVITY);

    setPipes(pipes => {
      return pipes
        .map(pipe => ({
          ...pipe,
          x: pipe.x - PIPE_SPEED,
        }))
        .filter(pipe => pipe.x > -PIPE_WIDTH);
    });

    checkCollision();

    if (!gameOver) {
      gameRef.current = requestAnimationFrame(updateGame);
    }
  };

  const checkCollision = () => {
    const bird = {
      left: 100,
      right: 150,
      top: birdPosition,
      bottom: birdPosition + 40,
    };

    pipes.forEach(pipe => {
      if (
        bird.right > pipe.x &&
        bird.left < pipe.x + PIPE_WIDTH &&
        (bird.top < pipe.height || bird.bottom > pipe.height + PIPE_SPACING)
      ) {
        setGameOver(true);
      }

      if (!pipe.passed && bird.left > pipe.x + PIPE_WIDTH) {
        setScore(s => s + 1);
        pipe.passed = true;
      }
    });
  };

  return (
    <div 
      className="relative w-[800px] h-[600px] bg-game-bg overflow-hidden cursor-pointer border-4 border-autism-purple rounded-lg shadow-lg"
      onClick={gameOver ? resetGame : jump}
    >
      {/* Marca d'água */}
      <div className="absolute w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
        <span className="text-6xl font-bold text-autism-blue rotate-[-30deg]">
          Trilha Criativa
        </span>
      </div>

      {/* Pássaro */}
      <motion.div
        className="absolute w-12 h-12 left-24 bg-autism-orange rounded-full"
        style={{
          top: birdPosition,
          transition: 'transform 0.1s',
        }}
        animate={{ rotate: birdVelocity * 2 }}
      >
        <div className="absolute w-4 h-4 right-0 top-4 bg-autism-pink rounded-full" />
        <div className="absolute w-6 h-4 right-[-8px] top-5 bg-autism-pink rounded-tr-full" />
      </motion.div>

      {/* Canos */}
      {pipes.map((pipe, index) => (
        <div key={index}>
          <div
            className="absolute w-20 bg-autism-green rounded-b-lg"
            style={{
              left: pipe.x,
              height: pipe.height,
              top: 0,
            }}
          />
          <div
            className="absolute w-20 bg-autism-green rounded-t-lg"
            style={{
              left: pipe.x,
              top: pipe.height + PIPE_SPACING,
              bottom: 0,
            }}
          />
        </div>
      ))}

      {/* Pontuação */}
      <div className="absolute top-4 left-4 text-4xl font-bold text-autism-purple">
        {score}
      </div>

      {/* Tela inicial */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl mb-4 font-bold">Flappy Bird</h1>
          <p className="text-xl">Pressione espaço ou clique para começar</p>
        </div>
      )}

      {/* Tela de game over */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl mb-4 font-bold">Game Over</h1>
          <p className="text-2xl mb-4">Pontuação: {score}</p>
          <p className="text-xl">Pressione espaço ou clique para jogar novamente</p>
        </div>
      )}
    </div>
  );
};