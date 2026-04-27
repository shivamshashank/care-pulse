"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  CalendarIcon,
  PlusCircleIcon,
  UserCircleIcon,
  BeakerIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import usersDataRaw from "@/data/users.json";

export interface User {
  id: number;
  name: string;
  medications?: {
    name: string;
    time: string;
    dosage?: string;
    instructions?: string;
  }[];
  calendar?: {
    day: string;
    med: string;
  }[];
  wellbeingStatus?: string;
  age?: number;
  condition?: string;
  lastCheckIn?: string;
  adherenceRate?: number;
  vitals?: {
    bloodPressure?: string;
    heartRate?: string;
    bloodSugar?: string;
    cholesterol?: string;
    painLevel?: string;
    [key: string]: string | number | undefined;
  };
  notes?: string;
}

const usersData = usersDataRaw as User[];


interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickAction?: QuickActionType;
}

type QuickActionType = "medicine_update" | "schedule" | "general_info" | "wellbeing_tips" | "drug_info" | "health_summary";

interface QuickAction {
  label: string;
  type: QuickActionType;
  icon: React.ComponentType<{ className?: string }>;
}

const quickActions: QuickAction[] = [
  { label: "Medicine Update", type: "medicine_update", icon: PlusCircleIcon },
  { label: "My Schedule", type: "schedule", icon: CalendarIcon },
  { label: "Health Summary", type: "health_summary", icon: UserCircleIcon },
  { label: "Wellbeing Tips", type: "wellbeing_tips", icon: HeartIcon },
  { label: "Drug Info", type: "drug_info", icon: BeakerIcon },
];

// Medical knowledge base for common medications
const drugInfoDatabase: Record<string, string> = {
  Amlodipine: "Amlodipine is used to treat high blood pressure (hypertension) and chest pain (angina). It's a calcium channel blocker that relaxes blood vessels. Take it at the same time each day. Common side effects include dizziness and swelling.",
  Metformin: "Metformin is used to treat type 2 diabetes. It helps control blood sugar levels. Take with meals to reduce stomach upset. Common side effects include nausea and diarrhea. Avoid alcohol while taking this medication.",
  Lipitor: "Lipitor (Atorvastatin) is a statin used to lower cholesterol and reduce risk of heart disease. Take it in the evening as cholesterol production is highest at night. Avoid grapefruit juice while taking this medication.",
  "Vitamin D": "Vitamin D helps maintain healthy bones and immune system. It's best absorbed when taken with a meal containing fat. Most adults need 600-800 IU daily.",
  Lisinopril: "Lisinopril is an ACE inhibitor used for high blood pressure and heart failure. It helps relax blood vessels. Take at the same time daily. Common side effect is a dry cough.",
  Paracetamol: "Paracetamol (Acetaminophen) is a pain reliever and fever reducer. Safe when taken as directed. Do not exceed 4,000mg per day from all sources. Avoid alcohol while taking.",
  Ibuprofen: "Ibuprofen is an NSAID used for pain, inflammation, and fever. Take with food to prevent stomach upset. Avoid if you have kidney disease or stomach ulcers.",
  Aspirin: "Aspirin is used to reduce pain, fever, and inflammation. Low doses may be prescribed for heart protection. Take with food. Can cause stomach bleeding - avoid alcohol.",
  Omeprazole: "Omeprazole is a proton pump inhibitor (PPI) that reduces stomach acid. Used for GERD and ulcers. Take 30-60 minutes before a meal. Long-term use may affect vitamin absorption.",
  Insulin: "Insulin is a hormone that regulates blood sugar. It's essential for type 1 diabetes and some type 2 cases. Store in refrigerator. Check blood sugar regularly. Never skip doses.",
  Simvastatin: "Simvastatin is a statin that lowers cholesterol. Take in the evening. Avoid grapefruit juice and limit alcohol. Report muscle pain to your doctor immediately.",
};

// General wellbeing tips
const wellbeingTips: string[] = [
  "Stay hydrated! Aim for 8 glasses of water daily. Proper hydration helps medications work better.",
  "Regular light exercise like walking can improve your heart health and medication effectiveness.",
  "Take your medications at the same time each day to maintain consistent levels in your body.",
  "Never skip doses or stop medications without consulting your doctor first.",
  "Keep a medication list with you and show it to all healthcare providers.",
  "Get 7-9 hours of sleep for better overall health and recovery.",
  "Eat a balanced diet with plenty of fruits and vegetables.",
  "Monitor your blood pressure and blood sugar regularly if you have hypertension or diabetes.",
  "Take medications exactly as prescribed - don't adjust doses on your own.",
  "Set alarms or use pill organizers to help remember your medications.",
];

// General medical FAQs
const generalMedicalInfo: Record<string, string> = {
  "blood pressure": "Normal blood pressure is below 120/80 mmHg. High blood pressure (hypertension) is 130/80 mmHg or higher. Monitor regularly and take medications as prescribed.",
  "diabetes": "Diabetes is a condition where blood sugar levels are too high. Type 2 diabetes can often be managed with diet, exercise, and medication. Monitor blood sugar regularly.",
  "cholesterol": "Total cholesterol should be below 200 mg/dL. LDL ('bad') cholesterol should be below 100 mg/dL. HDL ('good') cholesterol should be above 60 mg/dL.",
  "heart disease": "Heart disease includes various conditions affecting the heart. Risk factors include high blood pressure, high cholesterol, smoking, and diabetes. Prevention includes healthy diet, exercise, and not smoking.",
  "medication interactions": "Always tell your doctor about all medications you take, including over-the-counter drugs and supplements. Some medications can interact dangerously.",
  "side effects": "All medications can have side effects. Read the leaflet that comes with your medication. Contact your doctor if side effects are severe or persistent.",
  "missed dose": "If you miss a dose, take it as soon as you remember unless it's almost time for your next dose. Never double up doses unless specifically instructed by your doctor.",
  "storage": "Most medications should be stored in a cool, dry place away from direct sunlight. Some require refrigeration. Keep all medications out of reach of children.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current user based on URL
  const userId = searchParams.get("id");
  const currentUser = usersData.find(u => u.id === Number(userId));
  const isUserPage = pathname?.startsWith("/user");

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = currentUser && isUserPage
        ? `Hello ${currentUser.name}! I'm your CarePulse Health Assistant. I can help you with personalized medication updates, schedule reminders, and general health information. How can I help you today?`
        : "Hello! I'm the CarePulse Health Assistant. I can provide general medical information and health tips. For personalized medication tracking, please sign in as a user.";

      setMessages([
        {
          id: "welcome",
          text: welcomeText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentUser, isUserPage, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update welcome message when user changes
  useEffect(() => {
    if (messages.length > 0) {
      const welcomeText = currentUser && isUserPage
        ? `Hello ${currentUser.name}! I'm your CarePulse Health Assistant. I can help you with personalized medication updates, schedule reminders, and general health information. How can I help you today?`
        : "Hello! I'm the CarePulse Health Assistant. I can provide general medical information and health tips. For personalized medication tracking, please sign in as a user.";

      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[0]?.id === "welcome") {
          newMessages[0] = { ...newMessages[0], text: welcomeText };
        }
        return newMessages;
      });
    }
  }, [currentUser?.id, isUserPage]);

  const generateResponse = (userMessage: string, quickAction?: QuickActionType): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Handle quick actions
    if (quickAction === "medicine_update" || lowerMessage.includes("medicine update") || lowerMessage.includes("medication update") || lowerMessage.includes("what should i take") || lowerMessage.includes("next pill")) {
      if (currentUser && isUserPage) {
        const medList = currentUser.medications?.map(m =>
          `• ${m.name}${m.dosage ? ` (${m.dosage})` : ""} at ${m.time}${m.instructions ? ` - ${m.instructions}` : ""}`
        ).join("\n");
        const nextMed = currentUser.medications?.[0];
        return `📋 **Your Medication Update:**\n\nYou have ${currentUser.medications?.length || 0} medications scheduled:\n${medList}\n\n⏰ **Next Up:** ${nextMed?.name || "None scheduled"}${nextMed?.dosage ? ` (${nextMed.dosage})` : ""} at ${nextMed?.time || "N/A"}${nextMed?.instructions ? ` - ${nextMed.instructions}` : ""}\n\n💡 Remember to take your medications as prescribed and never skip doses!`;
      }
      return "Please sign in as a user to see your personalized medication information.";
    }

    if (lowerMessage.includes("dosage") || lowerMessage.includes("how much") || lowerMessage.includes("how many") || lowerMessage.includes("strength")) {
      if (currentUser && isUserPage) {
        const dosageList = currentUser.medications?.map(m =>
          `• ${m.name}: ${m.dosage || "As prescribed by doctor"}${m.instructions ? ` (${m.instructions})` : ""}`
        ).join("\n");
        return `💊 **Your Dosage Information:**\n\n${dosageList}\n\n⚠️ Always take exactly as prescribed. Never adjust your dosage without consulting your doctor.`;
      }
      return "Please sign in as a user to see your dosage information.";
    }

    if (quickAction === "schedule" || lowerMessage.includes("schedule") || lowerMessage.includes("calendar") || lowerMessage.includes("today") || lowerMessage.includes("week")) {
      if (currentUser && isUserPage) {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const shortDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        const todayMeds = currentUser.calendar?.find(c => c.day === shortDay);
        const allMeds = currentUser.calendar?.map(c => `${c.day}: ${c.med}`).join("\n");

        return `📅 **Your Schedule:**\n\n**Today (${today}):** ${todayMeds?.med || "No medications scheduled"}\n\n**Weekly Overview:**\n${allMeds}\n\n💚 Stay on track with your medications for better health!`;
      }
      return "Please sign in as a user to see your personalized schedule.";
    }

    if (quickAction === "wellbeing_tips" || lowerMessage.includes("tip") || lowerMessage.includes("advice") || lowerMessage.includes("health tip")) {
      const randomTip = wellbeingTips[Math.floor(Math.random() * wellbeingTips.length)];
      return `💡 **Health Tip:**\n\n${randomTip}`;
    }

    if (quickAction === "drug_info") {
      if (currentUser && isUserPage && currentUser.medications) {
        const drugResponses = currentUser.medications.map(med => {
          const info = drugInfoDatabase[med.name];
          return info ? `**${med.name}:**\n${info}` : `**${med.name}:** Take as directed by your doctor. If you have questions, consult your pharmacist.`;
        });
        return `💊 **Your Medication Information:**\n\n${drugResponses.join("\n\n---\n\n")}`;
      }
      return "Please sign in as a user to see information about your specific medications.";
    }

    if (quickAction === "health_summary" || lowerMessage.includes("summary") || lowerMessage.includes("status") || lowerMessage.includes("how am i doing") || lowerMessage.includes("my health")) {
      if (currentUser && isUserPage) {
        const statusEmoji = currentUser.wellbeingStatus === "Green" ? "💚" : currentUser.wellbeingStatus === "Amber" ? "💛" : "❤️";
        const vitalsText = currentUser.vitals ? Object.entries(currentUser.vitals).map(([key, value]) => `• ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`).join("\n") : "No vitals recorded";

        return `📊 **Your Health Summary**\n\n${statusEmoji} **Wellbeing Status:** ${currentUser.wellbeingStatus || "N/A"}\n👤 **Age:** ${currentUser.age || "N/A"}\n🏥 **Condition:** ${currentUser.condition || "N/A"}\n📅 **Last Check-in:** ${currentUser.lastCheckIn || "N/A"}\n✅ **Adherence Rate:** ${currentUser.adherenceRate !== undefined ? currentUser.adherenceRate + "%" : "N/A"}\n\n📈 **Current Vitals:**\n${vitalsText}\n\n📝 **Notes:** ${currentUser.notes || "No notes available"}`;
      }
      return "Please sign in as a user to see your personalized health summary.";
    }

    if (lowerMessage.includes("adherence") || lowerMessage.includes("compliance") || lowerMessage.includes("taking my meds")) {
      if (currentUser && isUserPage) {
        const rate = currentUser.adherenceRate;
        if (rate === undefined) {
          return `✅ **Your Medication Adherence:** N/A\n\n💡 Taking your medications as prescribed is crucial for managing your condition: **${currentUser.condition || "your health"}**`;
        }
        return `✅ **Your Medication Adherence:** ${rate}%\n\n${rate >= 90 ? "🌟 Excellent! You're doing great with your medications." : rate >= 80 ? "👍 Good, but there's room for improvement." : "⚠️ Please try to improve your medication adherence for better health outcomes."}\n\n💡 Taking your medications as prescribed is crucial for managing your condition: **${currentUser.condition || "your health"}**`;
      }
      return "Please sign in as a user to see your medication adherence information.";
    }

    if (lowerMessage.includes("blood pressure") || lowerMessage.includes("bp") || lowerMessage.includes("vital")) {
      if (currentUser && isUserPage && currentUser.vitals) {
        const bp = currentUser.vitals.bloodPressure;
        return `🩺 **Your Current Vitals:**\n\n${currentUser.vitals.bloodPressure ? `• Blood Pressure: ${currentUser.vitals.bloodPressure}` : ""}\n${currentUser.vitals.heartRate ? `• Heart Rate: ${currentUser.vitals.heartRate}` : ""}\n${currentUser.vitals.bloodSugar ? `• Blood Sugar: ${currentUser.vitals.bloodSugar}` : ""}\n${currentUser.vitals.cholesterol ? `• Cholesterol: ${currentUser.vitals.cholesterol}` : ""}\n${currentUser.vitals.painLevel ? `• Pain Level: ${currentUser.vitals.painLevel}` : ""}\n\n💡 Keep monitoring your vitals regularly and share any concerns with your doctor.`;
      }
      return currentUser && isUserPage ? "No vitals recorded yet. Please check with your healthcare provider." : "Please sign in as a user to see your vitals.";
    }

    if (lowerMessage.includes("condition") || lowerMessage.includes("diagnosis") || lowerMessage.includes("disease") || lowerMessage.includes("what do i have")) {
      if (currentUser && isUserPage) {
        return `🏥 **Your Health Condition:** ${currentUser.condition || "No specific condition recorded"}\n\n💚 **Age:** ${currentUser.age || "N/A"}\n📅 **Last Check-in:** ${currentUser.lastCheckIn || "N/A"}\n\n💡 Managing **${currentUser.condition || "your health"}** requires consistent medication adherence and regular check-ups. I'm here to help you stay on track!`;
      }
      return "Please sign in as a user to see your condition information.";
    }

    // Check for drug-specific questions
    for (const [drug, info] of Object.entries(drugInfoDatabase)) {
      if (lowerMessage.includes(drug.toLowerCase())) {
        return `💊 **About ${drug}:**\n\n${info}`;
      }
    }

    // Check general medical FAQs
    for (const [topic, info] of Object.entries(generalMedicalInfo)) {
      if (lowerMessage.includes(topic.toLowerCase())) {
        return `🏥 **${topic.charAt(0).toUpperCase() + topic.slice(1)}:**\n\n${info}`;
      }
    }

    // Common health queries
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage.includes("hey")) {
      return currentUser && isUserPage
        ? `Hello ${currentUser.name}! How can I help you with your health today? I can provide medication updates, schedule info, or general health advice.`
        : "Hello! How can I help you today? I can provide general health information and tips.";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! Remember, your health is important. Don't hesitate to reach out if you need any assistance with your medications or health questions. 💚";
    }

    if (lowerMessage.includes("help")) {
      return "I can help you with:\n\n• **Medication reminders** - Ask about your current medications\n• **Schedule information** - View your weekly medication calendar\n• **Drug information** - Learn about your specific medications\n• **Health tips** - Get personalized wellbeing advice\n• **General health info** - Answers to common health questions\n\nWhat would you like to know?";
    }

    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || lowerMessage.includes("911") || lowerMessage.includes("pain") || lowerMessage.includes("hurt")) {
      return "⚠️ **Important:** If you're experiencing a medical emergency, chest pain, difficulty breathing, or severe symptoms, please call emergency services (911) or go to the nearest emergency room immediately. This chatbot is for informational purposes only and cannot provide emergency medical advice.";
    }

    // Default response
    return "I'm here to help with your health questions! You can ask me about:\n\n• Your medications and schedule (if logged in)\n• Information about specific drugs\n• General health topics (blood pressure, diabetes, etc.)\n• Daily health tips\n\nWhat would you like to know?";
  };

  const handleSendMessage = (text: string = inputText, quickAction?: QuickActionType) => {
    if (!text.trim() && !quickAction) return;

    const actionLabel = quickAction ? quickActions.find(a => a.type === quickAction)?.label : "";

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text || actionLabel || "",
      sender: "user",
      timestamp: new Date(),
      quickAction,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateResponse(text, quickAction);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.label, action.type);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render on carer page or certain pages
  if (pathname?.startsWith("/carer")) return null;

  return (
    <>
      {/* Floating Chat Button - Circular, positioned top-right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-90"
            : "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <XMarkIcon className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
            <ChatBubbleLeftEllipsisIcon className="w-7 h-7 text-white" />
            {/* Notification dot for users with pending medications */}
            {currentUser && isUserPage && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-40 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-right fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">CarePulse Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
              </div>
            </div>
            {currentUser && isUserPage && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <UserCircleIcon className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium">{currentUser.name}</span>
              </div>
            )}
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Quick Actions:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.type}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-full text-xs text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors whitespace-nowrap shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 max-h-[350px] min-h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${message.sender === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm"
                    }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line.startsWith("**") && line.endsWith("**") ? (
                        <strong className={message.sender === "user" ? "text-white" : "text-emerald-700"}>
                          {line.replace(/\*\*/g, "")}
                        </strong>
                      ) : line.startsWith("•") ? (
                        <span className="block ml-2">{line}</span>
                      ) : (
                        line
                      )}
                      {i < message.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-400"
                      }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your health question..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <PaperAirplaneIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              💚 Your personal health companion
            </p>
          </div>
        </div>
      )}

      {/* CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
