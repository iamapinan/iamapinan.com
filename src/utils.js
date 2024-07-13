export const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  export const getWeather = async () => {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Bangkok&appid=8c235df46fe119ff739dfe5e9e3ae468&units=metric');
      const data = await response.json();
      const { main, weather } = data;
      const { temp } = main;
      const { description } = weather[0];
      return { temp, description };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };