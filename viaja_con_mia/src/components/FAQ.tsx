import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string | string[];
  }[];
}

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    Object.values(questionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getQuestionId = (category: string, question: string) => 
    `${category}-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-24">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-4 text-sky-900">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl text-center text-sky-600 mb-16">
          Todo lo que necesitas saber sobre MIA
        </p>

        <div className="max-w-3xl mx-auto space-y-8">
          {faqData.map((category) => (
            <div
              key={category.category}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-sky-900 pl-4 border-l-4 border-sky-500">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item) => {
                  const questionId = getQuestionId(category.category, item.question);
                  const isVisible = visibleItems.has(questionId);

                  return (
                    <div
                      key={questionId}
                      id={questionId}
                      ref={el => questionRefs.current[questionId] = el}
                      className={`transform transition-all duration-700 ${
                        isVisible 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-32 opacity-0'
                      }`}
                    >
                      <div
                        className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                          hoveredQuestion === item.question 
                            ? 'shadow-xl scale-[1.02] bg-gradient-to-r from-white to-sky-50' 
                            : ''
                        } ${
                          openQuestions[item.question] 
                            ? 'ring-2 ring-sky-500 ring-opacity-50' 
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredQuestion(item.question)}
                        onMouseLeave={() => setHoveredQuestion(null)}
                      >
                        <button
                          onClick={() => toggleQuestion(item.question)}
                          className="w-full text-left p-6 flex items-center justify-between text-lg group"
                        >
                          <span className={`flex-1 pr-4 font-medium transition-colors duration-300 ${
                            hoveredQuestion === item.question ? 'text-sky-600' : 'text-gray-800'
                          }`}>
                            {item.question}
                          </span>
                          <span className={`transform transition-all duration-300 ${
                            openQuestions[item.question] ? 'rotate-180' : ''
                          }`}>
                            <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
                              hoveredQuestion === item.question ? 'text-sky-500' : 'text-gray-400'
                            }`} />
                          </span>
                        </button>

                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            openQuestions[item.question] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 pb-6 text-gray-600">
                            {Array.isArray(item.answer) ? (
                              <ul className="list-disc pl-6 space-y-2">
                                {item.answer.map((point, index) => (
                                  <li key={index} className="text-gray-600">{point}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">{item.answer}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    category: "GENERAL",
    questions: [
      {
        question: "¿Qué es Pídeselo a MIA?",
        answer: "Pídeselo a MIA es un agente de inteligencia artificial especializado en viajes corporativos que ayuda a las PYMEs a gestionar sus reservas de hotel y vuelos con precios corporativos, facturación consolidada y soporte 24/7."
      },
      {
        question: "¿Cómo me ayuda MIA con los viajes de mi empresa?",
        answer: [
          "Buscar y reservar hoteles y vuelos con tarifas corporativas sin importar el tamaño de tu empresa.",
          "Monitorear precios para evitar que pagues de más por tarifas dinámicas.",
          "Automatizar la facturación, entregándote un solo comprobante consolidado y deducible.",
          "Optimizar costos, evitando cargos ocultos y costos innecesarios.",
          "Gestionar cambios y cancelaciones sin dolores de cabeza.",
          "Atenderte 24/7, sin bots que no resuelven."
        ]
      }
    ]
  },
  {
    category: "RESERVACIONES",
    questions: [
      {
        question: "¿Cómo reservo un hotel con MIA?",
        answer: "Solo pídeselo a MIA. Escríbele qué ciudad, fecha y preferencias tienes, y ella te enviará las mejores opciones. Luego, confirmas y listo."
      },
      {
        question: "¿Puedo reservar vuelos con MIA?",
        answer: "¡Sí! MIA te muestra el costo real del viaje (no solo la tarifa base) y te sugiere la mejor opción considerando equipaje, cambios y flexibilidad."
      },
      {
        question: "¿MIA siempre encuentra la tarifa más baja?",
        answer: "MIA no solo busca la tarifa más baja, sino la tarifa más inteligente. Evita costos ocultos como cargos extra por maletas, cambios o cancelaciones, asegurando que realmente pagues menos en total."
      }
    ]
  },
  {
    category: "FACTURACIÓN Y PAGOS",
    questions: [
      {
        question: "¿Cómo funciona la facturación con MIA?",
        answer: "MIA te entrega una sola factura consolidada con todos los servicios de hospedaje y vuelos en un solo comprobante 100% deducible y con CFDI válido para el SAT."
      },
      {
        question: "¿Puedo pagar a crédito o con facturación mensual?",
        answer: "Sí. MIA ofrece opciones de pago flexibles para que no tengas que pagar todo de inmediato y mejores el flujo de caja de tu empresa."
      }
    ]
  },
  {
    category: "SOPORTE Y SERVICIO",
    questions: [
      {
        question: "¿Cómo me comunico con MIA si necesito ayuda?",
        answer: "Puedes escribirle a MIA a través de WhatsApp, la plataforma de reservas o directamente por correo. También puedes llamarnos si necesitas asistencia inmediata."
      },
      {
        question: "¿En cuánto tiempo responde MIA?",
        answer: "MIA responde en segundos y su equipo de soporte humano está disponible 24/7 para emergencias o problemas complejos."
      }
    ]
  }
];

export default FAQ;