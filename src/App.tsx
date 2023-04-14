import {
    KeyboardControls,
    KeyboardControlsEntry,
} from "@react-three/drei";
import {useMemo, useState} from "react";
import StarSelect from "./StarSelect";

export enum Controls {
  select = 'select',
  left = 'left',
  right = 'right',
}

function App() {

  const [currentStar, setCurrentStar] = useState(0)

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.select, keys: ['Space', 'Enter'] },
  ], [])

  return (
  <KeyboardControls map={map}>
    <div className="App">
        <StarSelect/>
    </div>
  </KeyboardControls>
  )
}

export default App
