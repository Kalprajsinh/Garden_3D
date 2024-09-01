import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
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
import '../App.css'; 
import { useAuth } from '../Pages/AuthContext';
import axios from 'axios';
import { Link } from "react-router-dom";

function Hero() {
    const { user, isLoggedIn } = useAuth();
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
            name: "Anise",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 1, Math.PI / 1), []),
            model: <Plant1 />,
            description: "<strong>Scientific Name:</strong> Pimpinella anisum<br/><strong>Habitat:</strong> Native to the eastern Mediterranean region and Southwest Asia.<br/><strong>Medicinal Uses:</strong> Relieves digestive issues, reduces gas, and improves appetite. It is also known for its calming effects and can help with respiratory conditions.<br/><strong>Cultivation:</strong> Prefers well-drained soil with a pH of 6.0 to 7.0 and full sun. Anise can be grown from seeds and requires a warm growing season of at least 120 frost-free days.",
            rotation: [Math.PI / -2, 0, 0],
        },
        {
            name: "Caraway",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI/4, Math.PI / 2), []),
            model: <Plant2 />,
            description: "<strong>Scientific Name:</strong> Carum carvi<br/><strong>Habitat:</strong> Native to Europe and Western Asia.<br/><strong>Medicinal Uses:</strong> Aids digestion, relieves bloating, and reduces gas. It is also used to stimulate appetite and has anti-inflammatory properties.<br/><strong>Cultivation:</strong> Prefers well-drained soil and full sun; can be grown from seeds. Caraway requires a temperate climate and a growing season of about 90 to 100 days.",
            rotation: [Math.PI / 2, Math.PI / 4, Math.PI / -2],
        },
        {
            name: "Chamomile",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 2, Math.PI / 2), []),
            model: <Plant3 />,
            description: "<strong>Scientific Name:</strong> Matricaria chamomilla<br/><strong>Habitat:</strong> Native to Europe and Western Asia.<br/><strong>Medicinal Uses:</strong> Soothes digestive issues, reduces inflammation, and promotes relaxation. Chamomile is often used as a tea to help with sleep and anxiety.<br/><strong>Cultivation:</strong> Grows well in well-drained soil and prefers full sun. Chamomile can be grown from seeds and is tolerant of various soil types.",
            rotation: [Math.PI / 3, Math.PI / 2, Math.PI / -2],
        },
        {
            name: "Coriander",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI / 4, Math.PI / 8), []),
            model: <Plant4 />,
            description: "<strong>Scientific Name:</strong> Coriandrum sativum<br/><strong>Habitat:</strong> Native to Southern Europe and Western Asia.<br/><strong>Medicinal Uses:</strong> Aids digestion, reduces bloating, and has anti-inflammatory properties. The seeds are also used for their antioxidant effects.<br/><strong>Cultivation:</strong> Grows well in well-drained soil and prefers full sun. Coriander can be grown from seeds and thrives in cooler weather.",
            rotation: [Math.PI / 2, 0, 0],
        },
        {
            name: "Fennel",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/-5, Math.PI / -4), []),
            model: <Plant5 />,
            description: "<strong>Scientific Name:</strong> Foeniculum vulgare<br/><strong>Habitat:</strong> Native to the Mediterranean region.<br/><strong>Medicinal Uses:</strong> Reduces bloating, gas, and digestive discomfort. Fennel is also known for its anti-inflammatory and antioxidant properties.<br/><strong>Cultivation:</strong> Prefers full sun and well-drained soil; can be grown from seeds. Fennel requires a warm growing season and can be sensitive to frost.",
            rotation: [Math.PI / 2, Math.PI, -0.7],
        },
        {
            name: "Ginger",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/-6, Math.PI/-1.5), []),
            model: <Plant6 />,
            description: "<strong>Scientific Name:</strong> Zingiber officinale<br/><strong>Habitat:</strong> Native to Southeast Asia.<br/><strong>Medicinal Uses:</strong> Reduces inflammation, improves blood circulation, and has anti-nausea properties. Ginger is commonly used to alleviate digestive issues and motion sickness.<br/><strong>Cultivation:</strong> Thrives in warm, humid climates and requires rich, well-drained soil. Ginger is typically grown from rhizomes rather than seeds.",
            rotation: [Math.PI / 2, 0, 2],
        },
        {
            name: "Cardamom",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI*3, 5), []),
            model: <Plant7 />,
            description: "<strong>Scientific Name:</strong> Elettaria cardamomum<br/><strong>Habitat:</strong> Native to the Western Ghats of Southern India.<br/><strong>Medicinal Uses:</strong> Aids digestion, reduces gas, and has anti-inflammatory properties. Cardamom is also known for its antioxidant effects and can help with respiratory issues.<br/><strong>Cultivation:</strong> Thrives in warm, humid climates and requires rich, well-drained soil. Cardamom is typically grown in shaded areas under taller plants.",
            rotation: [Math.PI, Math.PI/6, Math.PI/2],
        },
        {
            name: "Cumin",
            position: useMemo(() => convertToCartesian(earthRadius + 0.3, Math.PI/-3, Math.PI / 4), []),
            model: <Plant8 />,
            description: "<strong>Scientific Name:</strong> Cuminum cyminum<br/><strong>Habitat:</strong> Native to the eastern Mediterranean and South Asia.<br/><strong>Medicinal Uses:</strong> Aids digestion, reduces bloating, and has anti-microbial properties. Cumin is also known for its antioxidant effects.<br/><strong>Cultivation:</strong> Prefers well-drained soil and full sun; can be grown from seeds. Cumin requires a warm growing season and is sensitive to frost.",
            rotation: [Math.PI, Math.PI/-2, Math.PI/6],
        },
        {
            name: "Licorice",
            position: useMemo(() => convertToCartesian(earthRadius + 0.2, Math.PI/5, Math.PI/-4), []),
            model: <Plant9 />,
            description: "<strong>Scientific Name:</strong> Glycyrrhiza glabra<br/><strong>Habitat:</strong> Native to Southern Europe and Western Asia.<br/><strong>Medicinal Uses:</strong> Soothes digestive issues, reduces inflammation, and has anti-viral properties. Licorice is often used to relieve sore throats and respiratory issues.<br/><strong>Cultivation:</strong> Requires well-drained soil and full sun. Licorice is typically grown from seeds or root cuttings and needs a warm growing season.",
            rotation: [Math.PI/3, Math.PI/2, 0],
        },
        {
            name: "Peppermint",
            position: useMemo(() => convertToCartesian(earthRadius + 0.1, Math.PI/4, Math.PI/-2), []),
            model: <Plant10 />,
            description: "<strong>Scientific Name:</strong> Mentha × piperita<br/><strong>Habitat:</strong> Native to Europe and North America.<br/><strong>Medicinal Uses:</strong> Relieves digestive issues, reduces gas, and has soothing properties for headaches. Peppermint is commonly used in teas and essential oils.<br/><strong>Cultivation:</strong> Prefers moist, well-drained soil and partial shade to full sun. Peppermint can be grown from seeds or cuttings and is invasive, so it’s often grown in containers.",
            rotation: [60, 0, Math.PI/4],
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
            setCameraPosition([plant.position[0], plant.position[1], plant.position[2] - 1.5]);
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
                email: user.email,
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
                <h1 className="text-3xl font-bold text-white">Digestive Health</h1>
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
                                    scale={[0.30, 0.30, 0.30]}
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

export default Hero;
