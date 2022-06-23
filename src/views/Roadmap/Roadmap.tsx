import React from 'react'
import Timeline from "../../components/Timeline";
import {Container} from "react-bootstrap";
import styled from 'styled-components'
import {roadmapData} from './roadmapData'

const Roadmap: React.FC = () => {

	return (
		  <Container>
				<StyledSectionTitle>{roadmapData.title}</StyledSectionTitle>
				<StyledBodySubText>
					{roadmapData.bodySubText}
				</StyledBodySubText>
				<Timeline timelineItems={roadmapData.roadmapItems} />
			</Container>
	)
}

const StyledSectionTitle = styled.h1`
  font-size: 48px;
  white-space: wrap;
  overflow-wrap: normal;
  margin-top: 3rem;
  font-weight: 600;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  font-family: 'Kaushan Script';
  letter-spacing: -0.025em;
  text-align: center;
  @media (max-width: 960px) {
    width: 100%;
    font-size: 2rem;
    line-height: 2.5rem;
    max-width: 600px;
    margin-top: 4rem;
  }
  @media (max-width: 640px) {
    width: 100%;
    font-weight: 400;
    margin-top: 4rem;
    text-align: left;
  }
`
const StyledBodySubText = styled.h3`
  text-align: center;
  line-height: 160%;
  font-size: 1.25rem;
  @media (max-width: 640px) {
    text-align: left;
  }
`

export default Roadmap
