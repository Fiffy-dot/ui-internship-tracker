import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/input-field/input-field.component';
import CustomBtn from '../../components/custom-btn/custom-btn.component';
import { URLS } from '../../utils/service';
import './login-page.style.css';
import { SetUser } from '../../redux/user/user.action';
import { connect } from 'react-redux';
import { errorMessage, successMessage } from '../../components/utils/custom-toast';

const Login = ({type, setUser }) => {
    const navigate = useNavigate();
    const [state, setstate] = useState({
        email: "",
        password: ""
    })

    const handleOnChane = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    };

    const handleGoToSignup = () => { navigate(`/${type}/signup`) }

    const handleSubmitButton = (e) => {
        e.preventDefault();
        axios.post(`${URLS.apiBaseUrl}/${type}/login`, state).then((data) => {
            console.log(data.data)
            if (data.data.status === true) {
                setUser(data.data.user);
                localStorage.setItem("auth", data.data.token)
                successMessage(data.data.message)
                navigate(`/${type}/dashboard`)
            } else {
                errorMessage(data.data.error)
            }
        }).catch(err => {
            console.log(err)
            errorMessage("Internal Error")
        })
    }

    return (
        <div className='login-page'>
            <div className='circle-top'></div>
            <form className='form'>
                <h2 className='form-title secondary-header'>login</h2>
                <p className='text-paragraph text-center text-capitalize'>please enter your email and password here</p>
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
                    <p className='left-align form-link'>
                        <a href={`${URLS.apiBaseUrl}/forgot`}>forgot password</a>
                    </p>
                </div>

                <div className='login-btn'>
                    <CustomBtn 
                        classes={'overlay login'} 
                        type={'submit'}
                        handleOnClick={handleSubmitButton}
                    >
                        login
                    </CustomBtn>
                </div>
                <div className='signup-btn'>
                <CustomBtn 
                    classes={'signup'} 
                    type={'button'}
                    handleOnClick={handleGoToSignup}
                >
                    sign up
                </CustomBtn>
            </div>
            </form>
            <div className='circle-bottom'></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(SetUser(user))
})

export default connect(null, mapDispatchToProps)(Login);