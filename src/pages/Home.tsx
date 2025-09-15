import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
        Monopoly Deal
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-700 mb-8 text-center">
        Play with up to 5 players locally!
      </p>

      {/* Start Button */}
      <button
        onClick={() => navigate("/game")}
        className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition"
      >
        Start Game
      </button>
    </div>
  );
}

export default Home;
