import React from 'react';
import axios from 'axios';
import { URLS } from '../../../utils/service';
import { connect } from 'react-redux';
import StudentSidebar from '../../../components/sidebar/student-sb';
import JobTableHeader from '../../../components/table-job-header/table-job-header';
import Table from '../../../components/table/table';
import StTableJobBody from '../../../components/student/table-body';
import './style.css';
import { changeCurrentPage } from '../../../redux/navigation/navigation.action';

const StJobs = ({ page, user, changePage }) => {
    const [state, setstate] = React.useState([]);

    React.useEffect(() => {
        changePage("jobs")
        axios.get(`${URLS.apiBaseUrl}/internships/`).then((data) => {
            console.log(data);
            setstate(data.data);
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='student-jobs splited'>
            <StudentSidebar />
            <div className="student-job">
                <h2 className='secondary-header mt-5'>Internships</h2>
                <Table>
                    <JobTableHeader />
                    <tbody>
                        {
                            state.map((job, key) => (
                                <StTableJobBody key={key} job={job} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        page: state.navbar.page,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePage: (page) => dispatch(changeCurrentPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StJobs);