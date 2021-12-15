import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableJobBody = ({ job }) => {
    const navigate = useNavigate();
    const handleOnClikc = () => {
        navigate(`/employer/job/${job._id}`)
    }
    return (
        <tr onClick={handleOnClikc}>
            <th scope="row">{job.title}</th>
            <td>{job.position}</td>
            <td>{job.createdDate}</td>
            <td>{job.dueDate}</td>
        </tr>
    )
}

export default TableJobBody;