import { SupportedMarket } from 'bao/lib/types'
import { commify } from 'ethers/lib/utils'
import { useAccountLiquidity } from 'hooks/hard-synths/useAccountLiquidity'
import {
	useBorrowBalances,
	useSupplyBalances,
} from 'hooks/hard-synths/useBalances'
import { useExchangeRates } from 'hooks/hard-synths/useExchangeRates'
import { useMarketPrices } from 'hooks/hard-synths/usePrices'
import React from 'react'
import styled from 'styled-components'
import { MarketOperations } from './Modals'
import BigNumber from 'bignumber.js'
import { decimate } from '../../../utils/numberFormat'

type Stat = {
	label: string
	value: string
}

type StatBlockProps = {
	label: string
	stats: Stat[]
}

type MarketStatBlockProps = {
	asset: SupportedMarket
	amount?: number
}

type MarketStatProps = {
	asset: SupportedMarket
	amount: string
	operation: MarketOperations
}

const StatBlock = ({ label, stats }: StatBlockProps) => (
	<StatWrapper>
		<StatHeader>{label}</StatHeader>
		{stats.map(({ label, value }) => (
			<StatText key={label}>
				<p>{label}</p>
				<p style={{ textAlign: 'end' }}>{value}</p>
			</StatText>
		))}
	</StatWrapper>
)
const SupplyDetails = ({ asset }: MarketStatBlockProps) => {
	const supplyBalances = useSupplyBalances()
	const { exchangeRates } = useExchangeRates()

	const supplyBalance =
		supplyBalances &&
		supplyBalances.find(
			(balance) => balance.address.toLowerCase() === asset.token.toLowerCase(),
		) &&
		exchangeRates &&
		exchangeRates[asset.token]
			? supplyBalances.find(
					(balance) =>
						balance.address.toLowerCase() === asset.token.toLowerCase(),
			  ).balance * decimate(exchangeRates[asset.token]).toNumber()
			: 0

	return (
		<StatBlock
			label="Supply Stats"
			stats={[
				{
					label: 'Supply APY',
					value: `${asset.supplyApy.toFixed(2)}%`,
				},
				{
					label: 'Supply Balance',
					value: `${supplyBalance.toFixed(2)} ${asset.underlyingSymbol}`,
				},
			]}
		/>
	)
}

const MarketDetails = ({ asset }: MarketStatBlockProps) => {
	const { prices } = useMarketPrices()
	const totalBorrowsUsd =
		prices && asset.totalBorrows
			? `$${commify(
					asset.totalBorrows *
						decimate(
							prices[asset.token],
							new BigNumber(36).minus(asset.decimals),
						).toNumber(),
			  )}`
			: '-'
	const totalReservesUsd =
		prices && asset.totalReserves
			? `$${commify(
					asset.totalReserves *
						decimate(
							prices[asset.token],
							new BigNumber(36).minus(asset.decimals),
						).toNumber(),
			  )}`
			: '-'
	const totalSuppliedUsd =
		prices && asset.supplied
			? `$${commify(
					asset.supplied *
						decimate(
							prices[asset.token],
							new BigNumber(36).minus(asset.decimals),
						).toNumber(),
			  )}`
			: '-'
	const reserveFactor = asset.reserveFactor
		? `${asset.reserveFactor * 100}%`
		: '-'

	return (
		<StatBlock
			label="Market Stats"
			stats={[
				{
					label: 'Collateral Factor',
					value: `${asset.collateralFactor * 100}%`,
				},
				{
					label: 'Reserve Factor',
					value: reserveFactor,
				},
				{
					label: 'Total Supplied',
					value: totalSuppliedUsd,
				},
				{
					label: 'Total Borrows',
					value: totalBorrowsUsd,
				},
				{
					label: 'Total Reserves',
					value: totalReservesUsd,
				},
			]}
		/>
	)
}

const BorrowDetails = ({ asset }: MarketStatBlockProps) => {
	const borrowBalances = useBorrowBalances()

	const borrowBalance =
		borrowBalances &&
		borrowBalances.find(
			(_borrowBalance) => _borrowBalance.address === asset.token,
		)
			? borrowBalances.find(
					(_borrowBalance) => _borrowBalance.address === asset.token,
			  ).balance
			: 0

	return (
		<StatBlock
			label="Borrow Stats"
			stats={[
				{
					label: 'Borrow APY',
					value: `${asset.borrowApy.toFixed(2)}%`,
				},
				{
					label: 'Borrow Balance',
					value: `${borrowBalance.toFixed(2)} ${asset.symbol}`,
				},
			]}
		/>
	)
}

