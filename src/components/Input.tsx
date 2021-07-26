import React, { useState } from 'react';
import styled from 'styled-components';
import { PatientType, PatientForm } from '../Types';
import { isValidEmail, hasOnlyNumbers } from '../helpers';

type PropsType = {
	title: string,
	name: keyof PatientType,
	type?: string,
	placeholder?: string,
	maxLength?: number,
	minLength?: number,
	formState?: [PatientForm, (p: PatientForm) => void],
	style?: React.CSSProperties
}

function Input({ title, name, type, placeholder, maxLength, minLength, formState, style }: PropsType)
{
	const [formData, setFormData] = formState ? formState : [undefined, undefined];
	const [errorMsg, setErrorMsg] = useState<string>("");

	const findErrorMsg = (val: string) =>
	{
		let msg = "";

		if (minLength && val.length < minLength)
		{
			msg = `${title} must be at least ${minLength} characters long.`;

			if (!formData?.errors.includes(name)) 
			{
				formData?.errors.includes(name)
			}
		}
		else if (type === "email" && !isValidEmail(val))
		{
			msg = "Please enter a valid email address";
		}
		else if (type === "tel" && !hasOnlyNumbers(val))
		{
			msg = `${title} should contain only numbers.`;
		}

		return msg;
	}

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		const val = e.target.value;
		let errorMsg = findErrorMsg(val);

		if (formData !== undefined && setFormData !== undefined)
		{
			const errors = formData.errors;
			const currErrorIndex = errors.indexOf(name);

			if (errorMsg === "" && currErrorIndex !== -1)
			{
				//Remove from errors
				errors.splice(currErrorIndex, 1);
			}
			else if (errorMsg !== "" && currErrorIndex === -1)
			{
				// Add to errors
				errors.push(name);
			}

			setFormData({ ...formData, [name]: val, errors: errors });
		}

		setErrorMsg(errorMsg);
	}

	return (
		<Main style={style}>
			<Label>{title}</Label>
			<InputElement type={type || "text"} onInput={inputHandler} placeholder={placeholder || title} minLength={minLength} maxLength={maxLength} value={formData ? formData[name] : ""} hasError={errorMsg !== ""} />
			{errorMsg !== "" && <ErrorMsg>{errorMsg}</ErrorMsg>}
		</Main>
	);
}

const Main = styled.div`
	text-align: left;
	margin-bottom: 1rem;
`;

const Label = styled.label`
    display: inline-block;
	margin-bottom: 0.5rem;
`;

const InputElement = styled.input<{ hasError: boolean }>`
	display: block;
	width: 100%;
	padding: .6rem 1rem;
	font-size: 1rem;
	font-weight: 400;
	color: #212529;
	border: 1px solid #ced4da;
	border-radius: .25rem;
	border-color: ${(props) => props.hasError ? "#dc3545" : "#ced4da"};

	&:focus
	{
		color: #495057;
		background-color: #fff;
		border-color: ${(props) => props.hasError ? "#dc3545" : "#80bdff"};
		outline: 0;
	}
`;

const ErrorMsg = styled.div`
	width: 100%;
	margin-top: .25rem;
	font-size: 1rem;
	font-weight: 600;
	color: #dc3545;
`;

export default Input;
