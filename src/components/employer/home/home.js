import React from 'react';
import Table from '../../table/table';
import Header from '../../header/header';
import JobTableHeader from '../../table-job-header/table-job-header';
import TableJobBody from '../../table-job-body/table-job-body';
import { URLS } from '../../../utils/service';
import CustomButton from '../../custom-btn/custom-btn.component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import { changeCurrentPage } from "../../../redux/navigation/navigation.action";

const Home = ({user, changePage}) => {
    const navigate = useNavigate();
    const [state, setstate] = React.useState([]);
    React.useEffect(() => {
        changePage("dashboard")
        axios.get(`${URLS.apiBaseUrl}/employer/job/${user.id}`).then((data) => {
            console.log(">>>", data);
            setstate(data.data);
        })
        console.log("after execution")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        navigate('/employer/jobs/create/')
    }
    return (
        <div className='em-home'>
            <Header />
            <div className='home-table'>
                <div className='create-job-btn'>
                    <CustomButton classes={"dark"} handleOnClick={handleClick}>
                    create job
                    </CustomButton>
                </div>
                <Table>
                    <JobTableHeader />
                    <tbody>
                        {
                            state.map(( job, idx ) => (
                                <TableJobBody key={idx} job={job}/>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispacthToProps = dispatch => ({
    changePage: (page) => dispatch(changeCurrentPage(page))
})

export default connect(mapStateToProps, mapDispacthToProps)(Home);