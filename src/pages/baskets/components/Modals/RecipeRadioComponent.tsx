import React from 'react'

type onChange = (name: string) => void

interface RecipeRadioInterface {
	onChange: onChange
	selected: string
}

const recipes = ['SimpleUniRecipe', 'BalancerRecipe']

export function RecipeRadioComponent({ onChange, selected }: RecipeRadioInterface) {
	return (
		<div className='radioContainer'>
			{recipes.map((recipe: string, index: number) => {
				return (
					<div key={index}>
						<input
							className='radioInput'
							type='radio'
							value={recipe}
							name='recipe'
							id={recipe}
							checked={selected === recipe}
							onChange={event => onChange(event.target.value)}
						/>
						<label className='radioLabel' htmlFor={recipe}>
							{recipe}
						</label>
					</div>
				)
			})}
		</div>
	)
}

export default RecipeRadioComponent
