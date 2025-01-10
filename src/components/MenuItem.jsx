import { memo } from 'react';
import PropTypes from 'prop-types';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';

const MenuItem = memo(({ item, isCollapsed, activeItem, isDarkMode, onNavigate }) => (
  <button
    onClick={() => onNavigate(item.path)}
    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${item.className} ${
      getThemeClass(isDarkMode,
        activeItem === item.id ? lightTheme.menuItemActive : lightTheme.menuItem,
        activeItem === item.id ? darkTheme.menuItemActive : darkTheme.menuItem
      )
    }`}
  >
    <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
      getThemeClass(isDarkMode,
        activeItem === item.id ? lightTheme.menuIconActive : lightTheme.menuIcon,
        activeItem === item.id ? darkTheme.menuIconActive : darkTheme.menuIcon
      )
    }`} />
    <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
      {!isCollapsed && item.name}
    </span>
  </button>
));

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  activeItem: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default MenuItem;
