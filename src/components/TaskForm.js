import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TaskForm = ({ addTask, categories }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "media",
    dueDate: "",
    category: categories[0] || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    addTask(task);
    setTask({
      title: "",
      description: "",
      priority: "media",
      dueDate: "",
      category: categories[0] || "",
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título de la tarea"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={task.description}
            onChange={handleChange}
            multiline
            rows={2}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Prioridad</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              label="Prioridad"
            >
              <MenuItem value="baja">Baja</MenuItem>
              <MenuItem value="media">Media</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Fecha límite"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="category"
              value={task.category}
              onChange={handleChange}
              label="Categoría"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Añadir Tarea
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
