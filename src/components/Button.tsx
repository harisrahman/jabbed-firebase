import React from 'react'
import styled from 'styled-components';
import { themeColorKeyType } from '../Types';
import theme from '../variables/theme';

type PropsType = {
	type: "button" | "submit" | "reset",
	color: themeColorKeyType,
	style?: React.CSSProperties,
	children?: React.ReactNode,
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
};

export default function Button({ type, color, style, children, onClick }: PropsType)
{
	return (
		<Btn type={type} color={color} style={style} onClick={onClick}>{children}</Btn>
	)
}


const Btn = styled.button<PropsType>`
	width: 100%;
	margin: 0.3rem;
	text-decoration: none;
	color: ${(props) => theme.color[props.color].default.contrast};
	background-color: ${(props) => theme.color[props.color].default.color};
	text-align: center;
	letter-spacing: .5px;
	transition: background-color .2s ease-out;
	cursor: pointer;
	border: none;
	border-radius: 2px;
	display: inline-block;
	padding: 0.6rem 0.8rem;
	text-transform: uppercase;
	vertical-align: middle;
	outline: none;

	&:hover
	{
		background-color: ${(props) => theme.color[props.color].hover?.color};
	}

	&:active
	{
		background-color: ${(props) => theme.color[props.color].active?.color};
	}
`;
