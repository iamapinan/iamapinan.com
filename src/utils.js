export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();
  if (hours < 6) return 'สวัสดียามดึกครับ';
  if (hours < 12) return 'สวัสดีตอนเช้าครับ';
  if (hours < 13) return 'สวัสดีตอนเที่ยงครับ';
  if (hours < 18) return 'สวัสดีตอนบ่ายครับ';
  return 'สวัสดีตอนเย็นครับ';
};
  
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjliNDVhMTg5ZmVmN2ZjZmNjOGIyY2VlMjBmNjliYmMzNjc1M2Q0Y2Q0OGNiM2VjZTRjNDU4NjQ3MTVjMmJlZWNjYTRhODU3MTQ1Mjc4OGE5In0.eyJhdWQiOiIyIiwianRpIjoiOWI0NWExODlmZWY3ZmNmY2M4YjJjZWUyMGY2OWJiYzM2NzUzZDRjZDQ4Y2IzZWNlNGM0NTg2NDcxNWMyYmVlY2NhNGE4NTcxNDUyNzg4YTkiLCJpYXQiOjE3MjA5MDM5NTEsIm5iZiI6MTcyMDkwMzk1MSwiZXhwIjoxNzUyNDM5OTUxLCJzdWIiOiIzMjc0Iiwic2NvcGVzIjpbXX0.N7jAPW81BPi8RYe1Bj9EY_ixHg_rt6SlUbcDyuaA3Zhltgxr8h0cxlgY6Q5W3A2E-mIYT7ViAw4F84rXW-UfUE3g9_giKJCYhywvkMFQDpy6AFvcZYa3OD-vpVV3ypD96OVGXHi2hd82EOI9xsiS4BKyt1gHbfaYDBcIWsiY9IFF_Fd9RN72YtegKNu4QBDGgy0NzKIXeHiaSHjteBFrTETjzaAfQuT8I0ag_ldcmgbLxxXRdoLghj6C0jc9seLPnp12UuxGTqEE274sk7wTNGEqLKLfjzOGlc2J40nWZXoKA5de4lC-LpprmzEIYPVanFjqQxdi07daZYsseO29yP9VLSDCvO0rmXj8pPF4hofUG-4z-Zynn7XvwCnc0NESirwZGF3ZSmucvIGTKaMvVkfULwJqwMDk6YRxQAJ9duidf1x2u8ceF2AJ2UhIGLSTI7W-nCf6_EUYe2oRl7YgHOE4ne9i2BQjM-1m8274iEJA2Vft8ROF7hroKy91-WHFVj1yP0R6zDensvl44aFYaYeTJbrfexE6WtcGBoejQTja-iTk80bNyK2EcE1c5A6VThyHdJKI6zaedHH40nfD5M9P3UTV_7g_PO_CgAZ9BXWJME-OB0Mo2BT-2kI_FZYs-caIVE9shZSKtxJnU1x9akwpK3qGq6URh2rstDGvYiM';

export const getWeather = async () => {
  try {
    const response = await fetch('https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/at?lat=13.736717&lon=100.523186', {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    const data = await response.json();
    const WeatherForcasts = data.data[0];
    console.log(WeatherForcasts);
    return { temp: WeatherForcasts.forecasts[0].data.tc };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
