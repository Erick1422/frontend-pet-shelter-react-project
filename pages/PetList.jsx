import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const getPets = async () => {
    try {
        const { data, status } = await axios.get('http://localhost:3000/pets');

        if (status !== 200)
            return null;

        return data;

    } catch (error) {
        console.log('error', error);
        return null;
    }
}

function PetList() {
    const [pets, setPets] = useState([]);

    // Solo se ejecuta cuando carga el componente
    useEffect(() => {
        (async () => {
            const fetchetPets = await getPets();
            setPets(fetchetPets);
        })();
    }, []);

    return (
        <>
            <h2>Pet List</h2>

            {pets?.map((pet) => {
                return (
                    <div key={pet?.id}>
                        <p>{pet?.name} - {pet?.type} - {pet?.breed}</p>

                        <Link to={`/${pet?.id}`}>
                            <button>Pet detail</button>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default PetList;