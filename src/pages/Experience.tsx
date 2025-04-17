import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';
import { getExperiences } from '../services/api';
import { IExperience } from '../types/experience';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const Experience = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        const sortedData = data.sort((a: IExperience, b: IExperience) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        setExperiences(sortedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experiences');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const educationExperiences = experiences.filter(exp => exp.type === 'education');

  const TimelineSection = ({ title, items }: { title: string, items: IExperience[] }) => (
    <Box sx={{ mb: 10 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        {title}
      </Typography>
      <Box sx={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '50%',
          width: '2px',
          height: '100%',
          background: theme.palette.divider,
          transform: 'translateX(-50%)',
          display: { xs: 'none', md: 'block' }
        }
      }}>
        {items.map((experience, index) => (
          <Box
            key={experience._id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'flex-start', md: index % 2 === 0 ? 'flex-start' : 'flex-end' },
              alignItems: { xs: 'stretch', md: 'flex-start' },
              position: 'relative',
              mb: 8,
              '&:last-child': {
                mb: 0
              }
            }}
          >
            {/* Timeline icon - for mobile, appears above content */}
            <Box
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                top: { xs: 0, md: 12 },
                left: { xs: 0, md: '50%' },
                width: { xs: '100%', md: 48 },
                height: { xs: 'auto', md: 48 },
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 2, md: 0 },
                zIndex: 2
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${theme.palette.divider}`,
                  transform: { xs: 'none', md: 'translateX(-50%)' }
                }}
              >
                {experience.type === 'education' ? (
                  <SchoolIcon sx={{ color: theme.palette.text.primary, fontSize: 24 }} />
                ) : (
                  <WorkIcon sx={{ color: theme.palette.text.primary, fontSize: 24 }} />
                )}
              </Box>
              {/* Date - for mobile */}
              <Typography
                sx={{
                  display: { xs: 'block', md: 'none' },
                  ml: 2,
                  color: theme.palette.text.primary,
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                {experience.current ?
                  '2024 - present' :
                  `${new Date(experience.startDate).toLocaleDateString('en-US', {
                    month: 'numeric',
                    year: 'numeric'
                  })} - ${new Date(experience.endDate || '').toLocaleDateString('en-US', {
                    month: 'numeric',
                    year: 'numeric'
                  })}`
                }
              </Typography>
            </Box>

            {/* Content box */}
            <Box
              sx={{
                width: { xs: '100%', md: '42%' },
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                color: theme.palette.text.primary,
                borderRadius: '16px',
                p: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                },
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 20px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                border: `1px solid ${theme.palette.divider}`,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '24px',
                  [index % 2 === 0 ? 'right' : 'left']: '-12px',
                  width: '24px',
                  height: '24px',
                  transform: 'rotate(-135deg)',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                  border: `1px solid ${theme.palette.divider}`,
                  borderTop: index % 2 === 0 ? 'none' : `1px solid ${theme.palette.divider}`,
                  borderLeft: index % 2 === 0 ? `1px solid ${theme.palette.divider}` : 'none',
                  borderRight: index % 2 === 0 ? 'none' : `1px solid ${theme.palette.divider}`,
                  borderBottom: index % 2 === 0 ? `1px solid ${theme.palette.divider}` : 'none',
                  zIndex: 0,
                  display: { xs: 'none', md: 'block' }
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                {experience.image && (
                  <Box
                    component="img"
                    src={experience.image}
                    alt={experience.organization}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      objectFit: 'contain',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      p: 1,
                      border: `2px solid ${theme.palette.primary.main}`
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/assets/images/company-placeholder.png';
                    }}
                  />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 1,
                      fontSize: '1.25rem'
                    }}
                  >
                    {experience.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 1,
                      fontSize: '1rem'
                    }}
                  >
                    {experience.organization}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem'
                  }}>
                    <Typography variant="body2">
                      {experience.location}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        bgcolor: theme.palette.text.secondary,
                        display: 'inline-block'
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'medium'
                      }}
                    >
                      {experience.category}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  whiteSpace: 'pre-line',
                  mb: 2,
                  fontSize: '0.875rem'
                }}
              >
                {experience.description}
              </Typography>
              {experience.technologies && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {experience.technologies.map((tech, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        px: 2,
                        py: 0.75,
                        borderRadius: '20px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {tech}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>

            {/* Date - for desktop */}
            <Typography
              sx={{
                position: 'absolute',
                top: 24,
                [index % 2 === 0 ? 'left' : 'right']: '50%',
                color: theme.palette.text.primary,
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transform: index % 2 === 0
                  ? 'translateX(calc(100% + 32px))'
                  : 'translateX(calc(-100% - 32px))',
                display: { xs: 'none', md: 'block' }
              }}
            >
              {experience.current ?
                '2024 - present' :
                `${new Date(experience.startDate).toLocaleDateString('en-US', {
                  month: 'numeric',
                  year: 'numeric'
                })} - ${new Date(experience.endDate || '').toLocaleDateString('en-US', {
                  month: 'numeric',
                  year: 'numeric'
                })}`
              }
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
        {workExperiences.length > 0 && (
          <TimelineSection title="Work Experience" items={workExperiences} />
        )}
        {educationExperiences.length > 0 && (
          <TimelineSection title="Education" items={educationExperiences} />
        )}
      </Box>
    </Container>
  );
};

export default Experience; 