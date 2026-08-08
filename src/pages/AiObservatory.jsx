import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send, Sparkles, Loader2, Info } from 'lucide-react';

const AiObservatory = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings, explorer. I am ORBIT, your AI astronomy assistant. How can I help you navigate the cosmos today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await mockAiResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but my sensors are experiencing some interference. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const mockAiResponse = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const q = query.toLowerCase();
    if (q.includes('black hole')) return "A black hole is a region of spacetime where gravity is so strong that nothing — not even light — can escape. They form when massive stars collapse at the end of their lives. The nearest known black hole, Gaia BH1, is about 1,560 light-years away.";
    if (q.includes('compare earth and mars') || q.includes('earth and mars')) return "Earth and Mars are both rocky planets, but very different: Earth has a thick nitrogen/oxygen atmosphere and liquid water oceans; Mars has a thin carbon-dioxide atmosphere and no surface liquid water. Mars is about half Earth's diameter, has ~38% of its gravity, and its average temperature is about -65°C compared to Earth's 15°C.";
    if (q.includes('jupiter')) return "Jupiter is the largest planet in our solar system — more than twice as massive as all other planets combined. It's a gas giant with a massive storm known as the Great Red Spot, and it currently has 95 confirmed moons. It's about 5.2 astronomical units (778 million km) from the Sun.";
    if (q.includes('james webb')) return "The James Webb Space Telescope (JWST) is the world's premier infrared space observatory. Launched on December 25, 2021, it orbits the Sun at the L2 Lagrange point, 1.5 million km from Earth. Its 6.5-meter gold-coated mirror lets it see the earliest galaxies and study exoplanet atmospheres.";
    if (q.includes('how far away is jupiter')) return "Jupiter's distance from Earth varies from about 588 million km at closest approach to roughly 968 million km at its farthest. On average, it is about 778 million km (5.2 AU) from the Sun.";
    if (q.includes('mars')) return "Mars is the 'Red Planet'. It has the tallest volcano in the solar system, Olympus Mons, and the deepest canyon, Valles Marineris. It is currently being explored by NASA's Perseverance rover and China's Zhurong rover.";
    if (q.includes('venus')) return "Venus is the hottest planet due to a runaway greenhouse effect, with surface temperatures hot enough to melt lead (about 464°C). It rotates backwards compared to most planets, and a day on Venus is longer than its year.";
    if (q.includes('saturn')) return "Saturn is best known for its spectacular ring system, made of billions of ice particles, rocks, and dust. It's the least dense planet — it could float in water. It has 146 confirmed moons, including Titan, which has a thick atmosphere and lakes of liquid methane.";
    if (q.includes('moon')) return "The Moon is Earth's only natural satellite, about 384,400 km away on average. It formed roughly 4.5 billion years ago, likely from debris after a Mars-sized body collided with early Earth. It drives our ocean tides and stabilizes Earth's axial tilt.";
    if (q.includes('apollo')) return "The Apollo program was NASA's effort to land humans on the Moon. Between 1969 and 1972, six Apollo missions landed 12 astronauts on the lunar surface. Apollo 11 made history on July 20, 1969, when Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon.";
    if (q.includes('asteroid')) return "Asteroids are rocky remnants from the formation of the solar system, mostly orbiting the Sun in the main belt between Mars and Jupiter. Near-Earth Objects (NEOs) are asteroids and comets whose orbits bring them close to Earth; NASA tracks these through its Planetary Defense program.";
    if (q.includes('take me to')) return "I've adjusted our local coordinates to your requested destination. Head to the Solar System section to explore it visually.";
    return "That's a fascinating question. My data suggests that space exploration continues to reveal secrets about our universe's origins. Would you like to know more about a specific planet or mission?";
  };

  return (
    <div className="h-screen bg-cosmos-black flex flex-col">
      <header className="p-8 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-cosmos-accent p-2 rounded-lg text-cosmos-black">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">ORBIT</h1>
            <p className="text-white/40 text-xs">AI ASTRONOMY ASSISTANT</p>
          </div>
        </div>
        <div className="text-white/40 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Mode: <span className="text-yellow-400">Demo (offline knowledge base)</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-8 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-cosmos-accent text-cosmos-black rounded-br-none' 
                  : 'bg-cosmos-slate border border-white/10 text-white rounded-bl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-cosmos-slate border border-white/10 p-4 rounded-2xl">
                  <Loader2 className="animate-spin text-cosmos-accent" size={20} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ORBIT about the cosmos..."
            className="w-full bg-cosmos-slate border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-cosmos-accent transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-cosmos-accent text-cosmos-black p-2 rounded-xl disabled:opacity-50 disabled:hover:bg-white transition-all"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[10px] text-white/30 text-center mt-4">
          ORBIT provides information for educational purposes. Cross-reference with official NASA telemetry.
        </p>
      </main>
    </div>
  );
};

export default AiObservatory;
