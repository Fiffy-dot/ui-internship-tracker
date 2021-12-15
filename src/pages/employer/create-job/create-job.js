import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/input-field/input-field.component';
import CustomBtn from '../../../components/custom-btn/custom-btn.component';
import DatePickerComponent from '../../../components/date-picker/date-picker';
import { URLS } from '../../../utils/service';
import axios from 'axios';
import './style.css';
import { errorMessage, successMessage, warningMessage } from '../../../components/utils/custom-toast';

const CreateJob = ({ user }) => {
    const navigate = useNavigate();
    const [state, setstate] = React.useState({
        employerId: user.id,
        title: "",
        numberCandidate: 5,
        description: "",
        position: "",
        createdDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
    })

    const handleOnChane = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    } 

    const handleSubmitButton = (e) => {
        e.preventDefault();
        console.log(state);
        if (!state.position || !state.description || !state.title) {
            warningMessage("please fill all the fields")
        }else {
            axios.post(`${URLS.apiBaseUrl}/internships`, state).then((data) => {
                successMessage("job created");
                setstate({
                    employerId: user.id,
                    title: "",
                    numberCandidate: 5,
                    description: "",
                    position: "",
                    createdDate: new Date().toISOString().split('T')[0],
                    dueDate: new Date().toISOString().split('T')[0],
                 })
            }).catch((err) => {
                console.log(err)
                errorMessage("job not created");
            })
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='create-job'>
        <div className='circle-top'></div>
        <div className='back-button'><CustomBtn classes={"signup"} handleOnClick={handleBack}>go back</CustomBtn></div>
        <form className='form'>
            <h2 className='form-title secondary-header'>create job</h2>
            <p className='text-paragraph text-center text-capitalize'>please enter jobs details</p>
            <div className='form-group'>
                <InputField 
                    name="title"
                    type="text"
                    placeholder={"job title"}
                    value={state.title}
                    autoComplete="on"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
            <div className='form-group'>
                <InputField 
                    name="position"
                    type="text"
                    placeholder={"position"}
                    value={state.position}
                    autoComplete="off"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
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
            <div className='form-group'>
                <DatePickerComponent onChange={handleOnChane} />
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

export default connect(mapStateToProps)(CreateJob);