import {KeyboardControls, KeyboardControlsEntry} from "@react-three/drei";
import {useMemo, useState} from "react";
import StarSelect from "./StarSelect";
import PowerStar from "./PowerStar";
import {Canvas, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import CourseNumber from "./CourseNumber.png"

export enum Controls {
    select = 'select',
    left = 'left',
    right = 'right',
}

function App() {

    const [currentStar, setCurrentStar] = useState(0)

    const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
        {name: Controls.left, keys: ['ArrowLeft', 'KeyA']},
        {name: Controls.right, keys: ['ArrowRight', 'KeyD']},
        {name: Controls.select, keys: ['Space', 'Enter']},
    ], [])

    const texture = useLoader(TextureLoader, CourseNumber)

    return (
        <KeyboardControls map={map}>
            <div className="App">
                <StarSelect/>
                <div style={{textAlign: "center", marginTop: "1em"}}>
                    MY SCORE <img src={"coin.png"}/>
                    <span className={"blockText notCoins"}>x</span>
                    <span className={"blockText coins"} style={{letterSpacing: "-3px !important"}}>100</span>
                    <span id={"singleStar"}>
                        <Canvas orthographic={true} camera={{zoom: 15}}>
                                <ambientLight/>
                            <PowerStar active={true}/>
                        </Canvas>
                    </span>
                </div>
                <center>
                    <img src={"CourseNumber.png"} style={{width: "5em", marginLeft: "auto", marginRight: "auto"}}/>
                    <span style={{position: "absolute", left: 0, right: 0, marginTop: "2em"}}
                          className={"blockText coins"}>1</span>
                </center>
                <div style={{textAlign: "center"}}>BOB-OMB BATTLEFIELD</div>
            </div>
        </KeyboardControls>
    )
}

export default App
