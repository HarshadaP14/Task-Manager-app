import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Badge,
  Row,
  Col,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completionRate = tasks.length
    ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <div className="text-end mb-5">
        <Button variant="primary" onClick={() => navigate("/")}>
          Add New Task
        </Button>
      </div>
      <Card className="shadow">
        <Card.Body>
          <h1 className="text-center mb-4">
            Manage Tasks
            {tasks.length > 0 && (
              <Badge bg="info" className="ms-2">
                {tasks.length}
              </Badge>
            )}
          </h1>

          {/* Statistics Dashboard */}
          <Row className="mb-4">
            <Col>
              <Card className="bg-light">
                <Card.Body>
                  <Row className="text-center">
                    <Col>
                      <h6>Total</h6>
                      <h3>{tasks.length}</h3>
                    </Col>
                    <Col>
                      <h6>Completed</h6>
                      <h3>{tasks.filter((t) => t.completed).length}</h3>
                    </Col>
                    <Col>
                      <h6>Pending</h6>
                      <h3>{tasks.filter((t) => !t.completed).length}</h3>
                    </Col>
                  </Row>
                  <ProgressBar
                    now={completionRate}
                    label={`${completionRate}%`}
                    variant="success"
                    className="mt-3"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Filter Buttons */}
          <div className="mb-3">
            <Button
              variant={filter === "all" ? "primary" : "outline-primary"}
              onClick={() => setFilter("all")}
              className="me-2"
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "primary" : "outline-primary"}
              onClick={() => setFilter("active")}
              className="me-2"
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "primary" : "outline-primary"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>

          {/* Task List */}
          <ListGroup>
            {filteredTasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between align-items-center"
              >
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  label={
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "gray" : "black",
                      }}
                    >
                      {task.text}
                    </span>
                  }
                />
                <div>
                  <Badge
                    bg={task.completed ? "success" : "warning"}
                    className="me-2"
                  >
                    {task.completed ? "Done" : "Not Done"}
                  </Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskList;
