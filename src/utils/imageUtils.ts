export const getPlaceholderImage = (type: 'profile' | 'project' | 'skill'): string => {
  const placeholderImages = {
    profile: '/assets/images/profile-placeholder.png',
    project: '/assets/images/project-placeholder.png',
    skill: '/assets/images/skill-placeholder.png'
  };
  return placeholderImages[type];
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'profile' | 'project' | 'skill') => {
  e.currentTarget.src = getPlaceholderImage(type);
  e.currentTarget.onerror = null; // Prevent infinite loop
}; 