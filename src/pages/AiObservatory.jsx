import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Send, Sparkles, Loader2, Info } from 'lucide-react';

const Orbit = () => {
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
      // In a production environment, this would call an actual LLM API.
      // For now, we have a mock service that simulates a thinking process.
      const response = await mockAiResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but my sensors are experiencing some interference. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock AI logic for demonstration
  const mockAiResponse = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const q = query.toLowerCase();
    if (q.includes('jupiter')) return "Jupiter is the largest planet in our solar system. It's a gas giant with a massive storm known as the Great Red Spot.";
    if (q.includes('mars')) return "Mars is the 'Red Planet'. It has the tallest volcano in the solar system, Olympus Mons, and is currently being explored by multiple rovers.";
    if (q.includes('venus')) return "Venus is the hottest planet due to a runaway greenhouse effect, with surface temperatures hot enough to melt lead.";
    if (q.includes('take me to')) return "I've adjusted our local coordinates to your requested destination. Visualizing data now.";
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
            <p className="text-white/40 text-xs">AI ASTROLOGY ASSISTANT</p>
          </div>
        </div>
        <div className="text-white/40 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Online Status: <span className="text-green-400">Connected</span>
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

export default Orbit;
