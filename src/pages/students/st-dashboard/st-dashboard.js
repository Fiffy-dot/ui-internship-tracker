import React from 'react';
import StudentSidebar from '../../../components/sidebar/student-sb';
import StHome from '../../../components/st-home/st-home';
import { connect } from 'react-redux';
import { SetUser } from '../../../redux/user/user.action';
import { changeCurrentPage } from '../../../redux/navigation/navigation.action';
import './st-dashboard.css';

const StDashboard = ({ changePage}) => {
    React.useEffect(() => {
        changePage("dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='student-dashboard'>
            <StudentSidebar />
            <StHome />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changeCurrentPage(page)),
    setUser: (user) => dispatch(SetUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(StDashboard);
