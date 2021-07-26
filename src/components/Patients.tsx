import { useEffect } from 'react'
import styled from 'styled-components';
import { PatientType } from '../Types';
import { usePatients } from '../contexts/PatientsContext';
import Patient from './Patient';
import { observePatients } from '../api';

export default function Patients()
{
	const { patients, setPatients } = usePatients();

	useEffect(() =>
	{
		observePatients<PatientType>(setPatients);

		// fetchPatients<PatientType>()
		// 	.then((patients) =>
		// 	{
		// 		setPatients(patients);
		// 	})
		// 	.catch((error) =>
		// 	{
		// 		console.log(error);
		// 	})
	}, [setPatients])

	return (
		<Grid>
			{
				patients.map((patient: PatientType, index: number) =>
				{
					return (
						<Patient key={index} {...patient} />
					);

				})
			}
		</Grid>
	)
}

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
