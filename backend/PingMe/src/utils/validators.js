exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validatePassword = (password) => {
  return password.length >= 6;
};

exports.validateBotInput = (name, description, trainingData) => {
  if (!name || typeof name !== 'string' || name.length < 3) return false;
  if (!description || typeof description !== 'string' || description.length < 10) return false;
  if (!trainingData || typeof trainingData !== 'string' || trainingData.length < 50) return false;
  return true;
};