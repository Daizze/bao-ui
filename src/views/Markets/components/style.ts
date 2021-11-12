import styled from 'styled-components'

export const Flex = styled.div`
    display: flex;
    width: 100%;
}`

export const MarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${(props) => props.theme.spacing[4]}px;
  padding-bottom: 0px;
  color: ${(props) => props.theme.color.text[100]};
`

export const MarketHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 3.5rem;
  width: 100%;
`

export const MarketHeaderStack = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const MarketHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const MarketHeaderText = styled.p`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1.25rem;
  font-weight: ${(props) => props.theme.fontWeight.strong};
  margin: 0;
`

export const MarketHeaderSubText = styled.a`
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
  color: ${(props) => props.theme.color.text[200]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin: 0;
`

export const MarketTableContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: ${(props) => props.theme.color.transparent[100]};
`

export const OverviewTableContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[3]}px;
`

export const MarketTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.text[200]};
  text-transform: uppercase;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
`

export const HeaderWrapper = styled.div`
  display: flex;
  min-width: 6rem;
`

export const ItemContainer = styled.div`
    transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: .875rem;
    cursor: pointer;
    padding-top: ${(props) => props.theme.spacing[2]}px;
    padding-bottom: ${(props) => props.theme.spacing[2]}px;
    padding-left: ${(props) => props.theme.spacing[3]}px;
    padding-right: ${(props) => props.theme.spacing[3]}px;
    border-radius: 8px;

    &:hover {
        background-color: ${(props) => props.theme.color.transparent[200]};
`

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 6rem;

  img {
    vertical-align: middle;
    height: 20px;
    width: 20px;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    maring: 0px;
    margin-top: 0px;
    margin-inline: 0.5rem 0px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.color.text[100]};
  }
`

export const MarketSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: 0px;
  color: ${(props) => props.theme.color.text[100]};
  font-family: 'Poppins', sans-serif;
  margin-top: 2rem;
`

export const MarketSummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.text[100]};
`

export const MarketHeaderWrapper = styled.div`
  display: flex;
  min-width: 6rem;
`

export const MarketItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: 0.875rem;
`

export const MarketItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 6rem;
  color: ${(props) => props.theme.color.text[200]};
`