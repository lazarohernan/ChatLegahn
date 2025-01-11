import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import LoadingButton from '../../components/LoadingButton';
import { UserCircle, Mail, Phone, Building, MapPin } from 'lucide-react';

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || '',
    bio: user?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulación de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aquí iría la lógica real de actualización
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${
      isDarkMode ? 'bg-dark-secondary' : 'bg-white'
    } rounded-lg shadow-lg`}>
      <h1 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-dark-primary' : 'text-gray-900'
      }`}>
        Perfil de Usuario
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de Foto */}
        <div className="text-center space-y-4">
          <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-2 ${
            isDarkMode ? 'border-dark-border' : 'border-gray-200'
          }`}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'bg-dark-hover' : 'bg-gray-100'
              }`}>
                <UserCircle className={`w-16 h-16 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                }`} />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="photo"
              className={`inline-block px-4 py-2 rounded-md cursor-pointer ${
                isDarkMode 
                  ? 'bg-dark-hover text-dark-primary hover:bg-dark-accent' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cambiar Foto
            </label>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Nombre Completo
              </label>
              <div className="relative">
                <UserCircle className={`absolute left-3 top-3 w-5 h-5 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 w-full px-3 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-dark-primary border-dark-border text-dark-primary' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3 w-5 h-5 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-3 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-dark-primary border-dark-border text-dark-primary' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Teléfono
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-3 w-5 h-5 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                }`} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 w-full px-3 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-dark-primary border-dark-border text-dark-primary' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                Empresa/Despacho
              </label>
              <div className="relative">
                <Building className={`absolute left-3 top-3 w-5 h-5 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`pl-10 w-full px-3 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-dark-primary border-dark-border text-dark-primary' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Dirección
            </label>
            <div className="relative">
              <MapPin className={`absolute left-3 top-3 w-5 h-5 ${
                isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
              }`} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`pl-10 w-full px-3 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-dark-primary border-dark-border text-dark-primary' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-dark-primary' : 'text-gray-700'
            }`}>
              Biografía
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-dark-primary border-dark-border text-dark-primary' 
                  : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>

          <div className="flex justify-end">
            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Guardando..."
            >
              Guardar Cambios
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
