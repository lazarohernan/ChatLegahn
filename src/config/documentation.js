export const documentation = {
  chat: {
    title: 'Chat con IA Legal',
    description: 'Interactúa con nuestro asistente legal potenciado por IA',
    sections: [
      {
        title: 'Inicio de conversación',
        content: 'Para iniciar una consulta, simplemente escribe tu pregunta en el campo de texto y presiona Enter o el botón de enviar. El asistente procesará tu consulta y responderá con información legal relevante.'
      },
      {
        title: 'Tipos de consultas',
        content: 'Puedes realizar preguntas sobre diversos temas legales, incluyendo derecho civil, penal, laboral, mercantil, entre otros. El asistente está entrenado para proporcionar información general y referencias legales.'
      },
      {
        title: 'Documentos y referencias',
        content: 'El asistente puede proporcionar referencias a leyes, códigos y jurisprudencia relevante. También puede ayudarte a entender documentos legales y sugerir plantillas básicas.'
      },
      {
        title: 'Limitaciones',
        content: 'Recuerda que el asistente proporciona información general y no sustituye el consejo legal profesional. Para casos específicos, siempre consulta con un abogado calificado.'
      }
    ]
  },

  history: {
    title: 'Historial de Consultas',
    description: 'Accede y gestiona tu historial de conversaciones',
    sections: [
      {
        title: 'Visualización del historial',
        content: 'Encuentra todas tus consultas anteriores organizadas por fecha. Cada entrada muestra un resumen de la consulta y las respuestas recibidas.'
      },
      {
        title: 'Búsqueda',
        content: 'Utiliza la barra de búsqueda para encontrar consultas específicas por palabras clave, fechas o temas.'
      },
      {
        title: 'Filtros',
        content: 'Filtra tu historial por categorías legales, fechas o estado de la consulta para encontrar rápidamente la información que necesitas.'
      },
      {
        title: 'Exportación',
        content: 'Exporta tus consultas en diferentes formatos (PDF, DOC) para mantener un registro personal o compartir con otros profesionales.'
      }
    ]
  },

  tools: {
    title: 'Herramientas Legales',
    description: 'Accede a herramientas y recursos legales útiles',
    sections: [
      {
        title: 'Generador de documentos',
        content: 'Crea documentos legales básicos utilizando nuestras plantillas predefinidas. Personaliza campos según tus necesidades.'
      },
      {
        title: 'Calculadoras legales',
        content: 'Utiliza calculadoras especializadas para estimaciones de plazos, intereses legales y otros cálculos relevantes.'
      },
      {
        title: 'Biblioteca de recursos',
        content: 'Accede a una biblioteca de recursos legales, incluyendo formularios, plantillas y guías prácticas.'
      },
      {
        title: 'Referencias rápidas',
        content: 'Consulta referencias rápidas sobre términos legales, plazos importantes y procedimientos comunes.'
      }
    ]
  },

  zoom: {
    title: 'Sesiones Zoom',
    description: 'Gestiona tus videollamadas y consultas en vivo',
    sections: [
      {
        title: 'Programación de sesiones',
        content: 'Agenda videollamadas con abogados especializados. Selecciona fecha, hora y especialidad legal requerida.'
      },
      {
        title: 'Gestión de citas',
        content: 'Visualiza, modifica o cancela tus citas programadas. Recibe recordatorios automáticos antes de cada sesión.'
      },
      {
        title: 'Durante la sesión',
        content: 'Comparte documentos relevantes, toma notas y graba la sesión (con consentimiento mutuo) para referencia futura.'
      },
      {
        title: 'Seguimiento',
        content: 'Accede a resúmenes de las sesiones, documentos compartidos y notas tomadas durante la videollamada.'
      }
    ]
  },

  docs: {
    title: 'Documentación',
    description: 'Guías completas y documentación de la plataforma',
    sections: [
      {
        title: 'Guía de inicio',
        content: 'Aprende a utilizar las funciones básicas de la plataforma, desde la navegación hasta la realización de consultas.'
      },
      {
        title: 'Mejores prácticas',
        content: 'Consejos y recomendaciones para aprovechar al máximo las funcionalidades de la plataforma.'
      },
      {
        title: 'Preguntas frecuentes',
        content: 'Encuentra respuestas a las preguntas más comunes sobre el uso de la plataforma y sus servicios.'
      },
      {
        title: 'Actualizaciones',
        content: 'Mantente informado sobre las últimas actualizaciones y nuevas funcionalidades de la plataforma.'
      }
    ]
  },

  settings: {
    title: 'Configuración',
    description: 'Personaliza tu experiencia en la plataforma',
    sections: [
      {
        title: 'Perfil de usuario',
        content: 'Actualiza tu información personal, foto de perfil y preferencias de contacto.'
      },
      {
        title: 'Notificaciones',
        content: 'Configura tus preferencias de notificaciones para correos, alertas y recordatorios.'
      },
      {
        title: 'Privacidad y seguridad',
        content: 'Gestiona la configuración de privacidad, acceso a datos y opciones de seguridad de tu cuenta.'
      },
      {
        title: 'Personalización',
        content: 'Ajusta el tema visual, idioma y otras opciones de visualización de la plataforma.'
      }
    ]
  }
};

// Helper para obtener la documentación de una sección específica
export const getDocumentation = (section) => {
  return documentation[section] || null;
};

// Helper para obtener todas las secciones de documentación
export const getAllSections = () => {
  return Object.keys(documentation).map(key => ({
    id: key,
    ...documentation[key]
  }));
};

// Helper para buscar en toda la documentación
export const searchDocumentation = (query) => {
  const results = [];
  const searchTerm = query.toLowerCase();

  Object.entries(documentation).forEach(([sectionId, section]) => {
    // Buscar en el título y descripción de la sección
    if (
      section.title.toLowerCase().includes(searchTerm) ||
      section.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        sectionId,
        type: 'section',
        title: section.title,
        description: section.description
      });
    }

    // Buscar en las subsecciones
    section.sections.forEach((subsection, index) => {
      if (
        subsection.title.toLowerCase().includes(searchTerm) ||
        subsection.content.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          sectionId,
          type: 'subsection',
          sectionTitle: section.title,
          subsectionIndex: index,
          title: subsection.title,
          content: subsection.content
        });
      }
    });
  });

  return results;
};
