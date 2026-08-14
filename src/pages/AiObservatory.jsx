import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send, Loader2 } from 'lucide-react';

const AiObservatory = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Greetings, explorer. I am ORBIT, your AI astronomy assistant. How can I help you navigate the cosmos today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Blur to dismiss keyboard on mobile after sending
    inputRef.current?.blur();

    try {
      const response = await mockAiResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but my sensors are experiencing some interference. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const mockAiResponse = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const q = query.toLowerCase();
    if (q.includes('black hole'))    return "A black hole is a region of spacetime where gravity is so strong that nothing — not even light — can escape. They form when massive stars collapse at the end of their lives. The nearest known black hole, Gaia BH1, is about 1,560 light-years away.";
    if (q.includes('compare earth and mars') || q.includes('earth and mars')) return "Earth and Mars are both rocky planets, but very different: Earth has a thick nitrogen/oxygen atmosphere and liquid water oceans; Mars has a thin carbon-dioxide atmosphere and no surface liquid water. Mars is about half Earth's diameter, has ~38% of its gravity, and its average temperature is about -65°C compared to Earth's 15°C.";
    if (q.includes('jupiter'))       return "Jupiter is the largest planet in our solar system — more than twice as massive as all other planets combined. It's a gas giant with the Great Red Spot storm, and it has 95 confirmed moons.";
    if (q.includes('james webb'))    return "The James Webb Space Telescope (JWST) is the world's premier infrared space observatory. Launched on December 25, 2021, it orbits the Sun at the L2 Lagrange point, 1.5 million km from Earth.";
    if (q.includes('mars'))          return "Mars is the 'Red Planet'. It has the tallest volcano in the solar system, Olympus Mons, and the deepest canyon, Valles Marineris. It is currently explored by NASA's Perseverance rover.";
    if (q.includes('venus'))         return "Venus is the hottest planet due to a runaway greenhouse effect (~464°C). It rotates backwards compared to most planets, and a day on Venus is longer than its year.";
    if (q.includes('saturn'))        return "Saturn is best known for its spectacular ring system. It's the least dense planet and has 146 confirmed moons, including Titan with liquid methane lakes.";
    if (q.includes('moon'))          return "The Moon is Earth's only natural satellite, about 384,400 km away. It formed ~4.5 billion years ago and drives our ocean tides.";
    if (q.includes('apollo'))        return "The Apollo program landed 12 astronauts on the Moon between 1969 and 1972. Apollo 11 made history on July 20, 1969.";
    if (q.includes('asteroid'))      return "Asteroids are rocky remnants from the solar system's formation, mostly in the main belt between Mars and Jupiter. NASA tracks Near-Earth Objects through its Planetary Defense program.";
    return "That's a fascinating question. Space exploration continues to reveal secrets about our universe's origins. Would you like to know more about a specific planet or mission?";
  };

  return (
    /*
      Use dvh (dynamic viewport height) so the chat doesn't break when
      mobile keyboards appear. Falls back to vh on unsupported browsers.
    */
    <div
      className="flex flex-col bg-cosmos-black"
      style={{ height: 'calc(100dvh - 56px)' }}
    >
      {/* -- Header -- */}
      <header className="px-4 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-cosmos-accent p-2 rounded-lg text-cosmos-black shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">ORBIT</h1>
            <p className="text-white/40 text-[10px] sm:text-xs">AI ASTRONOMY ASSISTANT</p>
          </div>
        </div>
        <div className="text-white/40 text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="hidden sm:inline">Mode: </span>
          <span className="text-yellow-400">Demo</span>
        </div>
      </header>

      {/* -- Messages -- */}
      <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'bg-cosmos-accent text-cosmos-black rounded-br-none'
                      : 'bg-cosmos-slate border border-white/10 text-white rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-cosmos-slate border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none">
                <Loader2 className="animate-spin text-cosmos-accent" size={18} />
              </div>
            </motion.div>
          )}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* -- Input bar -- */}
      <div className="shrink-0 border-t border-white/10 bg-cosmos-black px-4 py-3 sm:px-8 sm:py-4">
        <form
          onSubmit={handleSend}
          className="max-w-3xl mx-auto flex gap-2 items-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ORBIT about the cosmos…"
            className="flex-1 bg-cosmos-slate border border-white/10 rounded-2xl py-3 px-4
                       text-sm focus:outline-none focus:border-cosmos-accent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-cosmos-accent text-cosmos-black p-3 rounded-xl
                       disabled:opacity-50 transition-all min-w-[48px] min-h-[48px]
                       flex items-center justify-center shrink-0"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-white/30 text-center mt-2">
          ORBIT provides information for educational purposes.
        </p>
      </div>
    </div>
  );
};

export default AiObservatory;
