import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";


function Header({
  setTasks,
  setIsAuthenticated,
  isAuthenticated,
  setTaskTitle,
}) {
  const [allTasks, setAllTasks] = useState([]);
  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks); // Update tasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  return (
    <Navbar expand="lg p-4" className={`bg-dark ${!isAuthenticated ? 'd-none' : ''}`} variant="dark">
    <Container>
      <Navbar.Brand href="/">TASK MANAGER</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
          <Link to="/" className="nav-link text-light">
            Home
          </Link>

          <NavDropdown title="Filter Tasks" id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={() => filterTasks('all')}>
              All Tasks
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => filterTasks('completed')}>
              Completed Tasks
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => filterTasks('incomplete')}>
              Incomplete Tasks
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => filterTasks('archived')}>
              Archived Tasks
            </NavDropdown.Item>
          </NavDropdown>

          <Link to="/profile" className="nav-link text-light">
            Profile
          </Link>
        </Nav>

        <Button
          variant="outline-light"
          className="ms-lg-2"
          onClick={handleLogout}
        >
          LOGOUT
        </Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
