import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Función para añadir una nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  // Función para marcar una tarea como completada
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Gestor de Tareas
          </Typography>
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
