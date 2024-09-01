import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Sphere from "../../public/Sphere";
import Plant1 from "../../public/Immunity_plant/Ashwagandh_GLTF";
import Plant2 from "../../public/Immunity_plant/Astragalus_GLTF";
import Plant3 from "../../public/Immunity_plant/Chaga_GLTF";
import Plant4 from "../../public/Immunity_plant/Cordyceps_GLTF";
import Plant5 from "../../public/Immunity_plant/Echinacea_GLTF";
import Plant6 from "../../public//Immunity_plant/Garlic_GLTF";
import Plant7 from "../../public/Immunity_plant/Maitake_GLTF";
import Plant8 from "../../public/Immunity_plant/Reishi_GLTF";
import Plant9 from "../../public/Immunity_plant/Shiitake_GLTF";
import Plant10 from "../../public/Immunity_plant/Tremella_GLTF";
import Plant11 from "../../public/Immunity_plant/Turmeric_GLTF";
import Earthmodel from "../../public/Earth_realistic_model";
import '../App.css'; 
import { useAuth } from '../Pages/AuthContext';
import axios from 'axios';
import { Link } from "react-router-dom";

function Garden2() {
    const { user, isLoggedIn} = useAuth();
    const earthRadius = 0.85;

    const [popup, setPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [plantModel, setPlantModel] = useState(null);
    const [cameraPosition, setCameraPosition] = useState([0, 0, 2.5]);
    const [searchQuery, setSearchQuery] = useState("");
    const [notePopup, setNotePopup] = useState(false);
    const [noteText, setNoteText] = useState("");

    const convertToCartesian = (radius, theta, phi) => {
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        return [x, y, z];
    };

    const plants = [
        {
            name: "Ashwagandha",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 1, Math.PI / 1), []),
            model: <Plant1 />,
            description: `
                <strong>Scientific Name:</strong> Withania somnifera<br />
                <strong>Common Names:</strong> Indian ginseng, Winter cherry<br />
                <strong>Habitat:</strong> Native to India, Africa, and the Middle East.<br />
                <strong>Medicinal Uses:</strong> Used for stress relief, anxiety reduction, fatigue, joint pain, and diabetes management. It has anti-inflammatory and antioxidant effects and may help improve cognitive function and male fertility.<br />
                <strong>Cultivation:</strong> Prefers well-drained soil and full sun. Grown from seeds or root cuttings, it thrives in warm climates.
            `,
            rotation: [Math.PI / -2, 0, 0],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Astragalus",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI / 4, Math.PI / 2), []),
            model: <Plant2 />,
            description: `
                <strong>Scientific Name:</strong> Astragalus membranaceus<br />
                <strong>Common Names:</strong> Huang Qi<br />
                <strong>Habitat:</strong> Native to China and Mongolia.<br />
                <strong>Medicinal Uses:</strong> Boosts immune function, reduces fatigue, and has anti-inflammatory properties. Used in traditional Chinese medicine for respiratory issues and overall vitality.<br />
                <strong>Cultivation:</strong> Prefers well-drained soil and full sun. Grown from seeds, it requires a temperate climate.
            `,
            rotation: [Math.PI / 2, Math.PI / 4, Math.PI / -2],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Chaga",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 2, Math.PI / 2), []),
            model: <Plant3 />,
            description: `
                <strong>Scientific Name:</strong> Inonotus obliquus<br />
                <strong>Common Names:</strong> Chaga mushroom<br />
                <strong>Habitat:</strong> Grows on birch trees in cold climates, particularly in Northern Europe, Russia, and North America.<br />
                <strong>Medicinal Uses:</strong> Rich in antioxidants, it supports immune health and has anti-inflammatory properties. Used to enhance overall health and well-being.<br />
                <strong>Cultivation:</strong> Typically harvested from wild birch trees; cultivation is complex and requires specific conditions.
            `,
            rotation: [Math.PI / 3, Math.PI / 2, Math.PI / -2],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Cordyceps",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI / 4, Math.PI / 8), []),
            model: <Plant4 />,
            description: `
                <strong>Scientific Name:</strong> Cordyceps sinensis<br />
                <strong>Common Names:</strong> Caterpillar fungus<br />
                <strong>Habitat:</strong> Native to the high-altitude regions of China, Tibet, and Nepal.<br />
                <strong>Medicinal Uses:</strong> Enhances athletic performance, boosts energy, and supports immune function. Known for its potential anti-aging properties.<br />
                <strong>Cultivation:</strong> Grown on specific substrates; requires controlled conditions for optimal growth.
            `,
            rotation: [Math.PI / 2, 0, 0],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Echinacea",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI / -5, Math.PI / -4), []),
            model: <Plant5 />,
            description: `
                <strong>Scientific Name:</strong> Echinacea purpurea<br />
                <strong>Common Names:</strong> Coneflower<br />
                <strong>Habitat:</strong> Native to North America.<br />
                <strong>Medicinal Uses:</strong> Boosts immune function, reduces the duration of colds, and has anti-inflammatory properties.<br />
                <strong>Cultivation:</strong> Prefers well-drained soil and full sun. Can be grown from seeds or transplants and is drought-resistant.
            `,
            rotation: [Math.PI / 2, Math.PI, -0.7],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Garlic",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI / -6, Math.PI / -1.5), []),
            model: <Plant6 />,
            description: `
                <strong>Scientific Name:</strong> Allium sativum<br />
                <strong>Common Names:</strong> Garlic<br />
                <strong>Habitat:</strong> Native to Central Asia.<br />
                <strong>Medicinal Uses:</strong> Supports cardiovascular health, boosts the immune system, and has antimicrobial properties.<br />
                <strong>Cultivation:</strong> Prefers well-drained soil and full sun. Grown from cloves, it requires a temperate climate.
            `,
            rotation: [Math.PI / 2, 0, 2],
            scale: [0.30, 0.30, 0.30],
        },
        {
            name: "Maitake",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI * 3, 5), []),
            model: <Plant7 />,
            description: `
                <strong>Scientific Name:</strong> Grifola frondosa<br />
                <strong>Common Names:</strong> Hen of the woods<br />
                <strong>Habitat:</strong> Native to Japan and North America, typically found at the base of oak trees.<br />
                <strong>Medicinal Uses:</strong> Supports immune function, helps regulate blood sugar levels, and has anti-cancer properties.<br />
                <strong>Cultivation:</strong> Grown on hardwood logs or sawdust-based substrates in controlled environments.
            `,
            rotation: [Math.PI, Math.PI / 6, Math.PI / -2],
            scale: [0.25, 0.25, 0.25],
        },
        {
            name: "Reishi",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI / -2, Math.PI / 4), []),
            model: <Plant8 />,
            description: `
                <strong>Scientific Name:</strong> Ganoderma lucidum<br />
                <strong>Common Names:</strong> Lingzhi mushroom<br />
                <strong>Habitat:</strong> Native to Asia, particularly China and Japan.<br />
                <strong>Medicinal Uses:</strong> Boosts immune function, reduces stress, and has anti-cancer properties. Known as a longevity tonic.<br />
                <strong>Cultivation:</strong> Grown on hardwood logs or sawdust in controlled conditions; requires high humidity.
            `,
            rotation: [Math.PI, Math.PI / -2, Math.PI / 6],
            scale: [0.12, 0.12, 0.12],
        },
        {
            name: "Shiitake",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI / 5, Math.PI / -4), []),
            model: <Plant9 />,
            description: `
                <strong>Scientific Name:</strong> Lentinula edodes<br />
                <strong>Common Names:</strong> Shiitake mushroom<br />
                <strong>Habitat:</strong> Native to East Asia, particularly Japan and China.<br />
                <strong>Medicinal Uses:</strong> Supports immune function, reduces cholesterol, and has anti-cancer properties.<br />
                <strong>Cultivation:</strong> Grown on hardwood logs or sawdust-based substrates; prefers humid conditions.
            `,
            rotation: [Math.PI / 2, Math.PI / 4, -50],
            scale: [0.20, 0.2, 0.2],
        },
        {
            name: "Tremella",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 4, Math.PI / -2), []),
            model: <Plant10 />,
            description: `
                <strong>Scientific Name:</strong> Tremella fuciformis<br />
                <strong>Common Names:</strong> Snow fungus, white fungus<br />
                <strong>Habitat:</strong> Grows on decaying wood in tropical and subtropical regions.<br />
                <strong>Medicinal Uses:</strong> Supports skin health, boosts immune function, and has anti-inflammatory properties.<br />
                <strong>Cultivation:</strong> Grown on specific substrates in controlled environments; requires high humidity.
            `,
            rotation: [Math.PI / 4, Math.PI / 4, -50],
            scale: [0.20, 0.20, 0.20],
        },
    ];
    
    

    const filteredPlants = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    useEffect(() => {
        if (filteredPlants.length > 0) {
            const plant = filteredPlants[0];
            setTitle(plant.name);
            setText(plant.description);
            setPlantModel(plant.model);
            setCameraPosition([plant.position[0], plant.position[1], plant.position[2] - 1.5]); // Adjust camera zoom position
        }
    }, [searchQuery]);
    

    
