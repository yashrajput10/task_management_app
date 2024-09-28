import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Stack, Row, Col, Container } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { Navigate } from "react-router-dom";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h1>{taskTitle}</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </Col>
      </Row>

      <Row>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <Col key={task._id} lg={3} md={4} sm={6}>
              <Card className="mb-4" style={{ minHeight: '400px' }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Stack gap={2}>
                    <Card.Title className="mb-2 border border-white-3 p-2" style={{ height: '50px' }}>
                      {task.title.length <= 40 ? task.title : task.title.slice(0, 40) + '...'}
                    </Card.Title>
                    <Card.Text>
                      {task.description.length <= 300 ? task.description : task.description.slice(0, 300) + '...'}
                    </Card.Text>
                  </Stack>
                  <Stack direction="horizontal" className="justify-content-end  p-1 border" gap={2}>
                    <MdEdit onClick={() => handleUpdateModalShow(task._id)} className="fs-3" />
                    <MdDelete onClick={() => deleteTask(task._id)} className="fs-3" />
                    <FaEye onClick={() => handleViewModalShow(task._id)} className="fs-3" />
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h2>No tasks available for {taskTitle}</h2>
        )}
      </Row>

      {/* Modals */}
      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </Container>

  );
};

export default Home;
