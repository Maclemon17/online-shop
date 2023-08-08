import { Button, Input, Select, Typography } from 'antd';
import { Form } from 'formik';
import React, { useState } from 'react'
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antartica" },

];

const { Title } = Typography;
const { TextArea } = Input;

const UploadProductPage = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPriceChange = (e) => {
        setPrice(e.currentTarget.value);
    }

    const onContinentChange = (e) => {
        setContinent(e);
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const uploadProduct = async (e) => {
        e.preventDefault();

        if (!title || !description || !price || images.length < 1 || !continent) {
            return alert("Fields cannot be blank")
        }

        const values = {
            writer: props.user.userData._id,
            title: title,
            description: description,
            price: price,
            images: images,
            continent: continent,

        }

        // send request to the server
        try {
            const response = await Axios.post("/api/product/uploadProduct", values);

            if (response.data.success) {
                alert("Product Uploaded Sucessfully");
                props.history.push('/')
            } else {
                alert('Unable to upload Product')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upoad Travel Product</Title>
            </div>

            <Form onSubmit={uploadProduct}>

                {/* DROPZONE */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <div className="form-group">
                    <label level={2} htmlFor="title">Title</label>
                    <Input type="text" name="title"
                        id="title" placeholder='Product Title / Name'
                        onChange={onTitleChange}
                        value={title}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <TextArea type="text" name="desc" id="desc"
                        placeholder='Product Description'
                        onChange={onDescriptionChange}
                        value={description}
                    ></TextArea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price($)</label>
                    <Input type="number" name="price" id="price"
                        placeholder='Product Price'
                        onChange={onPriceChange}
                        value={price}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="continents">Continent</label>
                    <Select name="continents" id="continent"
                        placeholder="Select Continent"
                        onChange={onContinentChange}>
                        {
                            Continents.map(continent => (
                                <Select.Option key={continent.key} value={continent.key}>
                                    {continent.value}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <br />
                <Button onClick={uploadProduct}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadProductPage