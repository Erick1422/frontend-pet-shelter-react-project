import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const getPet = async (petId) => {
	try {
		const { data, status } = await axios.get(`http://localhost:3000/pets/${petId}`);

		if (status !== 200)
			return null;

		return data;

	} catch (error) {
		console.log('error', error);
		return null;
	}
}

const deletePet = async (petId) => {
	try {
		const { data, status } = await axios.delete(`http://localhost:3000/pets/${petId}`);

		if (status !== 200)
			return false;

		return true;

	} catch (error) {
		console.log('error', error);
		return false;
	}
}

export default function PetDetail({ setPetToEdit }) { // setPetToEdit -> function()

	const { petId } = useParams();
	const [pet, setPet] = useState({});

	useEffect(() => {
		(async () => {
			const fetchedPet = await getPet(petId);
			setPet(fetchedPet);
			setPetToEdit(fetchedPet);
		})();
	}, []);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
			<h2>Pet Detail</h2>

			{pet && (
				<>
					<p>Pet name: {pet.name}</p>
					<p>Pet type: {pet.type}</p>
					<p>Pet age: {pet.age}</p>
					<p>Pet breed: {pet.breed}</p>

					<div style={{ display: 'flex', justifyContent: 'center', aligniItems: 'center' }}>

						<Link to={`/${pet?.id}/edit`}>
							<button style={{ marginRight: 10 }}>Edit pet</button>
						</Link>

						<button style={{ marginLeft: 10 }}
							onClick={async () => {
								const isDeleted = await deletePet(petId);
								if (isDeleted)
									window.location.href = '/';
							}}
						>
							Delete pet
						</button>
					</div>
				</>
			)}
		</div>
	)
}