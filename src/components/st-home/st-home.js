import axios from 'axios';
import React from 'react';
import Table from './../table/table';
import { URLS } from "../../utils/service";
import TableApplicationBody from '../table-application-body/table-application-body';
import TableApplicationHeader from '../table-application-header/table-application-header';
import { connect } from 'react-redux';

const StHome = ({user}) => {
    const [state, setstate] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${URLS.apiBaseUrl}/studentApplicants/${user.id}`).then((data) => {
            console.log(data);
            setstate(data.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='student-home'>
            <h2 className='secondary-header mt-5'>Applications</h2>
            <Table>
                <TableApplicationHeader />
                <tbody>
                    {
                        state.map((app, key) => (
                            <TableApplicationBody key={key} app={app}/>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        page: state.navbar.page,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(StHome);