/* eslint-disable react/no-unescaped-entities */
import Button from '@/components/Button'
import Typography from '@/components/Typography'
import useContract from '@/hooks/base/useContract'
import useTransactionHandler from '@/hooks/base/useTransactionHandler'
import useDistributionInfo from '@/hooks/distribution/useDistributionInfo'
import { BaoDistribution } from '@/typechain/BaoDistribution'
import { getDisplayBalance } from '@/utils/numberFormat'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import classNames from 'classnames'
import { BigNumber } from 'ethers'
import 'katex/dist/katex.min.css'
import Image from 'next/future/image'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import Claim from './Claim'
import End from './End'
import Migrate from './Migrate'
import Config from '@/bao/lib/config'

const options = [
	{
		id: 1,
		name: 'Migrate to veBAO',
		shortDesc: 'Migrate your locked BAOv1 to veBAO.',
	},
	{
		id: 2,
		name: 'Claim Now',
		shortDesc: 'Claim your unlocked BAO.',
	},
	{
		id: 3,
		name: 'End Distribution',
		shortDesc: 'End your distribution.',
	},
]

const Migration: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState(options[0])
	const { handleTx, pendingTx } = useTransactionHandler()

	const distribution = useContract<BaoDistribution>('BaoDistribution')

	const { account, chainId, library } = useWeb3React()
	const { data: merkleLeaf } = useQuery(
		['/api/vebao/distribution/proof', account, chainId],
		async () => {
			const leafResponse = await fetch(`/api/vebao/distribution/proof/${account}/`)
			if (leafResponse.status !== 200) {
				const { error } = await leafResponse.json()
				throw new Error(`${error.code} - ${error.message}`)
			}
			const leaf = await leafResponse.json()
			return leaf
		},
		{
			retry: false,
			enabled: !!account,
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	)

	const distributionInfo = useDistributionInfo()

	const canStartDistribution = !!merkleLeaf

	console.log('Date Started', distributionInfo ? distributionInfo.dateStarted : 0)
	console.log('Can Start Distribution', canStartDistribution)

	return (
		<div className='flex flex-col items-center'>
			<div className='pt-4 md:w-4/5'>
				{distributionInfo && distributionInfo.dateStarted.gt(0) ? (
					<>
						<div className='pb-5'>
							<Typography variant='lg' className='text-lg font-bold leading-6'>
								Select Your Distribution Method
							</Typography>
							<Typography variant='p' className='mt-2 leading-normal text-text-200'>
								Locked BAO holders have three actions they can choose from with their locked positions. Please read the descriptions below
								very carefully. You can read more about this process and the math behind it by checking out{' '}
								<a
									className='font-bold hover:text-text-400'
									href='https://gov.bao.finance/t/bip-14-token-migration-distribution/1140'
									target='_blank'
									rel='noreferrer'
								>
									BIP-14
								</a>{' '}
								on our governance forums. If you have any questions, please join our{' '}
								<a href='https://discord.gg/BW3P62vJXT' target='_blank' rel='noreferrer noopener' className='font-bold hover:text-text-400'>
									Discord
								</a>{' '}
								community!
							</Typography>
						</div>
						<div className='flex flex-row'>
							<div className='my-4 flex w-full flex-col'>
								<Listbox value={selectedOption} onChange={setSelectedOption}>
									{({ open }) => (
										<>
											<Listbox.Label className='mb-1 font-bold'>Select your distribution option</Listbox.Label>
											<div className='relative'>
												<div className='inline-flex w-full rounded-md border-none shadow-sm'>
													<div className='inline-flex w-full rounded-md border-none shadow-sm'>
														<div className='inline-flex w-full items-center rounded-l-md border border-primary-300 bg-primary-100 py-2 pl-3 pr-4 text-white shadow-sm'>
															<CheckIcon className='h-5 w-5' aria-hidden='true' />
															<p className='ml-2.5 font-medium'>{selectedOption.name}</p>
														</div>
														<Listbox.Button
															className={
																(classNames(open ? 'bg-primary-300 text-text-400' : 'text-text-100'),
																'inline-flex items-center rounded-l-none rounded-r-md border border-primary-300 bg-primary-200 p-2 font-medium text-text-100 hover:bg-primary-300')
															}
														>
															<ChevronDownIcon className='h-5 w-5 text-white' aria-hidden='true' />
														</Listbox.Button>
													</div>
												</div>

												<Transition
													show={open}
													as={Fragment}
													leave='transition ease-in duration-100'
													leaveFrom='opacity-100'
													leaveTo='opacity-0'
												>
													<Listbox.Options className='absolute z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-primary-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
														{options.map(option => (
															<Listbox.Option
																key={option.name}
																className={({ active }) =>
																	classNames(active ? 'bg-primary-100 text-text-400' : 'text-text-100', 'cursor-pointer select-none p-4')
																}
																value={option}
															>
																{({ selected, active }) => (
																	<div className='flex flex-col'>
																		<div className='flex justify-between'>
																			<p className='font-semibold'>{option.name}</p>
																			{selected ? (
																				<span className={active ? 'text-text-100' : 'text-text-200'}>
																					<CheckIcon className='h-5 w-5' aria-hidden='true' />
																				</span>
																			) : null}
																		</div>
																		<p className={classNames(active ? 'text-text-100' : 'text-text-200', 'mt-2')}>{option.shortDesc}</p>
																	</div>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
							<div className='mt-2 mb-1 flex w-full flex-col items-end justify-end gap-1'>
								<div className='flex flex-row items-center'>
									<Typography className='px-2 font-semibold text-text-100'>Total Locked BAO</Typography>
									<div className='flex h-8 w-auto flex-row items-center justify-center gap-2 rounded border border-primary-400 bg-primary-100 px-2 py-4'>
										<Image src='/images/tokens/BAO.png' height={24} width={24} alt='BAO' />
										<Typography className='font-bold'>
											{getDisplayBalance((distributionInfo && distributionInfo.amountOwedTotal) || BigNumber.from(0))}
										</Typography>
									</div>
								</div>
								<div className='flex flex-row items-center'>
									<Typography className='px-2 font-semibold text-text-100'>BAO Unlocked</Typography>
									<div className='flex h-8 w-auto flex-row items-center justify-center gap-2 rounded border border-primary-400 bg-primary-100 px-2 py-4'>
										<Image src='/images/tokens/BAO.png' height={24} width={24} alt='BAO' />
										<Typography className='font-bold'>
											{getDisplayBalance((distributionInfo && distributionInfo.curve) || BigNumber.from(0))}
										</Typography>
									</div>
								</div>
							</div>
						</div>
						<div className='mb-4 flex flex-col rounded bg-primary-100 p-4'>
							{selectedOption.id == 1 && <Migrate />}
							{selectedOption.id == 2 && <Claim />}
							{selectedOption.id == 3 && <End />}
						</div>
					</>
				) : (
					<div className='flex flex-col items-center'>
						<div className='md:max-w-4xl'>
							<div className='mb-5 pb-5'>
								<Typography variant='xl' className='font-bold text-text-100'>
									Start Your Distribution
								</Typography>
								<Typography className='mt-2 leading-normal text-text-200'>
									Locked BAO holders have three actions they can choose from with their locked positions. Any distribution will only begin
									once manually initiated by the wallet owner. Once you start your distribution, please read the instructions and
									descriptions on each option very carefully.
								</Typography>
								<Typography className='mt-2 leading-normal text-text-200'>
									You can read more in-depth about this process by checking out{' '}
									<a
										className='font-medium hover:text-text-400'
										href='https://gov.bao.finance/t/bip-14-token-migration-distribution/1140'
										target='_blank'
										rel='noreferrer'
									>
										BIP-14
									</a>{' '}
									on our governance forums. If you have any questions, please join{' '}
									<a
										href='https://discord.gg/BW3P62vJXT'
										target='_blank'
										rel='noreferrer noopener'
										className='font-medium hover:text-text-400'
									>
										our Discord community!
									</a>{' '}
								</Typography>
							</div>
							<div className='flex flex-col items-center'>
								{pendingTx ? (
									<Button disabled={true} className='bg-primary-500'>
										{typeof pendingTx === 'string' ? (
											<Link href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`} target='_blank' rel='noopener noreferrer'>
												Pending Transaction <FontAwesomeIcon icon={faExternalLinkAlt} />
											</Link>
										) : (
											'Pending Transaction'
										)}
									</Button>
								) : (
									<Button
										disabled={!canStartDistribution || (distributionInfo && distributionInfo.dateStarted.gt(0))}
										className='bg-primary-500'
										onClick={async () => {
											const startDistribution = distribution.startDistribution(merkleLeaf.proof, merkleLeaf.amount)
											handleTx(startDistribution, `Start Distribution`)
										}}
									>
										Start Distribution
									</Button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Migration