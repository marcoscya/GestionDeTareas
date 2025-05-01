import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
  // Función para obtener el color de la prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "error";
      case "media":
        return "warning";
      case "baja":
        return "success";
      default:
        return "default";
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "PPP", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Mis Tareas ({tasks.length})
      </Typography>

      {tasks.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ my: 4 }}
        >
          No hay tareas pendientes. ¡Añade una nueva tarea!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    color="primary"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed
                          ? "text.disabled"
                          : "text.primary",
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        style={{
                          display: "block",
                          marginTop: 4,
                          marginBottom: 8,
                        }}
                      >
                        {task.description}
                      </Typography>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        <Chip
                          label={`Prioridad: ${task.priority}`}
                          size="small"
                          color={getPriorityColor(task.priority)}
                        />
                        {task.dueDate && (
                          <Chip
                            label={`Fecha límite: ${formatDate(task.dueDate)}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        {task.category && (
                          <Chip
                            label={`Categoría: ${task.category}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </div>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTask(task.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TaskList;
