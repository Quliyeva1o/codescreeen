import React, { useEffect, useState } from 'react'
import { useGetMoviesQuery } from '../../../redux/MoviesSlice';
import {Table } from 'antd';

import {Link} from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const AddTrailer = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action 1',
            key: 'action1',
            render: (_, record) => (
                <Link to={`/admin/add-trailers/${record._id}`}>Add Trailer</Link>
            ),
        }
    ];


    const { data: movies } = useGetMoviesQuery();
    const [myMovies, setMyMovies] = useState([])
    useEffect(() => {
        movies && setMyMovies(movies.data)
    }, [movies]);
  
    return (
        <>
            <Table columns={columns} dataSource={myMovies} />

        </>
    )

}
export default AddTrailer;