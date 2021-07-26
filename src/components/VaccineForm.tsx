import React from 'react'
import styled from 'styled-components';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { PatientType } from '../Types';
import { createPatient, updatePatient } from '../api';
import { usePatients } from '../contexts/PatientsContext';
import { intialVaccineFormValues, useVaccineForm } from '../contexts/VaccineFormContext';

export default function VaccineForm()
{
	const { patients, setPatients } = usePatients();
	const { vaccineForm, setVaccineForm } = useVaccineForm();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>
	{
		e.preventDefault();

		if (vaccineForm.errors.length === 0)
		{
			const { errors, ...patient } = vaccineForm;

			if (patient._id)
			{
				updatePatient(patient._id, patient)
					.then((updatedPatient: PatientType) =>
					{
						setPatients(patients.map((patient: PatientType) =>
						{
							return updatedPatient._id === patient._id ? updatedPatient : patient;
						}));

						setVaccineForm(intialVaccineFormValues);
					})
					.catch((error) =>
					{
						alert(error);
					});

			}
			else
			{
				createPatient(patient)
					.then((patient) =>
					{
						setPatients(patients.concat(patient));
						setVaccineForm(intialVaccineFormValues);
					})
					.catch((error) =>
					{
						alert(error);
					});

			}


		}
	}

	return (
		<Card maxWidth="500px" style={{ margin: "2rem auto" }}>
			<Center>
				<HeroText>Get Vaccinated</HeroText>
				<LeadText>Together we can defeat COVID-19</LeadText>
				<Form onSubmit={submitHandler} noValidate>
					<Input name="name" title="Name" minLength={2} maxLength={50} formState={[vaccineForm, setVaccineForm]} />
					<Input name="email" title="Email" type="email" maxLength={150} formState={[vaccineForm, setVaccineForm]} />
					<Input name="phone" title="Phone" minLength={10} maxLength={10} type="tel" formState={[vaccineForm, setVaccineForm]} />
					<Button type="submit" color="primary" style={{ maxWidth: "250px" }}>Submit</Button>
				</Form>
			</Center>
		</Card>

	)
}

const Center = styled.div`
	text-align: center;
`;

const HeroText = styled.h4`
	font-size: 2.5rem;
	margin: 0;
`;

const LeadText = styled.p`
	color: #9CA3AF;
	margin: 0;
	font-size: 0.8rem;
`;


const Form = styled.form`
	padding: 2rem;

`;