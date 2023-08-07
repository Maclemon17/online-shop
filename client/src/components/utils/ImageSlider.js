import { Carousel } from 'antd'
import React from 'react'

const ImageSlider = ({ images }) => {
    return (
        <div>
            <Carousel autoplay>
                {images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '100px' }}
                            src={`http://localhost:5000/${image}`}
                            alt="productImage"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider