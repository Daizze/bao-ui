import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import '../../styles/verticaltimeline.css'
import { TimelineHeader, TimelineSubHeader, TimelineDesc } from "./timelineCss";

interface TimelineProps {
	timelineItems: any
}

const Timeline: React.FC<TimelineProps> = ({timelineItems}) => {

	return (
		<VerticalTimeline>
			{
				timelineItems.map(
					(timelineItem:any, index: number) => {
						return (
							<VerticalTimelineElement className="vertical-timeline-element--work">
								<TimelineHeader>{timelineItem.header}</TimelineHeader>
								<TimelineSubHeader>{timelineItem.subheader}</TimelineSubHeader>
								<TimelineDesc>{timelineItem.description}</TimelineDesc>
							</VerticalTimelineElement>
						)
					}
				)
			}
		</VerticalTimeline>
	);
}

export default Timeline