import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActions, Button, Chip, ToggleButton, ToggleButtonGroup, useTheme, useMediaQuery } from '@mui/material';
import { getProjects } from '../services/api';
import { Project } from '../types/project';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const theme = useTheme();

  const categories = [
    'all',
    'Android App',
    'iOS App',
    'Cross-platform App',
    'Web development',
    'UX/UI'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string,
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Projects
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="project category"
            size="small"
            sx={{ gap: 1, flexWrap: 'wrap' }}
          >
            {categories.map((category) => (
              <ToggleButton 
                key={category} 
                value={category}
                sx={{
                  textTransform: 'none',
                  px: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '4px',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      borderColor: theme.palette.primary.dark,
                    },
                  },
                }}
              >
                {category === 'all' ? 'All Projects' : category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {filteredProjects.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            color: theme.palette.text.secondary 
          }}>
            <Typography variant="h6">
              No projects found!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={project.category}
                        size="small"
                        sx={{ 
                          mr: 1,
                          mb: 1,
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText
                        }}
                      />
                      {project.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{ 
                            mr: 1,
                            mb: 1,
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    {project.githubUrl && (
                      <Button
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="small"
                        startIcon={<LanguageIcon />}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Projects; 