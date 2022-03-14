import React from 'react'

import '../styles/PhylumForm.scss'


const PhylumForm = ({ onSubmitCallback, buttonText, data = {} }) => {
	return (
		<div className="phylumform-container">
		<form className='PhylumForm form' onSubmit={onSubmitCallback}>
			<div className='form-div'>
				<label>Nom d'embranchements :</label>
				<input type='text' defaultValue={data['name']} name='name' className='form-input' />
			</div>

            <div className='form-div'>
                <label>Description</label>
                <textarea name='description' defaultValue={data['description']}></textarea>
            </div>

            <button className='submitBtn' type='submit'>{buttonText}</button>
		</form>
		</div>
	)
}

export default PhylumForm
