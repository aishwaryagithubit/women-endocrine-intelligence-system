import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User as UserIcon, Loader2, Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export default function Chat() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t('chat_welcome'),
      sender: "bot",
      timestamp: Date.now()
    }
  ]);

  // Update welcome message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === "1") {
        return [{ ...prev[0], text: t('chat_welcome') }];
      }
      return prev;
    });
  }, [t]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      setInput((current) => (current ? `${current} ${transcript}` : transcript));
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI delay
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: t('chat_response_default'),
        sender: 'bot',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="font-display text-3xl font-bold">{t('chat_title')}</h1>
        <p className="text-muted-foreground">{t('chat_subtitle')}</p>
      </div>

      <div className="flex-1 glass-card rounded-2xl p-4 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}>
                {msg.sender === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm' 
                  : 'bg-white border border-border rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-border rounded-2xl rounded-tl-sm p-4">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border/50">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat_placeholder')}
              className="flex-1 rounded-xl border-border bg-white/50"
            />
            <Button
              type="button"
              onClick={toggleVoiceInput}
              disabled={!speechSupported}
              className="rounded-xl w-12 px-0"
              variant={isListening ? "secondary" : "ghost"}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="rounded-xl w-12 px-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          {!speechSupported && (
            <p className="mt-2 text-xs text-destructive">Microphone chat is not supported in this browser.</p>
          )}
        </div>
      </div>
    </div>
  );
}
