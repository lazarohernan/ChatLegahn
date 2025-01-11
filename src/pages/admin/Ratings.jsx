import { Star, BarChart2, User } from 'lucide-react';

const Ratings = () => {
  // Datos de ejemplo
  const overallStats = {
    averageRating: 4.5,
    totalRatings: 128,
    ratingDistribution: {
      5: 75,
      4: 32,
      3: 15,
      2: 4,
      1: 2
    }
  };

  const recentRatings = [
    {
      id: 1,
      userName: "María García",
      rating: 5,
      comment: "Excelente asistencia legal, muy clara y precisa.",
      date: "2024-01-08"
    },
    {
      id: 2,
      userName: "Juan Pérez",
      rating: 4,
      comment: "Buena ayuda, aunque algunas respuestas podrían ser más detalladas.",
      date: "2024-01-07"
    },
    {
      id: 3,
      userName: "Ana Martínez",
      rating: 5,
      comment: "Me ayudó a entender perfectamente mis opciones legales.",
      date: "2024-01-07"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const calculatePercentage = (count) => {
    return (count / overallStats.totalRatings) * 100;
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Evaluaciones y Estadísticas</h1>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Calificación General</h2>
            <Star className="h-8 w-8 text-yellow-400" fill="currentColor" />
          </div>
          <div className="text-4xl font-bold mb-2">{overallStats.averageRating}</div>
          <div className="text-gray-600">de 5 estrellas</div>
          <div className="text-sm text-gray-500 mt-2">
            Basado en {overallStats.totalRatings} evaluaciones
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Distribución</h2>
            <BarChart2 className="h-8 w-8 text-blue-500" />
          </div>
          <div className="space-y-3">
            {Object.entries(overallStats.ratingDistribution)
              .reverse()
              .map(([rating, count]) => (
                <div key={rating} className="flex items-center">
                  <span className="w-12">{rating} ★</span>
                  <div className="flex-1 mx-2">
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${calculatePercentage(count)}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-sm text-gray-600">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Usuarios Activos</h2>
            <User className="h-8 w-8 text-green-500" />
          </div>
          <div className="text-4xl font-bold mb-2">89%</div>
          <div className="text-gray-600">tasa de participación</div>
          <div className="text-sm text-gray-500 mt-2">
            De los usuarios activos en el último mes
          </div>
        </div>
      </div>

      {/* Evaluaciones Recientes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Evaluaciones Recientes</h2>
        </div>
        <div className="divide-y">
          {recentRatings.map((rating) => (
            <div key={rating.id} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{rating.userName}</div>
                <div className="text-sm text-gray-500">{rating.date}</div>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(rating.rating)}
              </div>
              <p className="text-gray-600">{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
