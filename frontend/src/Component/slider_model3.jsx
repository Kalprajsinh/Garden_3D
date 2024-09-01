import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Sphere from "../../public/Sphere";
import Plant1 from "../../public/Plant_model/Anise_GLTF";
import Plant2 from "../../public/Plant_model/Caraway_GLTF";
import Plant3 from "../../public/Plant_model/Chamomile_GLTF";
import Plant4 from "../../public/Plant_model/Coriander_GLTF";
import Plant5 from "../../public/Plant_model/Fennel_Plant_GLTF";
import Plant6 from "../../public/Plant_model/Ginger_Plant_GLTF";
import Plant7 from "../../public/Plant_model/Cardamom_GLTF";
import Plant8 from "../../public/Plant_model/Cumin_GLTF";
import Plant9 from "../../public/Plant_model/Licorice_GLTF";
import Plant10 from "../../public/Plant_model/Peppermint_GLTF";
import Earthmodel from "../../public/Earth_realistic_model";
import '../App.css';  // Import the CSS file
import { useNavigate } from "react-router-dom";

function Slider_Model1() {
    const earthRadius = 0.85;

    const [plantModel, setPlantModel] = useState(null);
    const [cameraPosition, setCameraPosition] = useState([0, 0, 2.5]);

    const convertToCartesian = (radius, theta, phi) => {
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        return [x, y, z];
    };

    const plants = [
        {
            name: "Anise",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 1, Math.PI / 1), []),
            model: <Plant1 />,
            description: "Anise description...",
            rotation: [Math.PI / -2, 0, 0],
        },
        {
            name: "Caraway",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI/4, Math.PI / 2), []),
            model: <Plant2 />,
            description: "Caraway description...",
            rotation: [Math.PI / 2, Math.PI / 4, Math.PI / -2],
        },
        {
            name: "Aloe vera",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 2, Math.PI / 2), []),
            model: <Plant3 />,
            description: "Aloe vera description...",
            rotation: [Math.PI / 3, Math.PI / 2, Math.PI / -2],
        },
        {
            name: "Neem Tree",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 4, Math.PI / 8), []),
            model: <Plant4 />,
            description: "Neem Tree description...",
            rotation: [Math.PI / 2, 0, 0],
        },
        {
            name: "kcj asm Plant wv efsd",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/-5, Math.PI / -4), []),
            model: <Plant5 />,
            description: "Ginger Plant description...",
            rotation: [Math.PI/2, Math.PI, -0.7],
        },
        {
            name: "Ginger Plant",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/-6, Math.PI/-1.5), []),
            model: <Plant6 />,
            description: "Ginger Plant description...",
            rotation: [Math.PI/2, 0, 2],
        },
        {
            name: "kcj asm Plant wevfwa",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI*3, 5), []),
            model: <Plant7 />,
            description: "Ginger Plant description...",
            rotation: [Math.PI, Math.PI/6, Math.PI/2],
        },
        {
            name: "kcj asm Plant",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI/-2, Math.PI / 4), []),
            model: <Plant8 />,
            description: "Ginger Plant description...",
            rotation: [Math.PI, Math.PI/-2, Math.PI/6],
        },
        {
            name: "Plant evsf",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/2, Math.PI/-4), []),
            model: <Plant9 />,
            description: "Ginger Plant description...",
            rotation: [Math.PI/3, Math.PI/2, 0],
        },
        {
            name: "kcj asm Plant vwfe",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI/4, Math.PI/-2 ), []),
            model: <Plant10 />,
            description: "Ginger Plant description...",
            rotation: [60, 0, Math.PI/4],
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="hero-container w-full h-5/6">
            <Canvas camera={{ position: cameraPosition }}>
                <ambientLight intensity={2} />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <mesh
                    onClick={() =>{
                        navigate("/Garden");
                    }}
                    >
                        <Earthmodel />
                    </mesh>
                    {plants.map((plant, index) => (
                <mesh
                    key={index}
                    position={plant.position}
                    rotation={plant.rotation}
                    scale={[0.25, 0.25, 0.25]}
                >
                    {plant.model}
                </mesh>
            ))}
                </Suspense>
                <Environment preset="forest" />
                <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={10} color={'#000000'} />
            </Canvas>
            <div className="ml-2 w-full flex justify-center items-center font-bold text-lg">
                    Skin Care
                </div>
        </div>
    );
}

export default Slider_Model1;