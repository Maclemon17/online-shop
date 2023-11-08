import { Checkbox, Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { Continents } from '../../../utils/Datas';
import React, { useState } from 'react';


const CheckBox = ({ handleFilters }) => {
    const [checked, setChecked] = useState([]);


    const toggleContinent = (id) => {
        setChecked(id)
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];
       
        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilters(newChecked);
    }

    const renderCheckBox = Continents.map((continent, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => toggleContinent(continent._id)}
                type="checkbox"
                checked={checked.indexOf(continent._id) === -1 ? false : true}
            />
            <span> {continent.name} </span>
        </React.Fragment>
    ));

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <CollapsePanel header="Continent" key="1">
                    {renderCheckBox}
                </CollapsePanel>
            </Collapse>
        </div>
    )
}

export default CheckBox