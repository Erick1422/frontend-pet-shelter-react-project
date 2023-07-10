import axios from 'axios'
import React, { useState } from 'react'

const addPet = async (petData) => {
	try {
		const { petName, petType, petAge, petBreed } = petData;
		const { status, data } = await axios.post('http://localhost:3000/pets/',
			{
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
		console.log('error', error);
		return null;
	}
}

export default function AddPet() {

	const [petName, setPetName] = useState("");
	const [petType, setPetType] = useState("");
	const [petAge, setPetAge] = useState();
	const [petBreed, setPetBreed] = useState("");

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', aligniItems: 'center' }}>
			<h2>Add Pet</h2>

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
					const savetPet = await addPet({ petName, petType, petAge, petBreed });
					if (savetPet)
						window.location.href = `/${savetPet.id}`;
				}}
			>
				Add pet
			</button>
		</div>
	)
}