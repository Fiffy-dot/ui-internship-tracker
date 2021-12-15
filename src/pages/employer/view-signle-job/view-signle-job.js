import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/sidebar';
import TableApplicationBody from '../../../components/table-application-body/table-application-body';
import TableApplicationHeader from '../../../components/table-application-header/table-application-header';
import Table from '../../../components/table/table';
import CustomBtn from '../../../components/custom-btn/custom-btn.component';
import { URLS } from '../../../utils/service';
import'./style.css';
import { infoMessage, successMessage } from "../../../components/utils/custom-toast";

const ViewSingleJob = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [state, setstate] = React.useState({
        data: [],
        apps: []
    })

    React.useEffect(() => {

        axios.get(`${URLS.apiBaseUrl}/employer/job/view/${params.id}`).then((data) => {
            setstate({
                data: data.data.job[0],
                apps: data.data.applications
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteJob = () => {
        console.log(state.data._id);
        axios.delete(`${URLS.apiBaseUrl}/internships/${state.data._id}`).then((data) =>{
            if (data.status === 200) {
                successMessage("job deleted deleted")
                navigate("/employer/dashboard");
            } else {
                infoMessage("Job was not deleted")
            }
        })
    }

    const handleUpdate = () => {
        navigate(`/employer/job/update/${state.data._id}`)
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='view-single-job splited'>
        <div className='back-button'><CustomBtn classes={"signup"} handleOnClick={handleBack}>go back</CustomBtn></div>
            <Sidebar />
            <div className='view-one-job'>
                <div className='update-button'>
                    <CustomBtn classes={"signup primary"} type={"button"} handleOnClick={handleUpdate}>update job application</CustomBtn>
                </div>
                <div>
                    <h2 className='secondary-header title'>{ state.data.title }</h2>
                    <p className='text-paragraph position'>{ state.data.position }</p>
                    <p className='text-paragph due-date'>Deadline: { state.data.dueDate }</p>
                    <p className='text-paragraph'> { state.data.description }</p>
                    <div className='delete' onClick={handleDeleteJob}><i className="fas fa-trash-alt"></i></div>
                </div>
                <h2 className='secondary-header mt-5'>Applications</h2>
                <Table>
                    <TableApplicationHeader />
                    <tbody>
                        {
                            state.apps.map((app, key) => (
                                <TableApplicationBody app={app} key={key} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
};

export default ViewSingleJob;