const BorrowLimit = ({ asset, amount }: MarketStatBlockProps) => {
	const { prices } = useMarketPrices()
	const accountLiquidity = useAccountLiquidity()

	const change =
		prices && amount
			? asset.collateralFactor *
			  amount *
			  decimate(
					prices[asset.token],
					new BigNumber(36).minus(asset.decimals),
			  ).toNumber()
			: 0
	const borrowable = accountLiquidity
		? accountLiquidity.usdBorrow + accountLiquidity.usdBorrowable
		: 0
	const newBorrowable = borrowable + change

	return (
		<StatBlock
			label="Borrow Limit Stats"
			stats={[
				{
					label: 'Borrow Limit',
					value: `$${borrowable.toFixed(2)} -> $${newBorrowable.toFixed(2)}`,
				},
				{
					label: 'Borrow Limit Used',
					value: `${(accountLiquidity && borrowable !== 0
						? (accountLiquidity.usdBorrow / borrowable) * 100
						: 0
					).toFixed(2)}% -> ${(newBorrowable !== 0
						? (accountLiquidity.usdBorrow / newBorrowable) * 100
						: 0
					).toFixed(2)}%`,
				},
			]}
		/>
	)
}

const BorrowLimitRemaining = ({ asset, amount }: MarketStatBlockProps) => {
	const { prices } = useMarketPrices()
	const { usdBorrow, usdBorrowable } = useAccountLiquidity()
	const change =
		prices && amount
			? amount *
			  decimate(
					prices[asset.token],
					new BigNumber(36).minus(asset.decimals),
			  ).toNumber()
			: 0
	const borrow = usdBorrow
	const newBorrow = borrow - (change > 0 ? change : 0)
	const borrowable = usdBorrow + usdBorrowable
	const newBorrowable = borrowable + (change < 0 ? change : 0)

	return (
		<StatBlock
			label="Borrow Limit Stats"
			stats={[
				{
					label: 'Borrow Limit Remaining',
					value: `$${usdBorrowable.toFixed(2)} -> $${(
						usdBorrowable + change
					).toFixed(2)}`,
				},
				{
					label: 'Borrow Limit Used',
					value: `${(borrowable !== 0
						? (borrow / borrowable) * 100
						: 0
					).toFixed(2)}% -> ${(newBorrowable !== 0
						? (newBorrow / newBorrowable) * 100
						: 0
					).toFixed(2)}%`,
				},
			]}
		/>
	)
}

export const MarketStats = ({ operation, asset, amount }: MarketStatProps) => {
	const parsedAmount = amount && !isNaN(amount as any) ? parseFloat(amount) : 0
	switch (operation) {
		case MarketOperations.supply:
			return (
				<>
					<SupplyDetails asset={asset} />
					<BorrowLimit asset={asset} amount={parsedAmount} />
					<MarketDetails asset={asset} />
				</>
			)
		case MarketOperations.withdraw:
			return (
				<>
					<SupplyDetails asset={asset} />
					<BorrowLimit asset={asset} amount={-1 * parsedAmount} />
					<MarketDetails asset={asset} />
				</>
			)
		case MarketOperations.borrow:
			return (
				<>
					<BorrowDetails asset={asset} />
					<BorrowLimitRemaining asset={asset} amount={-1 * parsedAmount} />
				</>
			)
		case MarketOperations.repay:
			return (
				<>
					<BorrowDetails asset={asset} />
					<BorrowLimitRemaining asset={asset} amount={parsedAmount} />
				</>
			)
	}

	return <></>
}

const StatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: ${(props) => props.theme.spacing[2]};
`

const StatHeader = styled.p`
	color: ${(props) => props.theme.color.text[200]};
	font-size: ${(props) => props.theme.fontSize.xs};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	text-transform: uppercase;
`

const StatText = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: ${(props) => props.theme.spacing[2]};

	p {
		color: ${(props) => props.theme.color.text[100]};
		font-size: ${(props) => props.theme.fontSize.s};
		font-weight: ${(props) => props.theme.fontWeight.medium};
	}
`