import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../../components/sidebar/sidebar';

const StJobs = ({ page }) => {
    return (
        <div className='student-jobs'>
            <Sidebar />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        page: state.navbar.page
    }
}

export default connect(mapStateToProps)(StJobs);