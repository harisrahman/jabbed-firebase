import React, { useState } from 'react';
import styled from 'styled-components';
import { PatientsContext } from './contexts/PatientsContext';
import { intialVaccineFormValues, VaccineFormContext } from './contexts/VaccineFormContext';
import { PatientType, PatientForm } from './Types';
import VaccineForm from './components/VaccineForm';
import Patients from './components/Patients';

function App()
{
	const [patients, setPatients] = useState<PatientType[]>([]);
	const [vaccineForm, setVaccineForm] = useState<PatientForm>(intialVaccineFormValues);

	return (
		<PatientsContext.Provider value={{ patients, setPatients }}>
			<Root>
				<VaccineFormContext.Provider value={{ vaccineForm, setVaccineForm }}>
					<VaccineForm />
					<div>
						<HeroText>Registered Patients</HeroText>
						<Patients />
					</div>
				</VaccineFormContext.Provider>


			</Root>
		</PatientsContext.Provider>
	);
}

const Root = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const HeroText = styled.h4`
	font-size: 2.5rem;
	margin: 0;
	text-align: center;
`;

export default App;
