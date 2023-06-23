/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ActiveSupportedVault } from '@/bao/lib/types'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { PendingTransaction } from '@/components/Loader/Loader'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import useContract from '@/hooks/base/useContract'
import useTransactionHandler from '@/hooks/base/useTransactionHandler'
import { useApprovals } from '@/hooks/vaults/useApprovals'
import { Erc20 } from '@/typechain/Erc20'
import { decimate, getDisplayBalance } from '@/utils/numberFormat'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber, ethers } from 'ethers'
import Image from 'next/future/image'
import { useCallback } from 'react'

export type SupplyModalProps = {
	asset: ActiveSupportedVault
	val: BigNumber
	show: boolean
	onHide: () => void
	vaultName: string
}

const SupplyModal = ({ asset, show, onHide, vaultName, val }: SupplyModalProps) => {
	const { pendingTx, txHash, handleTx } = useTransactionHandler()
	const { approvals } = useApprovals(vaultName)
	const { vaultContract } = asset
	const erc20 = useContract<Erc20>('Erc20', asset.underlyingAddress)
	const usdValue = val.mul(asset.price)

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal isOpen={show} onDismiss={hideModal}>
			<Modal.Header onClose={hideModal}>
				<div className='mx-0 my-auto flex h-full items-center text-baoWhite'>
					<Typography variant='xl' className='mr-1 inline-block'>
						Confirm Deposit
					</Typography>
				</div>
			</Modal.Header>
			<Modal.Body>
				<Typography variant='lg' className='p-6 text-center font-bakbak'>
					<Image src={`/images/tokens/${asset.icon}`} width={32} height={32} alt={asset.underlyingSymbol} className='inline p-1' />
					{getDisplayBalance(val, asset.underlyingDecimals).toString()} {asset.underlyingSymbol}{' '}
					<Badge>${getDisplayBalance(decimate(usdValue))}</Badge>
				</Typography>
			</Modal.Body>
			<Modal.Actions>
				{pendingTx ? (
					<a href={`https://etherscan.io/tx/${txHash}`} target='_blank' aria-label='View Transaction on Etherscan' rel='noreferrer'>
						<Button fullWidth className='!rounded-full'>
							<PendingTransaction /> Pending Transaction
							<FontAwesomeIcon icon={faExternalLink} className='ml-2 text-baoRed' />
						</Button>
					</a>
				) : approvals && (asset.underlyingAddress === 'ETH' || approvals[asset.underlyingAddress].gt(0)) ? (
					<Button
						fullWidth
						className='!rounded-full'
						disabled={!val}
						onClick={async () => {
							let supplyTx
							if (asset.underlyingAddress === 'ETH') {
								// @ts-ignore
								supplyTx = vaultContract.mint(true, {
									value: val,
								})
								// TODO- Give the user the option in the SupplyModal to tick collateral on/off
							} else {
								// @ts-ignore
								supplyTx = vaultContract.mint(val, true) // TODO- Give the user the option in the SupplyModal to tick collateral on/off
							}
							handleTx(
								supplyTx,
								`${vaultName} Vault: Supply ${getDisplayBalance(val, asset.underlyingDecimals)} ${asset.underlyingSymbol}`,
								() => onHide(),
							)
						}}
					>
						Confirm
					</Button>
				) : (
					<Button
						fullWidth
						className='!rounded-full'
						disabled={!approvals}
						onClick={() => {
							// TODO- give the user a notice that we're approving max uint and instruct them how to change this value.
							const tx = erc20.approve(vaultContract.address, ethers.constants.MaxUint256)
							handleTx(tx, `${vaultName} Vault: Approve ${asset.underlyingSymbol}`)
						}}
						pendingTx={pendingTx}
						txHash={txHash}
					>
						Approve
					</Button>
				)}
			</Modal.Actions>
		</Modal>
	)
}

export default SupplyModal
