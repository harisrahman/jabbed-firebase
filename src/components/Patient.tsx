import React from 'react'
import styled from 'styled-components';
import dayjs from "dayjs";
import Card from './Card';
import Button from './Button';
import { PatientType } from '../Types';
import { deletePatient } from '../api';
import { usePatients } from '../contexts/PatientsContext';
import { useVaccineForm } from '../contexts/VaccineFormContext';

type PropsType = PatientType & {
	key?: number
};

export default function Patient({ _id, name, email, phone, createdAt }: PropsType)
{
	const { patients, setPatients } = usePatients();
	const { setVaccineForm } = useVaccineForm();

	const editHandler = (e: React.MouseEvent<HTMLButtonElement>) =>
	{
		setVaccineForm({ _id, name, email, phone, errors: [] })
	}

	const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) =>
	{
		if (_id)
		{
			deletePatient(_id)
				.then((json: object) =>
				{
					setPatients(patients.filter((p: PatientType) => p._id !== _id));
				})
				.catch((error) =>
				{
					console.log(error);
				});
		}
	}

	return (
		<Card style={{ width: "auto", margin: "1rem" }}>
			<Table>
				<tbody>
					<tr>
						<Th>Name : </Th>
						<td>{name}</td>
					</tr>

					<tr>
						<Th>Email : </Th>
						<td>{email}</td>
					</tr>
					<tr>
						<Th>Phone : </Th>
						<td>{phone}</td>
					</tr>
					{
						createdAt &&
						<tr>
							<Th>Registered At : </Th>
							<td>{dayjs(createdAt).format("DD-MM-YYYY h:mm:ss A")}</td>
						</tr>
					}
				</tbody>
			</Table>


			<Actions>
				<Button type="button" color="warning" onClick={editHandler}>Edit</Button>
				<Button type="button" color="danger" onClick={deleteHandler}>Delete</Button>
			</Actions>

		</Card >
	)
}

const Table = styled.table`
	caption-side: bottom;
    border-collapse: collapse;
	width: 100%;
    margin-bottom: 1rem;
    color: #212529;
    vertical-align: top;
    border-color: #dee2e6;
`;

const Actions = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Th = styled.th`
	padding: 0 0.7rem;
`;
