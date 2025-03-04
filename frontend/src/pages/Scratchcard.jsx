import { ScratchToReveal } from "../components/magicui/scratch-to-reveal";
import { useNavigate } from "react-router-dom";

export function ScratchReward() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2 animate-bounce">🎉 Surprise Reward!</h2>
        <p className="text-lg opacity-90">Scratch to reveal your discount for the next booking.</p>
      </div>

      <div className="mt-8">
        <ScratchToReveal
          width={300}
          height={200}
          minScratchPercentage={70}
          className="flex items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-lg"
          gradientColors={["#ff9f43", "#ff6b6b", "#48dbfb"]}
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">🎁 10% OFF</p>
            <p className="text-lg text-gray-800">on your next booking!</p>
          </div>
        </ScratchToReveal>
      </div>

      <button
        className="mt-6 px-8 py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all shadow-md"
        onClick={() => navigate("/bookingsummary")}
      >
        Use Discount & Continue →
      </button>
    </div>
  );
}
