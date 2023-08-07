import { Icon, Input } from 'antd'
import Axios from 'axios'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const FileUpload = (props) => {
    const [images, setImages] = useState([]);

    const onDrop = async (files) => {
        let formData = new FormData();

        formData.append("file", files[0])
        
        // Save to the server 
        try {
            const response = await Axios.post("/api/product/uploadImage", formData, {
                header: { 'content-type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setImages([...images, response.data.image]);
                props.refreshFunction([...images, response.data.image]);
            }
           
        } catch (error) {
            console.log(error);
        }

    }

    const onDelete = (image) => {
        const currentIndex =    images.indexOf(image);
        
        let newImages = [...images];
        newImages.splice(currentIndex, 1);

        setImages(newImages)
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={80000000}
            >

                {
                    ({ getRootProps, getInputProps }) => (
                        <div style={{
                            width: '300px', height: '240px', border: '1px solid lightgray',
                            display: "flex", alignItems: 'center', justifyContent: 'center'
                        }}
                            {...getRootProps()}
                        >
                            <Input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    )
                }
            </Dropzone>

            {/* imge stacks */}

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {
                    images.map((image, index) => (
                        <div key={index} onClick={() => onDelete(image)}>
                            <img
                                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                src={`http://localhost:5000/${image}`}
                                alt={`product-img${index}`}
                            />
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default FileUpload