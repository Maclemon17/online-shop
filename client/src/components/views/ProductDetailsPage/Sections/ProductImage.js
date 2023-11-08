import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'


const ProductImage = ({ details }) => {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        const { images } = details;
        
        if (images && images.length > 0) {
            let gallery = [];

            images && images.map(image => {
                gallery.push({
                    original: `http://localhost:5000/${image}`,
                    thumbnail: `http://localhost:5000/${image}`
                })
            });

            setProductImages(gallery)
        }

    }, [details])

    return (
        <div>
            <ImageGallery items={productImages} />
        </div>
    )
}

export default ProductImage