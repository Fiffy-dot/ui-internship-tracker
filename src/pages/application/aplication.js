import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentSidebar from '../../components/sidebar/student-sb';
import CustomBtn from '../../components/custom-btn/custom-btn.component';
import { URLS } from '../../utils/service';
import'./style.css';
import { errorMessage, successMessage } from "../../components/utils/custom-toast";
import { connect } from 'react-redux';
import { SetUser } from '../../redux/user/user.action';
import { changeCurrentPage } from '../../redux/navigation/navigation.action';

const Application = ({ user, changePage }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [state, setstate] = React.useState({
        data: []
    })

    React.useEffect(() => {
        changePage("dashboard");
        axios.get(`${URLS.apiBaseUrl}/application/${params.id}`).then((data) => {
            console.log(data.data[0])
            setstate({ data: data.data[0] });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBack = () => {
        navigate(-1);
    }

    const updateApplication = () => {
        if (user.type === "employer") {
            let person = prompt("Please enter the new status");
            axios.put(`${URLS.apiBaseUrl}/applications/${params.id}`, { status: person}).then((data) => {
                if (data.status === 200) {
                    successMessage("data updated");
                    navigate("/employer/dashboard")
                } else {
                    errorMessage("data not updated")
                }
            })
        }
    }

    const deleteApplication = () => {
        if (user.type === "student") {
            axios.delete(`${URLS.apiBaseUrl}/applications/${params.id}`).then((data) => {
                if (data.status === 200) {
                    successMessage("data deleted successfully")
                    navigate("/student/dashboard");
                } else {
                    errorMessage("application not deleted")
                }
            })
        }
    }

    return (
        <div className='view-single-job splited'>
        <div className='back-button'><CustomBtn classes={"signup"} handleOnClick={handleBack}>go back</CustomBtn></div>
            <StudentSidebar />
            <div className='view-one-job'>
                <div className='apply-button'>
                {
                    user.type === "student" ?
                    <CustomBtn classes={"signup primary"} type={"button"} handleOnClick={deleteApplication}>delete</CustomBtn>
                    :
                    <CustomBtn classes={"signup primary"} type={"button"} handleOnClick={updateApplication}>update</CustomBtn>
                }
                </div>
                <div>
                    <h2 className='secondary-header title'>{ state.data ? state.data.name : "" }</h2>
                    <p className='text-paragraph position'>{ state.data ? state.data.email : "" }</p>
                    <p className='text-paragph due-date'>Resume: { state.data ? state.data.resumeLink : "" }</p>
                    <p className='text-paragraph'> { state.data ? state.data.status : "" }</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changeCurrentPage(page)),
    setUser: (user) => dispatch(SetUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(Application);