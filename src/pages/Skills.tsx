import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, useTheme } from '@mui/material';
import { getSkills } from '../services/api';
import { ISkill } from '../types/skill';

type SkillType = 'technical' | 'tool' | 'soft';

const Skills = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        // Sort skills by type priority
        const sortedSkills = data.sort((a: ISkill, b: ISkill) => {
          const typePriority: Record<SkillType, number> = {
            technical: 1,
            tool: 2,
            soft: 3
          };
          return (typePriority[a.type as SkillType] || 999) - (typePriority[b.type as SkillType] || 999);
        });
        setSkills(sortedSkills);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skills');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/image-placeholder.png';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          My Skills
        </Typography>
        <Box sx={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          px: { xs: 2, sm: 4 }
        }}>
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill._id}>
                <Box
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    borderRadius: 2,
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 1px 3px rgba(0,0,0,0.5)' 
                      : '0 1px 3px rgba(0,0,0,0.12)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 6px rgba(0,0,0,0.6)'
                        : '0 4px 6px rgba(0,0,0,0.1)'
                    },
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src={skill.icon || '/assets/images/image-placeholder.png'} 
                      alt={skill.name}
                      onError={handleImageError}
                      style={{ 
                        width: 32,
                        height: 32,
                        objectFit: 'contain'
                      }} 
                    />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: theme.palette.text.primary,
                        fontSize: '1.25rem',
                        fontWeight: 'medium',
                        mb: 0.5,
                        lineHeight: 1.2
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem',
                        lineHeight: 1.5
                      }}
                    >
                      {skill.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Skills; 