import { useState } from "react";

function useGeolocation() { //custom hook
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  function getPosition() { //event handler function
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return {isLoading, position, error, getPosition}
  //here this custom hook returns an object containing isLoading, position, error, and getPosition, making these available to components that use the hook.
}

export default function App() {
  const {isLoading, position: {lat, lng}, error, getPosition} = useGeolocation();
  //here the app component uses the useGeolocation custom hook to access isLoading, position, error, and getPosition
  const [countClicks, setCountClicks] = useState(0);

  // const { lat, lng } = position;

  function handleClick(){
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
