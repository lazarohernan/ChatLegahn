import { useEffect } from 'react';
import { getAllSections } from '../../config/documentation';
import { useTheme } from '../../context/ThemeContext';
import { getThemeClass, lightTheme, darkTheme } from '../../config/theme';

const Docs = () => {
  const { isDarkMode } = useTheme();
  const sections = getAllSections();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className={`text-3xl font-bold mb-8 ${
        getThemeClass(isDarkMode, lightTheme.textPrimary, darkTheme.textPrimary)
      }`}>
        Documentación
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`rounded-xl overflow-hidden ${
              getThemeClass(isDarkMode,
                `${lightTheme.cardBg} ${lightTheme.shadow}`,
                `${darkTheme.cardBg} ${darkTheme.shadow}`
              )
            }`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-2 ${
                getThemeClass(isDarkMode, lightTheme.textPrimary, darkTheme.textPrimary)
              }`}>
                {section.title}
              </h2>
              <p className={`text-sm mb-4 ${
                getThemeClass(isDarkMode, lightTheme.textSecondary, darkTheme.textSecondary)
              }`}>
                {section.description}
              </p>

              <div className="space-y-4">
                {section.sections.map((subsection, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      getThemeClass(isDarkMode,
                        `${lightTheme.secondary} hover:${lightTheme.hover}`,
                        `${darkTheme.secondary} hover:${darkTheme.hover}`
                      )
                    }`}
                  >
                    <h3 className={`text-sm font-medium mb-2 ${
                      getThemeClass(isDarkMode, lightTheme.textPrimary, darkTheme.textPrimary)
                    }`}>
                      {subsection.title}
                    </h3>
                    <p className={`text-xs ${
                      getThemeClass(isDarkMode, lightTheme.textSecondary, darkTheme.textSecondary)
                    }`}>
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-8 p-6 rounded-xl ${
        getThemeClass(isDarkMode,
          `${lightTheme.cardBg} ${lightTheme.shadow}`,
          `${darkTheme.cardBg} ${darkTheme.shadow}`
        )
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          getThemeClass(isDarkMode, lightTheme.textPrimary, darkTheme.textPrimary)
        }`}>
          ¿Necesitas más ayuda?
        </h2>
        <p className={`text-sm ${
          getThemeClass(isDarkMode, lightTheme.textSecondary, darkTheme.textSecondary)
        }`}>
          Si no encuentras la información que buscas, puedes:
        </p>
        <ul className={`list-disc list-inside mt-2 text-sm space-y-2 ${
          getThemeClass(isDarkMode, lightTheme.textSecondary, darkTheme.textSecondary)
        }`}>
          <li>Consultar con nuestro asistente IA en la sección de Chat</li>
          <li>Programar una sesión con un abogado especializado</li>
          <li>Contactar a nuestro equipo de soporte</li>
        </ul>
      </div>
    </div>
  );
};

export default Docs;
