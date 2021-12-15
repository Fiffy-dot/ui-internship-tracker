import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/input-field/input-field.component';
import CustomBtn from '../../components/custom-btn/custom-btn.component';
import axios from 'axios';
import { URLS } from '../../utils/service';
import './signup.style.css';
import { errorMessage, successMessage, warningMessage } from '../../components/utils/custom-toast';

const SignUp = ({ type }) => {
    const navigate = useNavigate();
    const [state, setstate] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
    });

    const handleOnChane = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmitButton = (e) => {
        e.preventDefault();
        // don't send confirm password
        if (state.confirmPassword !== state.password) {
            warningMessage("password does not match");
        } else if (!state.email || state.email === "") {
            warningMessage("email is required");
        } else if (!state.name || state.name === "") {
            warningMessage("name is required");
        }else {
            let data = {name: state.name,
                password: state.password,
                email: state.email, 
                };
            type !== "student" ? delete data["resumeLink"] : data["resumeLink"] = "http"; 
            axios.post(
                `${URLS.apiBaseUrl}/${type}/register`, data
                ).then((data) => {
                    if (data.data.status === "ok") {
                        successMessage("User successfully created")
                        navigate(`/${type}/login`)
                    } else {
                        errorMessage(data.data.error)
                    }
                }).catch(err => {
                    console.log(err)
                    errorMessage("Could not create user")
                })
        }
        // vaidate
        
    }

    return (
        <div className='sign-up'>
        <div className='circle-top'></div>
        <form className='form'>
            <h2 className='form-title secondary-header'>sign up</h2>
            <p className='text-paragraph text-center text-capitalize'>please enter your name, email and password here</p>
            <div className='form-group'>
                <InputField 
                    name="name"
                    type="text"
                    placeholder={"full name"}
                    value={state.name}
                    autoComplete="on"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
            <div className='form-group'>
                <InputField 
                    name="email"
                    type="email"
                    placeholder={"email address"}
                    value={state.email}
                    autoComplete="on"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
            <div className='form-group'>
                <InputField 
                    name="password"
                    type="password"
                    placeholder={"password"}
                    value={state.password}
                    autoComplete="off"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
            <div className='form-group'>
                <InputField 
                    name="confirmPassword"
                    type="password"
                    placeholder={"confirm password"}
                    value={state.confirmPassword}
                    autoComplete="off"
                    required={true}
                    handleOnChange={handleOnChane}
                />
            </div>
            <div className='form-group'>
                <p className='left-align form-link'>
                    <a href={`${URLS.apiBaseUrl}/forgot`}>Already have an account? login</a>
                </p>
            </div>

            <div className='signup-btn'>
            <CustomBtn 
                classes={'signup'} 
                type={'button'}
                handleOnClick={handleSubmitButton}
            >
                sign up
            </CustomBtn>
        </div>
        </form>
        <div className='circle-bottom'></div>
        </div>
    )
};

export default SignUp;