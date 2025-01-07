import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [newTask, setNewTask] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
      setNewTask("");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Card className="shadow">
        <Card.Body>
          <h1 className="text-center mb-4">Add New Task</h1>

          {showSuccess && (
            <Alert variant="success" className="mb-3">
              Task added successfully!
            </Alert>
          )}

          <Form onSubmit={addTask}>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task description"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                Add Task
              </Button>
              <Button variant="secondary" onClick={() => navigate("/tasks")}>
                View All Tasks
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTask;
