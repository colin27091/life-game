import clsx from "clsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import useMatrix, { ACTIONS } from "../utils/useMatrix"
import { Clear, Pause, Play, Random } from "./Icons"
import SettingModal from "./SettingModal"
import Toolbar, { ToolBarItems } from "./Toolbar"

const Game = () => {

  const x = useMemo(() => Math.floor(window.innerWidth / 10), [])
  const y = useMemo(() => Math.floor(window.innerHeight / 10), [])
  const [matrix, dispatch] = useMatrix(x, y)
  const [running, setRunning] = useState(false)
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
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

  const updateMatrix = useCallback(() => dispatch({ type: ACTIONS.UPDATE_MATRIX }), [dispatch])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (running) {
      updateMatrix()
      intervalId = setInterval(updateMatrix, 100);
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [running, updateMatrix])

  const handleClick = useCallback((x: number, y: number) => {
    if (!running) {
      dispatch({ type: ACTIONS.TOGGLE_CELL, payload: { x, y } })
    }
  }, [running, dispatch])

  const handleRandomize = useCallback(() => {
    dispatch({ type: ACTIONS.RANDOMIZE_MATRIX })
  }, [running, dispatch])

  const handleClear = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_MATRIX })
  }, [running, dispatch])

  const handleSettings = useCallback(() => {
    setIsSettingOpen(true)
    setRunning(false)
  }, [])

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
  }
  // , {
  //   icon: <Setting />,
  //   onClick: handleSettings,
  //   title: 'Settings',
  // }
]

  return (
    <div
      className={clsx('relative w-full', !running && 'cursor-pointer')}>
      <div style={{
        gridTemplateColumns: `repeat(${x}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${y}, minmax(0, 1fr))`
      }} className={`grid`}>
        {matrix.map((row, rowIndex) => {
          return row.map((value, colIndex) => { 
            const shade = (255 - Math.round(value * 255)).toString(16).padStart(2, '0')
            const color = `#${shade}${shade}${shade}`
            return (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                backgroundColor: color,
                borderColor: value ? color : '#d1d5db'
              }}
              className={
                clsx('w-[10px] h-[10px] border-[.1px] text-[.5rem] text-center')}
              key={`${rowIndex}-${colIndex}`}
            />
          )})
        })}
      </div>
      <Toolbar items={toolbar} />
      <SettingModal isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)} />
    </div>
  );
}

export default Game