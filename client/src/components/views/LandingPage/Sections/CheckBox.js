import { Checkbox, Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React, { useState } from 'react';


const Continents = [
    { "_id": 1, "name": "Africa" },

    { "_id": 2, "name": "Europe" },

    { "_id": 3, "name": "Asia" },

    { "_id": 4, "name": "North America" },

    { "_id": 5, "name": "South America" },

    { "_id": 6, "name": "Australia" },

    { "_id": 7, "name": "Antartica" },

];


const CheckBox = () => {
    const [checked, setChecked] = useState([]);


    const toggleContinent = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(newChecked);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked)
    }

    const renderCheckBox = Continents.map((continent, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => toggleContinent(continent._id)}
                type="checkbox"
                checked
            />
            <span>{continent.name}</span>
        </React.Fragment>
    ));

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <CollapsePanel key="1">
                    {renderCheckBox}
                </CollapsePanel>
            </Collapse>
        </div>
    )
}

export default CheckBox