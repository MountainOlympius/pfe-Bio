import React, { useCallback, useEffect, useState } from 'react'
import { cloneObject } from '../utils/Generic'
import { Button} from '@mantine/core'

import '../styles/FormImagesInput.scss'


const FormImagesInput = ({ max = Infinity, defaultImages, onUpdateCallback }) => {
    const [images, setImages] = useState(defaultImages || [])

    useEffect(() => {
        if (defaultImages) setImages(defaultImages || [])
    }, [defaultImages])

    const readFileUrl = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
        
            fileReader.onload = (e) => resolve(e.target.result)
            fileReader.onerror = (e) => reject(e)

            fileReader.readAsDataURL(file)
        })
    }

    const onAddedImages = async (e) => {
        const files = e.target.files
        const imagesClone = [...images]
        
        if (files.length + images.length > max) return
        
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i)
            const urlData = await readFileUrl(file)
            
            imagesClone.push({url: urlData, file })
        }

        setImages(imagesClone)
        onUpdateCallback(imagesClone)
    }

    const onDeleteImage = (i) => {
        const imagesClone = [...images].filter((img, index) => index !== i)
        setImages(imagesClone)
        onUpdateCallback(imagesClone)
    }

    return (
        <div className='FormImagesInput'>
            <h4>Les images :</h4>
            <div className='images-container'>
                {images.map((img, i) => <div className='image-div' key={i} >
                    <img src={img.url} />
                    {/* You can use x icon instead of this delete button */}
                    <Button color="red" onClick={() => onDeleteImage(i)} type='button' className='delete-btn'>supprimer image</Button>
                </div>)}
            </div>
            <div className='form-div'>
                <label htmlFor='input-images' className='add-images-btn'>Add-Images</label>
                <input onChange={onAddedImages} id='input-images' className='input-elt hidden' type='file' accept='image/*' multiple />
            </div>
        </div>
    )
}

export default FormImagesInput