import React from 'react';
import styled from 'styled-components';

type PropsType = {
	maxWidth?: string,
	children?: React.ReactNode,
	style?: React.CSSProperties,
}

function Card(props: PropsType)
{
	return (
		<Main {...props}>
			{props.children}
		</Main>
	);
}

const Main = styled.div`
	border: 0;
	border-radius: 6px;
	color: #333;
	background: #fff;
	width: 100%;
	padding: 2rem;
	margin: 2rem;
	box-shadow: 0 0 20px 0 rgb(62 28 131 / 10%);
	max-width: ${(props: PropsType) => props.maxWidth};
`;

export default Card;
