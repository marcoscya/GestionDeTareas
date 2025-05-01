import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  Collapse,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CategoryManager = ({ categories, addCategory, deleteCategory }) => {
  const [newCategory, setNewCategory] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <Paper sx={{ mb: 3, p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setExpanded(!expanded)}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h6">Categorías</Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box mt={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onDelete={() => deleteCategory(category)}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: "1.1rem",
                }}
              />
            ))}
          </Stack>

          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Nueva categoría"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.1rem",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
              sx={{
                fontSize: "1rem",
              }}
            >
              Añadir
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default CategoryManager;
