import { createContext, useContext } from 'react';
import { PatientsContextType } from '../Types';

export const PatientsContext = createContext<PatientsContextType>({
	patients: [],
	setPatients: patients => console.warn('function not implemented')
});

export const usePatients = (): PatientsContextType => useContext(PatientsContext);
