import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CategoryManager from "./components/CategoryManager";
import AuthComponent from "./components/AuthComponent";

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
  // Estado para el filtro actual
  const [filter, setFilter] = useState("all");
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para las categorías
  const [categories, setCategories] = useState([
    "Personal",
    "Trabajo",
    "Estudio",
  ]);
  // Estado para el usuario autenticado
  const [user, setUser] = useState(null);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Guardar categorías en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

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

  // Función para añadir una nueva categoría
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Filtrar tareas según el filtro actual y término de búsqueda
  const filteredTasks = tasks.filter((task) => {
    // Filtro por estado (completado/pendiente/todos)
    if (filter === "completed" && !task.completed) return false;
    if (filter === "active" && task.completed) return false;
    if (filter === "category" && task.category !== filter) return false;

    // Filtro por búsqueda
    if (
      searchTerm &&
      !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Gestor de Tareas
          </Typography>

          {!user ? (
            <AuthComponent login={login} />
          ) : (
            <>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Typography variant="subtitle1" mr={2}>
                  Bienvenido, {user.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  Cerrar sesión
                </Typography>
              </Box>

              <Paper sx={{ mb: 3, p: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Tabs
                  value={filter}
                  onChange={(e, newValue) => setFilter(newValue)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Todas" value="all" />
                  <Tab label="Activas" value="active" />
                  <Tab label="Completadas" value="completed" />
                </Tabs>
              </Paper>

              <CategoryManager
                categories={categories}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
              />

              <TaskForm addTask={addTask} categories={categories} />

              <TaskList
                tasks={filteredTasks}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