const checkIfBookmarked = async (plantName) => {
    if (!user || !user.email) {
        alert('User is not logged in or email is missing.');
        return;
    }

    try {
        const response = await axios.get('http://localhost:3000/bookmark', {
            params: { email: user.email }
        });

        const bookmarkedPlants = response.data;
        const isBookmarked = bookmarkedPlants.some(plant => plant.plantname === plantName);
        setIsBookmarked(isBookmarked);
    } catch (error) {
        console.error('Error checking if plant is bookmarked:', error);
        alert('Failed to check if plant is bookmarked.');
    }
};

// Update the handleClick function
const handleClick = async (plantType, model, position) => {
    setTitle(plantType);
    setText(plants.find(plant => plant.name === plantType).description || "Information not available.");
    setPlantModel(model);
    setPopup(true);
    setCameraPosition([position[0], position[1], position[2] - 1.5]); // Adjust camera zoom position

    await checkIfBookmarked(plantType); // Check if the plant is bookmarked
};

    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = async () => {
        if (!user || !user.email) {
            alert('User is not logged in or email is missing.');
            return;
        }
    
        try {
            const plantData = {
                email: user.email, // Assuming user.email exists
                plantname: title,
                description: text,
            };
    
            const response = await axios.post('http://localhost:3000/bookmark', plantData);
            setIsBookmarked(true);
            alert('Plant bookmarked successfully!');
        } catch (error) {
            console.error('Error bookmarking plant:', error);
            alert('Failed to bookmark plant.');
        }
    };    

    const handleAddNote = () => {
        setNotePopup(true);
    };

    const handleSaveNote = () => {
        alert(`Note saved: ${noteText}`);
        setNotePopup(false);
    };

    return (
        <>
            <div className="absolute inset-0 z-10 w-full h-20 bg-gray-800 flex items-center justify-between px-8 shadow-3xl">
                <h1 className="text-3xl font-bold text-white">Plant Model</h1>
                <div className="relative">
                <Link to="/bookmark">
                        <button className="text-lg font-bold mr-5 text-white">Bookmark</button>
                    </Link>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-10 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M12.9 14.32a8 8 0 111.42-1.42l5.38 5.38-1.42 1.42-5.38-5.38zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                    </svg>
                </div>
            </div>
    
            <div className="hero-container w-full h-full md:h-screen flex flex-col md:flex-row pt-20">
                <div className={`w-full h-full ${popup ? 'md:w-8/12' : 'md:w-full'}`}>
                    <Canvas camera={{ position: cameraPosition }}>
                        <ambientLight intensity={2} />
                        <OrbitControls enableZoom={false} />
                        <Suspense fallback={null}>
                            <mesh>
                                <Earthmodel />
                            </mesh>
                            {filteredPlants.map((plant, index) => (
                                <mesh
                                    key={index}
                                    position={plant.position}
                                    rotation={plant.rotation}
                                    scale={plant.scale}
                                    onClick={() => handleClick(plant.name, plant.model, plant.position)}
                                >
                                    {plant.model}
                                </mesh>
                            ))}
                        </Suspense>
                        <Environment preset="forest" />
                        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={50} color={'#000000'} />
                    </Canvas>
                </div>
                <div className={`w-full md:w-4/12 h-full md:h-full bg-gray-500 flex flex-col items-center justify-start p-4 overflow-y-scroll ${popup ? '' : 'hidden'}`}>
            {popup && (
                <>
                    <h2 className="text-xl font-bold mb-4 flex justify-around items-center gap-20 text-white">
                        <div>{title}</div>
                        <div className=" flex gap-5">

                            <button
                                onClick={handleBookmark}
                                className={`py-2 px-4 rounded ${isBookmarked ? 'bg-gray-500' : 'bg-blue-500'} text-white text-sm`}
                                disabled={isBookmarked}
                                >
                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </button>
                            <button
                                onClick={handleAddNote}
                                className="py-2 px-4 rounded bg-green-500 text-white text-sm"
                                >
                                Add Note
                            </button>
                                </div>
                    </h2>
                    <hr />
                    <div className="w-full h-2/3 mb-4">
                        <Canvas camera={{ position: [1, 1, 1] }}>
                            <ambientLight intensity={2} />
                            <directionalLight position={[10, 10, 5]} intensity={1} />
                            <pointLight position={[5, 10, 10]} intensity={1} />
                            <spotLight position={[10, 10, 5]} angle={90} penumbra={1} intensity={1} />
                            <OrbitControls enableZoom={true} />
                            <Suspense fallback={null}>
                                <mesh scale={[0.9, 0.9, 0.9]}>
                                    {plantModel}
                                </mesh>
                            </Suspense>
                        </Canvas>
                    </div>
                    <p className="mb-4 text-white text-lg" dangerouslySetInnerHTML={{ __html: text }}></p>
                    
                </>
            )}
        </div>
            </div>

            {notePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add Note</h2>
                        <textarea
                            className="w-full h-40 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Write your note here..."
                        ></textarea>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="py-2 px-4 rounded bg-gray-500 text-white"
                                onClick={() => setNotePopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="py-2 px-4 rounded bg-green-500 text-white"
                                onClick={handleSaveNote}
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );    
}

export default Garden2;
