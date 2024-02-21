import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Clear, Pause, Play, Random } from "./components/Icons"
import Toolbar, { ToolBarItems } from "./components/Toolbar"
import useMatrix, { ACTIONS } from "./utils/useMatrix"

const App = () => {

  const x = useMemo(() => Math.floor(window.innerWidth / 10), [])
  const y = useMemo(() => Math.floor(window.innerHeight / 10), [])
  const [matrix, dispatch] = useMatrix(x, y)
  const [running, setRunning] = useState(false)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === ' ') {
        setRunning(!running);
      }
    },
    [running]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const updateMatrix = () => dispatch({ type: ACTIONS.UPDATE_MATRIX })

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (running) {
      updateMatrix()
      intervalId = setInterval(updateMatrix, 100);
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [running])

  const handleClick = useCallback((x: number, y: number) => {
    if (!running) {
      dispatch({ type: ACTIONS.TOGGLE_CELL, payload: { x, y } })
    }
  }, [running, dispatch])

  const handleRandomize = useCallback(() => {
    if (!running) {
      dispatch({ type: ACTIONS.RANDOMIZE_MATRIX })
    }
  }, [running, dispatch])

  const handleClear = useCallback(() => {
    if (!running) {
      dispatch({ type: ACTIONS.CLEAR_MATRIX })
    }
  }, [running, dispatch])

  const toolbar: ToolBarItems = [{
    icon: running ? <Pause /> : <Play />,
    onClick: () => setRunning(!running),
    title: running ? 'Pause' : 'Play'
  }, {
    icon: <Random />,
    onClick: handleRandomize,
    title: 'Randomize'
  }, {
    icon: <Clear />,
    onClick: handleClear,
    title: 'Clear'
  }]

  return (
    <div
      className={clsx('relative w-max', !running && 'cursor-pointer')}>
      <div style={{
        gridTemplateColumns: `repeat(${x}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${y}, minmax(0, 1fr))`
      }} className={`grid`}>
        {matrix.map((row, rowIndex) => {
          return row.map((value, colIndex) => (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              className={
                clsx('w-[10px] h-[10px] border-[.1px]'
                  , value ? 'bg-black border-black' : 'border-gray-300')}
              key={`${rowIndex}-${colIndex}`}
            />
          ))
        })}
      </div>
      <Toolbar items={toolbar} />
    </div>
  );
}

export default App;
