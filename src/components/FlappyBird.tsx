import { useEffect, useRef, useState } from 'react';
import { Bird } from './Bird';
import { Pipe } from './Pipe';

const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const PIPE_SPEED = 3;
const PIPE_SPACING = 200;
const PIPE_WIDTH = 80;

interface PipeData {
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
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const gameRef = useRef<number>();

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
    }
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
      if (pipes.length === 0) {
        const height = Math.random() * 300 + 100;
        setPipes([{ x: 800, height, passed: false }]);
      }

      const gameLoop = () => {
        setBirdPosition((pos) => {
          const newPos = pos + birdVelocity;
          if (newPos > 600 || newPos < 0) {
            setGameOver(true);
            return pos;
          }
          return newPos;
        });

        setBirdVelocity(v => v + GRAVITY);

        setPipes(currentPipes => {
          if (currentPipes[currentPipes.length - 1]?.x < 400 && currentPipes.length < 3) {
            const height = Math.random() * 300 + 100;
            return [...currentPipes, { x: 800, height, passed: false }];
          }
          return currentPipes;
        });

        setPipes(currentPipes => {
          return currentPipes
            .map(pipe => ({
              ...pipe,
              x: pipe.x - PIPE_SPEED,
            }))
            .filter(pipe => pipe.x > -PIPE_WIDTH);
        });

        // Verificar colisões
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

      gameRef.current = requestAnimationFrame(function animate() {
        gameLoop();
        if (!gameOver) {
          gameRef.current = requestAnimationFrame(animate);
        }
      });

      return () => {
        if (gameRef.current) {
          cancelAnimationFrame(gameRef.current);
        }
      };
    }
  }, [gameStarted, gameOver, birdVelocity, pipes]);

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
      <Bird position={birdPosition} velocity={birdVelocity} />

      {/* Canos */}
      {pipes.map((pipe, index) => (
        <div key={index}>
          <Pipe x={pipe.x} height={pipe.height} isTop={true} />
          <Pipe x={pipe.x} height={600 - pipe.height - PIPE_SPACING} isTop={false} />
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