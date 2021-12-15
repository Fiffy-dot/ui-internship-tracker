import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableApplicationBody = ({ app }) => {
    const navigate = useNavigate();
    const handleOnClikc = () => {
        navigate(`/application/${app._id}`)
    }
    return (
        <tr onClick={handleOnClikc}>
            <th scope="row">{app.name}</th>
            <td>{app.email}</td>
            <td>{app.resumeLink}</td>
            <td>{app.status}</td>
        </tr>
    )
}

export default TableApplicationBody;