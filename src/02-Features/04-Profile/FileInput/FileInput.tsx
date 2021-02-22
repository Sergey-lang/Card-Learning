import React, {ChangeEvent, useState} from 'react';
import s from './FileInput.module.scss'
import {useDispatch} from 'react-redux';
import {updateProfileData} from '../../01-Login/auth-reducer';

interface IFileInputProps {

}

const FileInput: React.FC<IFileInputProps> = () => {

    const [file, setFile] = useState<any>();
    const [baseImage, setBaseImage] = useState<any>()

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            setFile(file)
        }
        const base64 = await convertBase64(file)
        setBaseImage(base64)
    }

    const dispatch = useDispatch()
    const updateProfile = () => {
        dispatch(updateProfileData('', baseImage))
        setBaseImage('')
    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = (() => {
                resolve(fileReader.result)
            })

            fileReader.onerror = ((error) => {
                reject(error)
            })
        })
    }

    const returnFileSize = (n: number) => {
        if (n < 1024) {
            return n + 'bytes';
        } else if (n > 1024 && n < 1048576) {
            return (n / 1024).toFixed(2) + 'KB';
        } else if (n > 1048576) {
            return (n / 1048576).toFixed(2) + 'MB';
        }
    };

    return (
        <>
            <div className={s.image_upload}>
                <label className={s.input_label}>
                    <input type="file"
                           accept=".jpg, .jpeg, .png"
                           multiple
                           className={s.photoLoad}
                           onChange={(e) => {
                               e.currentTarget.value.length !== 0 &&
                               uploadImage(e)
                           }}/>
                </label>
            </div>
            {baseImage &&
                <div className={s.btn_image_upload}>
                    <label className={s.btn_label}>
                        {
                            <input onClick={updateProfile} className={s.sentBtn}/>
                        }
                        <span className={s.file_size}>{file && returnFileSize(file.size)}</span>
                    </label>
                </div>
            }

        </>

    );
}

export default FileInput;
