interface PipeProps {
  x: number;
  height: number;
  isTop?: boolean;
}

export const Pipe = ({ x, height, isTop = true }: PipeProps) => {
  const pipeStyle = {
    left: x,
    height: height,
    ...(isTop ? { top: 0 } : { bottom: 0 }),
  };

  return (
    <div
      className={`absolute w-20 bg-autism-green ${
        isTop ? 'rounded-b-lg' : 'rounded-t-lg'
      }`}
      style={pipeStyle}
    />
  );
};