import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomBtn from '../../../components/custom-btn/custom-btn.component';
import { URLS } from '../../../utils/service';
import axios from 'axios';
import './style.css';
import { errorMessage, successMessage } from '../../../components/utils/custom-toast';
import "./style.css";

const UpdateJob = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [state, setstate] = React.useState({
        description: "",
    })

    const handleOnChane = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    } 

    const handleSubmitButton = (e) => {
        e.preventDefault();
        console.log(state);
        if (state.description){
            axios.put(`${URLS.apiBaseUrl}/internships/${params.id}`, {description: state.description}).then((data) => {
                successMessage("job updated");
            }).catch((err) => {
                console.log(err)
                errorMessage("job not updated");
            })
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='main-main-page'>
        <div className='circle-top'></div>
        <div className='back-button'><CustomBtn classes={"signup"} handleOnClick={handleBack}>go back</CustomBtn></div>
        <form className='form'>
            <h2 className='form-title secondary-header'>update job description</h2>
            <p className='text-paragraph text-center text-capitalize'>please enter jobs details</p>
            <div className='form-group'>
                <textarea 
                    className='text-area'
                    rows="4" cols="50"
                    name="description"
                    placeholder={"description"}
                    autoComplete="off"
                    required={true}
                    onChange={(e) => handleOnChane(e)}
                    value={state.description}
                />
            </div>
            <div className='login-btn'>
                <CustomBtn 
                    classes={'overlay login'} 
                    type={'submit'}
                    handleOnClick={handleSubmitButton}
                >
                    submit
                </CustomBtn>
            </div>
        </form>
        <div className='circle-bottom'></div>
        </div>
    )
};

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps)(UpdateJob);