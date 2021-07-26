export type PatientType = {
	name: string,
	email: string,
	phone: string,
	_id?: string,
	createdAt?: string,
};

export type PatientForm = PatientType & { errors: (keyof PatientType)[] }

export type colorAndContrastType = {
	color: string,
	contrast: string
}

export type htmlElmentStateType = {
	default: colorAndContrastType,
	hover?: colorAndContrastType,
	active?: colorAndContrastType,
	focus?: colorAndContrastType,
}

export type themeColorType = {
	primary: htmlElmentStateType,
	danger: htmlElmentStateType,
	warning: htmlElmentStateType,
};

export type themeColorKeyType = keyof themeColorType;

export type themeType = { color: themeColorType };

export interface PatientsContextType
{
	patients: PatientType[],
	setPatients: (prop: PatientType[]) => void
}

export interface VaccineFormContextType
{
	vaccineForm: PatientForm,
	setVaccineForm: (form: PatientForm) => void
}
