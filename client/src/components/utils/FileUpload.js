import { Icon, Input } from 'antd'
import Axios from 'axios'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const FileUpload = (props) => {
    const [images, setImages] = useState([]);
    
    const onDrop = async (files) => {
        let formData = new FormData();

        formData.append("file", files[0])

        console.log(formData);
        // Save to the server 
        try {
            const response = await Axios.post("/api/product/uploadImage", formData, {
                header: { 'content-type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setImages([...images, response.data.image]);
                props.refreshFunction([...images, response.data.image]);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }

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

                <div>
                    <img />

                </div>

            </div>
        </div>
    )
}

export default FileUpload