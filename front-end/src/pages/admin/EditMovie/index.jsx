import React, { useEffect, useState } from 'react';
import { Table, Modal, Form, Input } from 'antd';
import { useGetMoviesQuery } from '../../../redux/MoviesSlice';
import controller from '../../../API/requests';

const EditMovie = () => {
  const { data: movies } = useGetMoviesQuery();
  const [myMovies, setMyMovies] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    if (movies) {
      setMyMovies(movies.data);
    }
  }, [movies]);

  const showEditModal = (movie) => {
    setCurrentMovie(movie);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    setMyMovies(myMovies.map(movie => (movie._id === currentMovie._id ? currentMovie : movie)));
    controller.patch('/api/movies', currentMovie._id, currentMovie)
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => showEditModal(record)}>Edit</a>

        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>

          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </span>
      ),
    },
  ];

  const handleDelete = (movieId) => {
    controller.delete('/api/movies', movieId)
    setMyMovies(myMovies.filter(movie => movie._id !== movieId));
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={myMovies}
        rowKey="_id"
      />
      {currentMovie && (
        <Modal
          title="Edit Movie"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
        >
          <Form>
            {/* name: "",
            director: "",
            bgImg: null,
            cast: "",
            genres: "",
            rating: "",
            description: "",
            runTime: "",
            releaseDate: "",
            coverImg: null,
            ageRes: "", */}

            <Form.Item label="Name">
              <Input value={currentMovie.name} onChange={(e) => setCurrentMovie({ ...currentMovie, name: e.target.value })} />
            </Form.Item>
            <Form.Item label="Description">
              <Input value={currentMovie.description} onChange={(e) => setCurrentMovie({ ...currentMovie, description: e.target.value })} />
            </Form.Item>
            <Form.Item label="Director">
              <Input value={currentMovie.director} onChange={(e) => setCurrentMovie({ ...currentMovie, director: e.target.value })} />
            </Form.Item>
            <Form.Item label="Cast">
              <Input value={currentMovie.cast} onChange={(e) => setCurrentMovie({ ...currentMovie, cast: e.target.value })} />
            </Form.Item>
            <Form.Item label="Rating">
              <Input value={currentMovie.rating} onChange={(e) => setCurrentMovie({ ...currentMovie, rating: e.target.value })} />
            </Form.Item>
            <Form.Item label="Run Time">
              <Input value={currentMovie.runTime} type='number' onChange={(e) => setCurrentMovie({ ...currentMovie, runTime: e.target.value })} />
            </Form.Item>
            <Form.Item label="Release Date">
              <Input value={currentMovie.releaseDate} onChange={(e) => setCurrentMovie({ ...currentMovie, releaseDate: e.target.value })} />
            </Form.Item>
            <Form.Item label="Age Restriction">
              <Input value={currentMovie.ageRes} type='number' onChange={(e) => setCurrentMovie({ ...currentMovie, ageRes: e.target.value })} />
            </Form.Item>

          </Form>
        </Modal>
      )}
    </div>
  );
};

export default EditMovie;
