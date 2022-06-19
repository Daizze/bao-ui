import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Alert, Container } from 'react-bootstrap'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import Roadmap from "../Roadmap";

const Landing: React.FC = () => {

	const { path } = useRouteMatch()

	return (
		<Page>
			<PageHeader
				icon=""
				title="PandaChef"
			/>
				<Route exact path={path}>
					<Container>
						<Roadmap />
					</Container>
				</Route>
		</Page>
	)
}

// TEMP
const StyledAlert = styled(Alert)`
	text-align: center;
	margin: 25px;

	> b {
		font-weight: bold;
	}

	> a {
		color: inherit;
		font-weight: bold;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		font-size: 0.875rem;
	}
`

export default Landing
