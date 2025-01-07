import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<AddTask />}/>
  <Route path="/tasks" element={<TaskList />}/>
</Routes>
    </Router>
  );
}

export default App;
