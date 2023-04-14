import {Canvas} from "@react-three/fiber";
import {Center, Html, meshBounds, useKeyboardControls} from "@react-three/drei";
import PowerStar from "./PowerStar";
import {useEffect, useState} from "react";
import {Controls} from "./App";

export default function StarSelect() {
    const STARS = 6;
    const [currentStar, setCurrentStar] = useState(0)
    const leftPressed = useKeyboardControls<Controls>(state => state.left)
    const rightPressed = useKeyboardControls<Controls>(state => state.right)
    const selectPressed = useKeyboardControls<Controls>(state => state.select)

    useEffect(() => {
        const enter = new Audio("sm64_enter_course.wav")
        enter.play()

        const starSelect = new Audio("star-select.mp3")
        starSelect.play()
    }, [])

    useEffect(() => {
        console.log(leftPressed, rightPressed, selectPressed)
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
            setCurrentStar(-1)
        }
    }, [leftPressed, rightPressed, selectPressed])

    return (
        <Canvas>
            <ambientLight/>
            <Center position-y={2}>
                {Array(STARS).fill(0).map((value, index) => {
                    return <group
                        position-x={1 + index}
                        key={index}>
                        <Html position-y={1}>{index + 1}</Html>
                        <PowerStar
                            raycast={meshBounds}
                            scale={[0.33, 0.33, 0.33]}
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
                <Html style={{position: "static"}}>
                    <br/>
                    SHOOT TO THE ISLAND IN THE SKY<br/>
                    MY SCORE <img src={"coin.png"}/> x 100
                    <br/>
                    <img src={"CourseNumber.png"} style={{width: "50%"}}/><br/>
                    BOB-OMB BATTLEFIELD
                </Html>
            </Center>
        </Canvas>
    )
}