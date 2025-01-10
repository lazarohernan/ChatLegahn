export const lightTheme = {
  // Backgrounds
  primary: 'bg-white',
  secondary: 'bg-gray-100',
  header: 'bg-white',
  sidebar: 'bg-white',
  hover: 'hover:bg-gray-100',
  activeItem: 'bg-indigo-50',
  
  // Text
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textTertiary: 'text-gray-500',
  textHover: 'hover:text-gray-900',
  textActive: 'text-indigo-600',
  
  // Borders
  border: 'border-gray-200',
  borderHover: 'hover:border-gray-300',
  
  // Components
  card: 'bg-white border border-gray-200',
  input: 'bg-white border border-gray-300 focus:border-blue-500',
  button: 'bg-white hover:bg-gray-100 border border-gray-300',
  
  // Logo
  logo: 'bg-indigo-500',
  logoText: 'text-gray-800',
  
  // Menu Items
  menuItem: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
  menuItemActive: 'bg-indigo-50 text-indigo-600',
  menuIcon: 'text-gray-500 group-hover:text-gray-700',
  menuIconActive: 'text-indigo-600',
  
  // Notifications
  notification: 'bg-white border-gray-200/50 hover:bg-gray-50/50',
  notificationUnread: 'bg-blue-50/50',
  
  // Drawer
  drawer: 'bg-white/90 border-gray-200/50',
  drawerHeader: 'border-gray-200/50',
  
  // Buttons
  iconButton: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  dangerButton: 'text-red-600 hover:text-red-700',
  
  // Misc
  shadow: 'shadow-sm',
  shadowMd: 'shadow-md',
  backdrop: 'backdrop-blur-md'
};

export const darkTheme = {
  // Backgrounds
  primary: 'bg-gray-900',
  secondary: 'bg-gray-800',
  header: 'bg-gray-800',
  sidebar: 'bg-gray-900',
  hover: 'hover:bg-gray-700',
  activeItem: 'bg-gray-700',
  
  // Text
  textPrimary: 'text-gray-100',
  textSecondary: 'text-gray-300',
  textTertiary: 'text-gray-400',
  textHover: 'hover:text-white',
  textActive: 'text-white',
  
  // Borders
  border: 'border-gray-700',
  borderHover: 'hover:border-gray-600',
  
  // Components
  card: 'bg-gray-800 border border-gray-700',
  input: 'bg-gray-800 border border-gray-700 focus:border-gray-600',
  button: 'bg-gray-800 hover:bg-gray-700 border border-gray-700',
  
  // Logo
  logo: 'bg-gray-700',
  logoText: 'text-gray-100',
  
  // Menu Items
  menuItem: 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
  menuItemActive: 'bg-gray-700 text-white',
  menuIcon: 'text-gray-400 group-hover:text-gray-200',
  menuIconActive: 'text-white',
  
  // Notifications
  notification: 'bg-gray-800/90 border-gray-700 hover:bg-gray-700/50',
  notificationUnread: 'bg-gray-700/30',
  
  // Drawer
  drawer: 'bg-gray-800/90 border-gray-700',
  drawerHeader: 'border-gray-700',
  
  // Buttons
  iconButton: 'text-gray-400 hover:bg-gray-700 hover:text-gray-200',
  dangerButton: 'text-red-400 hover:text-red-300',
  
  // Misc
  shadow: 'shadow-sm shadow-gray-900',
  shadowMd: 'shadow-md shadow-gray-900',
  backdrop: 'backdrop-blur-md'
};

// Función helper para combinar clases de tema
export const getThemeClass = (isDark, lightClass, darkClass) => {
  return isDark ? darkClass : lightClass;
};
