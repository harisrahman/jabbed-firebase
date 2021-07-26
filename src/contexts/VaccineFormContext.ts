import { createContext, useContext } from 'react';
import { PatientForm, VaccineFormContextType } from '../Types';

export const intialVaccineFormValues: PatientForm = {
	name: "",
	email: "",
	phone: "",
	errors: ["name", "email", "phone"] // Intially these will have errors
};

export const VaccineFormContext = createContext<VaccineFormContextType>({
	vaccineForm: intialVaccineFormValues,
	setVaccineForm: (form) => console.warn('function not implemented')
});

export const useVaccineForm = (): VaccineFormContextType => useContext(VaccineFormContext);
