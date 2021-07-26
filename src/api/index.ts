import { PatientType } from "../Types";

const url = 'http://localhost:5000/patients';

export const fetchPatients = async () =>
{
	return await fetch(url)
		.then((res) => res.json());
};

export const createPatient = async (patient: PatientType) =>
{
	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(patient),
	}).then((res) => res.json());
};

export const updatePatient = async (id: string, patient: PatientType) =>
{
	return await fetch(`${url}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(patient),
	}).then((res) => res.json());
};

export const deletePatient = async (id: string) =>
{
	return await fetch(`${url}/${id}`, { method: 'DELETE' })
		.then((res) => res.json());
};

// export const deletePatient = (id: string) => axios.delete(`${url}/${id}`);
