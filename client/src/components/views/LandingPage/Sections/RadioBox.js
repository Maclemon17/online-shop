import { Collapse, Radio } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import RadioGroup from 'antd/lib/radio/group';
import React, { useState } from 'react'
import { PriceList } from '../../../utils/Datas';


const RadioBox = ({ handleFilters }) => {
    const [priceValue, setPriceValue] = useState(0);


    const renderRadioBox = PriceList.map((price) => (
        <Radio key={price._id} value={price._id}>{price.name}</Radio>
    ));


    const handlePriceChange = (e) => {
        console.log(e.target.value);
        setPriceValue(e.target.value);

        handleFilters(e.target.value);
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <CollapsePanel header="Price" key="1">
                    <RadioGroup onChange={handlePriceChange} value={priceValue}>
                        {renderRadioBox}
                    </RadioGroup>
                </CollapsePanel>
            </Collapse>
        </div>
    )
}

export default RadioBox