import './MyPlans.css';
import { FaRegEdit, FaCheckCircle, FaArrowAltCircleRight } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from 'react';

export const MyPlans = ({ text, updatingInput, deletePlan }) => {

const [ done, setDone ] = useState(false);

const handleOnClick = () => {
    setDone(!done);
}

    return (
        <div className='PlansContainer'>
            <div className='parContainer'>
                { done ? <FaCheckCircle /> : <FaArrowAltCircleRight /> }
                <p className={`planItem ${done ? 'struckThrough' : ''}`} onClick={handleOnClick}>{ text }</p>
            </div>
            <div className='iconsContainer'>
                <FaRegEdit className='iconHover' onClick={ updatingInput } />
                <MdDeleteOutline className='iconHover' onClick={ deletePlan } />
            </div>
        </div>
    )
}

