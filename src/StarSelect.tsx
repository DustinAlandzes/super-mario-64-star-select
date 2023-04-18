import {Canvas} from "@react-three/fiber";
import {Html, meshBounds, useKeyboardControls} from "@react-three/drei";
import PowerStar from "./PowerStar";
import {useEffect, useState} from "react";
import {Controls} from "./App";

export default function StarSelect() {
    const STARS = 6;
    const [currentStar, setCurrentStar] = useState(0)
    const leftPressed = useKeyboardControls<Controls>(state => state.left)
    const rightPressed = useKeyboardControls<Controls>(state => state.right)
    const selectPressed = useKeyboardControls<Controls>(state => state.select)
    const STAR_NAMES = [
        "Big Bob-omb on the Summit",
        "Footrace with Koopa the Quick",
        "Shoot to the Island in the Sky",
        "Find the 8 Red Coins",
        "Mario Wings to the Sky",
        "Behind Chain Chomp’s Gate",
    ];
    useEffect(() => {
        const enter = new Audio("sm64_enter_course.wav")
        enter.play()

        const starSelect = new Audio("star-select.mp3")
        starSelect.play()
    }, [])

    useEffect(() => {
        if (leftPressed) {
            setCurrentStar((prevState) => {
                if (prevState > 0) {
                    return prevState - 1
                } else {
                    return prevState
                }
            })
        } else if (rightPressed) {
            setCurrentStar((prevState) => {
                if (prevState < STARS - 1) {
                    return prevState + 1
                } else {
                    return prevState
                }
            })
        } else if (selectPressed) {
            const letsago = new Audio("Let's-a go!.mp3")
            letsago.play()
            //setCurrentStar(-1)
        }
    }, [leftPressed, rightPressed, selectPressed])

    return (
        <>
        <Canvas orthographic={true} id={"starSelect"} camera={{zoom: 20}}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <group position-x={-10}>
            {Array(STARS).fill(0).map((value, index) => {
                return <group
                    position-y={-1}
                    position-x={index * 5}
                    key={index}>
                    <Html position-y={3.5} position-x={-0.3}>{index + 1}</Html>
                    <PowerStar
                        raycast={meshBounds}
                        active={currentStar === index}
                        onPointerDown={() => setCurrentStar(index)}
                        onPointerOver={() => setCurrentStar(index)}
                        onPointerEnter={() => {
                            document.body.style.cursor = 'pointer'
                        }}
                        onPointerLeave={() => {
                            document.body.style.cursor = 'default'
                        }}

                    />
                </group>
            })}
            </group>
        </Canvas>
            <div style={{textAlign: "center"}}>{STAR_NAMES[currentStar].toUpperCase()}</div>
            </>
    )
}