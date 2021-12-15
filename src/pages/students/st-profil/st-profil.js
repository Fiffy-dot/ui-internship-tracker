import React from 'react';
import { connect } from 'react-redux';
import { SetUser } from '../../../redux/user/user.action';
import axios from 'axios';
import CustomButton from '../../../components/custom-btn/custom-btn.component';
import StudentSidebar from '../../../components/sidebar/student-sb';
import { changeCurrentPage } from '../../../redux/navigation/navigation.action';
import { URLS } from '../../../utils/service';
import { successMessage } from "../../../components/utils/custom-toast";
import './style.css';

const StProfil = ({ user, changePage, setUser }) => {
    const [state, setstate ] = React.useState({
        name: "",
        resumeLink: ""
    })

    React.useEffect(() => {
        changePage("profil");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSaveProfile = (e) => {
        e.preventDefault();
        console.log(user)
        const data = {}
        if (state.name !== "") {data.name = state.name }
        if (state.resumeLink !== "") {data.resumeLink = state.resumeLink}
        axios.put(`${URLS.apiBaseUrl}/student/${user.id}`, data).then((data) => {
            console.log(data);
            setUser(data.data.user);
            localStorage.setItem("auth", data.data.token);
            successMessage("user updated");

        });
    } 

    const handleOnChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value})
    }
    return (
        <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <StudentSidebar />
        </div>
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profil"/>
                <span className="font-weight-bold">{user.name.toUpperCase()}</span>
                <span className="font-weight-bold">{user.resumeLink}</span>
                <span className="text-black-50">{user.email}</span>
                <span> </span>
            </div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <label className="labels">Full name</label>
                        <input type="text" className="form-control" placeholder="enter full name" name="name" value={state.name} onChange={(e) => handleOnChange(e)}/>
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Resume</label>
                        <input type="text" className="form-control" placeholder="enter resume link" name="resumeLink" value={state.resumeLink} onChange={(e) => handleOnChange(e)}/>
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <CustomButton classes="signup" type="submit" handleOnClick={handleSaveProfile}>save profile</CustomButton>
                </div>
            </div>
        </div>
    </div>
</div>
)}


const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changeCurrentPage(page)),
    setUser: (user) => dispatch(SetUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(StProfil);
