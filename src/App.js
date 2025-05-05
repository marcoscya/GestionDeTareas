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
  AppBar,
  Toolbar,
  Grid,
  Button,
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
      main: "#3f51b5", // Azul similar al de tu mockup
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
      },
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
  // Estado para el formulario de tarea
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "media",
    category: categories[0] || "",
  });

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

  // Manejar cambios en el formulario
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Función para añadir una nueva tarea
  const addTask = () => {
    if (!newTask.title.trim()) return;

    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "media",
      category: categories[0] || "",
    });
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

      {user && (
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              GESTOR DE TAREAS
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ mr: 2 }}>
                Bienvenido, {user.name}
              </Typography>
              <Button
                color="inherit"
                onClick={logout}
                sx={{
                  textDecoration: "underline",
                  fontWeight: "medium",
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {/*lg*/}
      <Container
        maxWidth="90%"
        sx={{
          mt: user ? 4 : 2,
          mb: 4,
          ml: "auto", //Margen izquierdo automático
          width: "90%",
          // pl: { xs: 2, sm: 4, md: 8, lg: 25 }, // Margen derecho fijo
        }}
      >
        {!user ? (
          <>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 4 }}
            >
              GESTOR DE TAREAS
            </Typography>
            <AuthComponent login={login} />
          </>
        ) : (
          <>
            <Grid
              container
              spacing={4}
              sx={{ mb: 1 /* Reducir cajas*/, justifyContent: "center" }}
            >
              {/* CAJA 1: Lado derecho - Formulario de tareas */}
              <Grid item xs={12} md={7}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: "95%",
                    width: "100%",
                    // minWidth: "800px",
                    minHeight: "600px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 3 }}
                  >
                    NUEVA TAREA
                  </Typography>

                  <TextField
                    fullWidth
                    label="Título de la tarea"
                    name="title"
                    value={newTask.title}
                    onChange={handleTaskChange}
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 1,
                      "& .MuiOutlinedInput-input": {
                        fontSize: "0.8rem", // Increase font size of the text
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Fecha límite"
                    name="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={handleTaskChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 1,
                      "& .MuiOutlinedInput-input": {
                        fontSize: "0.8rem", // Increase font size of the text
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Descripción"
                    name="description"
                    value={newTask.description}
                    onChange={handleTaskChange}
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{
                      mb: 3,
                      borderRadius: 1,
                      "& .MuiOutlinedInput-input": {
                        fontSize: "0.8rem", // Aumentar tamaño de fuente del texto
                      },
                    }}
                  />

                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Prioridad"
                        name="priority"
                        value={newTask.priority}
                        onChange={handleTaskChange}
                        variant="outlined"
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            // Esto evita que el menú se superponga con otros elementos
                            getContentAnchorEl: null,
                            // Esto limita la altura del menú desplegable
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                              },
                            },
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "0.95rem", // Aumentar tamaño de fuente del texto seleccionado
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "1rem", // Aumentar tamaño de fuente de la etiqueta
                          },
                        }}
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Categoría"
                        name="category"
                        value={newTask.category}
                        onChange={handleTaskChange}
                        variant="outlined"
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            // Esto evita que el menú se superponga con otros elementos
                            getContentAnchorEl: null,
                            // Esto limita la altura del menú desplegable
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                              },
                            },
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "0.95rem", // Aumentar tamaño de fuente del texto seleccionado
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "1rem", // Aumentar tamaño de fuente de la etiqueta
                          },
                        }}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addTask}
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 5,
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    AÑADIR TAREA
                  </Button>
                </Paper>
              </Grid>

              {/* CAJA 2: Lado izquierdo - Búsqueda, filtros y categorías */}
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: "95%",
                    width: "100%",
                    minHeight: "600px",
                    // minWidth: "800px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                    }}
                  >
                    BUSCAR Y FILTRAR
                  </Typography>

                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="BUSCAR TAREA"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
                      borderRadius: 1,
                      "& .MuiInputBase-input": {
                        fontSize: "0.8rem",
                      },
                    }}
                  />

                  <Typography
                    variant="h7"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    FILTROS
                  </Typography>

                  <Box
                    sx={{ mb: 4, p: 5, bgcolor: "#f5f5f5", borderRadius: 2 }}
                  >
                    <Button
                      fullWidth
                      variant={filter === "all" ? "contained" : "outlined"}
                      onClick={() => setFilter("all")}
                      sx={{
                        mb: 2,
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                      }}
                    >
                      TODAS
                    </Button>
                    <Button
                      fullWidth
                      variant={filter === "active" ? "contained" : "outlined"}
                      onClick={() => setFilter("active")}
                      sx={{
                        mb: 2,
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                      }}
                    >
                      ACTIVAS
                    </Button>
                    <Button
                      fullWidth
                      variant={
                        filter === "completed" ? "contained" : "outlined"
                      }
                      onClick={() => setFilter("completed")}
                      sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                      }}
                    >
                      COMPLETAS
                    </Button>
                  </Box>

                  <Typography
                    variant="h7"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      fontSize: "0.99rem",
                    }}
                  >
                    CATEGORÍAS
                  </Typography>

                  <CategoryManager
                    categories={categories}
                    addCategory={addCategory}
                    deleteCategory={deleteCategory}
                    sx={{
                      "& .MuiButton-root": {
                        fontSize: "0.8rem", // Esto afectará a todos los botones dentro del componente
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "0.8rem", // Esto afectará a todos los inputs dentro del componente
                      },
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>

            {/* CAJA 3: Abajo - Lista de tareas */}
            <Paper
              elevation={8}
              sx={{
                p: 5,
                borderRadius: 2,
                width: "90%",
                // minWidth: "1635px",
                minHeight: "300px",
                mx: "auto",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                MIS TAREAS ({filteredTasks.length})
              </Typography>

              <TaskList
                tasks={filteredTasks}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            </Paper>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
