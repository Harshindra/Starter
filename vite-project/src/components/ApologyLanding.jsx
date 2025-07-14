import { useState, useEffect } from "react";

const ApologyLanding = () => {
  const [step, setStep] = useState("input"); // 'input', 'heart-animation', 'apology', 'crying-animation', 'hidden-message'
  const [name, setName] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [showCryingEmoji, setShowCryingEmoji] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setShowHearts(true);
      setStep("heart-animation");

      // Show hearts for 3 seconds, then show apology
      setTimeout(() => {
        setShowHearts(false);
        setStep("apology");
      }, 3000);
    }
  };

  const handleReadHiddenMessage = () => {
    setStep("crying-animation");
    setShowCryingEmoji(true);

    // Show crying emoji for 2 seconds, then show hidden message
    setTimeout(() => {
      setShowCryingEmoji(false);
      setStep("hidden-message");
    }, 2000);
  };

  const resetToStart = () => {
    setStep("input");
    setName("");
    setShowHearts(false);
    setShowCryingEmoji(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-rose-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Floating hearts animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Crying emoji animation */}
      {showCryingEmoji && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-9xl animate-bounce">😢</div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/30">
          {/* Step 1: Name Input */}
          {step === "input" && (
            <div className="text-center space-y-6">
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Hey Beautiful! 💕
                </h1>
                <p className="text-purple-700 text-lg font-medium">
                  Please enter your name below
                </p>
              </div>

              <form onSubmit={handleNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your beautiful name..."
                  className="w-full px-6 py-4 rounded-2xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none bg-white/70 text-purple-800 placeholder-purple-400 text-lg font-medium backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  Continue ✨
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Heart Animation */}
          {step === "heart-animation" && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-pulse">💖</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {name}!
              </h2>
              <div className="text-pink-600 text-lg font-medium">
                Hearts are flying for you... 💕
              </div>
            </div>
          )}

          {/* Step 3: Apology Message */}
          {step === "apology" && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Dear {name} 💕
              </h2>

              <div className="text-purple-700 text-lg leading-relaxed space-y-4 bg-white/30 rounded-2xl p-6">
                <p>I'm really sorry for whatever I did that hurt you. 🥺</p>
                <p>
                  You mean the world to me, and seeing you upset breaks my
                  heart.
                </p>
                <p>
                  I hope you can forgive me and we can make things right again.
                  💖
                </p>
              </div>

              <button
                onClick={handleReadHiddenMessage}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                Read Hidden Message 💌
              </button>
            </div>
          )}

          {/* Step 4: Crying Animation */}
          {step === "crying-animation" && (
            <div className="text-center space-y-6">
              <div className="text-purple-700 text-xl font-medium">
                I'm really sorry... 💔
              </div>
            </div>
          )}

          {/* Step 5: Hidden Message */}
          {step === "hidden-message" && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Hidden Message for {name} 💕
              </h2>

              <div className="text-purple-700 text-lg leading-relaxed space-y-4 bg-white/30 rounded-2xl p-6">
                <p className="font-semibold text-rose-600">The truth is...</p>
                <p>
                  You're not just amazing, you're absolutely extraordinary! ✨
                </p>
                <p>
                  Every moment with you feels like magic, and I'm grateful for
                  your friendship every single day. 🌟
                </p>
                <p>
                  I promise to be better and to always cherish what we have. 💖
                </p>
                <p className="font-bold text-pink-600">
                  You're one in a million, {name}! 🦋
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-4xl">🌸✨💕🌸</div>
                <button
                  onClick={resetToStart}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Over 💫
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 text-6xl animate-bounce delay-1000">
        🌸
      </div>
      <div className="absolute top-10 right-10 text-5xl animate-pulse delay-500">
        ✨
      </div>
      <div className="absolute bottom-20 right-20 text-4xl animate-bounce delay-2000">
        🦋
      </div>
      <div className="absolute top-1/4 left-10 text-5xl animate-pulse delay-1500">
        💫
      </div>
    </div>
  );
};

export default ApologyLanding;
