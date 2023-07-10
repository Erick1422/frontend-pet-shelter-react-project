import axios from 'axios';
import React, { useState } from 'react';

const editPet = async (petData) => {
	try {
		const { id, petName, petType, petAge, petBreed } = petData;
		const { status, data } = await axios.put(`http://localhost:3000/pets/${id}`,
			{
				id,
				name: petName,
				type: petType,
				age: petAge,
				breed: petBreed
			},
			{ headers: { 'Content-Type': 'application/json' } }
		);

		if (status !== 200)
			return null;

		return data;

	} catch (error) {
		console.error('error', error);
		return null;
	}
}

export default function EditPet({ petToEdit }) {

	const [petName, setPetName] = useState(petToEdit?.name);
	const [petType, setPetType] = useState(petToEdit?.type);
	const [petAge, setPetAge] = useState(petToEdit?.age);
	const [petBreed, setPetBreed] = useState(petToEdit?.breed);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
			<h2>Edit Pet</h2>

			<div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
				<label>Pet name</label>
				<input type='text' value={petName} onChange={e => setPetName(e.target.value)} />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
				<label>Pet type</label>
				<input type='text' value={petType} onChange={e => setPetType(e.target.value)} />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
				<label>Pet age</label>
				<input type='text' value={petAge} onChange={e => setPetAge(e.target.value)} />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
				<label>Pet breed</label>
				<input type='text' value={petBreed} onChange={e => setPetBreed(e.target.value)} />
			</div>

			<button
				style={{ marginTop: 30 }}
				onClick={async () => {
					const updatedPet = await editPet({
						id: petToEdit.id,
						petName,
						petType,
						petAge,
						petBreed
					});

					if (updatedPet)
						window.location.href = `/${updatedPet.id}`;
				}}
			>
				Save changes
			</button>
		</div>
	)
}