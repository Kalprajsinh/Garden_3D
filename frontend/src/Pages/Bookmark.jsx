import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useAuth } from '../Pages/AuthContext';
import Plant1 from "../../public/Plant_model/Anise_GLTF";
import Plant2 from "../../public/Plant_model/Caraway_GLTF";
import Plant3 from "../../public/Plant_model/Chamomile_GLTF";
import Plant4 from "../../public/Plant_model/Coriander_GLTF";
import Plant5 from "../../public/Plant_model/Fennel_Plant_GLTF";
import Plant6 from "../../public/Plant_model/Ginger_Plant_GLTF";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import axios from 'axios';

function BookmarkPage() {
    const { user } = useAuth();
    const [bookmarkedPlants, setBookmarkedPlants] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                // Retrieve user email from localStorage
                const storedUser = localStorage.getItem('user');
                const storedEmail = storedUser ? JSON.parse(storedUser).email : null;

                if (storedEmail) {
                    // Fetch bookmarked plants using the email
                    const response = await axios.get('http://localhost:3000/bookmark', {
                        params: { email: storedEmail }
                    });
                    setBookmarkedPlants(response.data);
                } else {
                    console.warn('No email found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        fetchBookmarks();
    }, []); // Empty dependency array to run only on component mount

    const getPlantModel = (name) => {
        switch (name) {
            case "Anise": return <Plant1 />;
            case "Caraway": return <Plant2 />;
            case "Aloe vera": return <Plant3 />;
            case "Neem Tree": return <Plant5 />;
            case "Ginger Plant": return <Plant6 />;
            default: return null;
        }
    };
    
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Bookmarked Plants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {bookmarkedPlants.map((plant, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-2">{plant.plantname}</h2>
                        <p className="text-gray-600 mb-4">{plant.description}</p>
                        <div className="w-full h-64">
                            <Canvas>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 10]} intensity={1} />
                                <Suspense fallback={null}>
                                    <mesh
                                    scale={[2.5,2.5,2.5]}
                                    >
                                        {getPlantModel(plant.plantname)}
                                    </mesh>
                                </Suspense>
                                <OrbitControls enableZoom={false} />
                                <Environment preset="forest" />
                                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={50} color={'#000000'} />
                            </Canvas>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookmarkPage;
