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

const StViewJob = ({ user, changePage }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [state, setstate] = React.useState({
        data: []
    })

    React.useEffect(() => {
        changePage("jobs");
        axios.get(`${URLS.apiBaseUrl}/internships/${params.id}`).then((data) => {
            console.log(data)
            setstate({ data: data.data });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBack = () => {
        navigate(-1);
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`http://localhost:5000/student/job/${params.id}`)
        alert("link copied")
    }

    const handleApply = () => {
        const data = {
            name: user.name,
            email: user.email,
            employerId: state.data.employerId, 
            jobId: state.data._id, 
            studentId: user.id, 
            resumeLink: user.resumeLink
        }
        console.log(data);
        axios.post(`${URLS.apiBaseUrl}/createApplication`, data).then((data) => {
            console.log(data)
            if (data.status === 200) {
                successMessage("you have successfully applied")
            } else {
                errorMessage("Applicationfailed");
            }
        })
    }

    return (
        <div className='view-single-job splited'>
        <div className='back-button'><CustomBtn classes={"signup"} handleOnClick={handleBack}>go back</CustomBtn></div>
            <StudentSidebar />
            <div className='view-one-job'>
                <div className='apply-button'>
                <CustomBtn classes={"signup primary"} type={"button"} handleOnClick={handleApply}>apply</CustomBtn>
                    <CustomBtn classes={"signup primary"} type={"button"} handleOnClick={handleShare}> <i class="fas fa-share-square"></i> share</CustomBtn>
                </div>
                <div>
                    <h2 className='secondary-header title'>{ state.data ? state.data.title : "" }</h2>
                    <p className='text-paragraph position'>{ state.data ? state.data.position : "" }</p>
                    <p className='text-paragph due-date'>Deadline: { state.data ? state.data.dueDate : "" }</p>
                    <p className='text-paragraph'> { state.data ? state.data.description : "" }</p>
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


export default connect(mapStateToProps, mapDispatchToProps)(StViewJob);