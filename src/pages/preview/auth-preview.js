import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/custom-btn/custom-btn.component';
import './auth-preview.css';

const AuthPreview = ({action}) => {
    const navigate = useNavigate();
    const handleStudent = () => {
        navigate(`/student/${action}`);
    }

    const handleEmployer = () => {
        navigate(`/employer/${action}`);
    }
    return (
        <div className='auth-preview'>
            <div className='circle-top'></div>
            <h2 className='secondary-header'>Internship Tracker</h2>
            <h2 className='secondary-header auth-title'>user type</h2>
            <p className='text-paragraph left-align center auth-text'>
                Please select your type
            </p>
            <div className='user-type mt-5'>
                <CustomButton
                    type={'button'}
                    classes={'dark'}
                    handleOnClick={handleStudent}
                >student</CustomButton>
                <CustomButton
                    type={'button'}
                    classes={'dark'}
                    handleOnClick={handleEmployer}
                >Employer</CustomButton>
            </div>
            <div className='circle-bottom'></div>
        </div>
    )
};

export default AuthPreview;