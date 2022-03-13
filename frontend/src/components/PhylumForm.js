import React from 'react'

const PhylumForm = ({ onSubmitCallback, buttonText, data = {} }) => {
	return (
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
	)
}

export default PhylumForm
