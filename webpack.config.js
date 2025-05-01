module.exports = {
  // Configuración existente
  devServer: {
    // Usar setupMiddlewares en lugar de onAfterSetupMiddleware
    setupMiddlewares: (middlewares, devServer) => {
      // Aquí puedes añadir middlewares personalizados si los necesitas
      return middlewares;
    },
  },
};
