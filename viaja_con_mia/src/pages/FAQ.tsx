import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { MiaFeatureIcon } from '../components/Icons';

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string | string[];
  }[];
}

const FAQ = () => {
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

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getQuestionId = (category: string, question: string) => 
    `${category}-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-600 to-sky-400 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/50 to-transparent"></div>
        <div className="container mx-auto px-6 py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-6">
                Preguntas Frecuentes
              </h1>
              <p className="text-2xl font-light mb-8">
                Todo lo que necesitas saber sobre MIA
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="text-white transform hover:scale-105 transition-transform duration-500">
                <MiaFeatureIcon className="w-[400px] h-[400px]" rotate={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqData.map((category) => (
              <div key={category.category} className="space-y-6">
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
                                    <li key={index}>{point}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{item.answer}</p>
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
    </div>
  );
};

const faqData = [
  {
    category: "PRECIOS Y TARIFAS",
    questions: [
      {
        question: "¿Por qué los precios cambian tanto?",
        answer: "Los precios de hoteles y vuelos utilizan tarifas dinámicas que cambian según la demanda. MIA te protege de estas fluctuaciones asegurando tarifas fijas y precios corporativos que no cambian inesperadamente."
      },
      {
        question: "¿Qué son las tarifas dinámicas?",
        answer: "Las tarifas dinámicas son precios que fluctúan según la demanda, temporada y disponibilidad. Por ejemplo, una habitación de hotel puede costar $1,500 MXN un día y $3,000 MXN al siguiente. MIA te protege de estas variaciones."
      },
      {
        question: "¿Cómo me protege MIA de los precios inestables?",
        answer: [
          "Monitoreo constante de precios para detectar fluctuaciones",
          "Acceso a tarifas corporativas fijas",
          "Bloqueo de precios para tus reservaciones",
          "Alertas de cambios de precio significativos",
          "Recomendaciones de mejores momentos para reservar"
        ]
      }
    ]
  },
  {
    category: "COSTOS Y CARGOS",
    questions: [
      {
        question: "¿Qué son los costos ocultos en viajes?",
        answer: "Los costos ocultos son cargos adicionales que no son evidentes al momento de la reserva, como equipaje, selección de asientos, cambios de itinerario o cargos por servicio. MIA te muestra el costo total desde el inicio."
      },
      {
        question: "¿Cómo evita MIA los costos sorpresa?",
        answer: [
          "Muestra el costo total desde el inicio, incluyendo todos los cargos",
          "Incluye equipaje y selección de asientos en las cotizaciones",
          "Transparencia total en políticas de cambio y cancelación",
          "Sin comisiones ocultas por servicio"
        ]
      },
      {
        question: "¿Qué pasa si necesito hacer cambios en mi reserva?",
        answer: "MIA te muestra las políticas de cambio y cancelación antes de reservar, y te ayuda a elegir tarifas con flexibilidad cuando es necesario. Además, nuestro equipo te asiste en cualquier modificación sin costos adicionales de gestión."
      }
    ]
  },
  {
    category: "FACTURACIÓN",
    questions: [
      {
        question: "¿Cómo maneja MIA la facturación?",
        answer: "MIA consolida todas tus reservaciones en una sola factura mensual con la información fiscal correcta, facilitando la deducción de impuestos y el control de gastos."
      },
      {
        question: "¿Qué problemas resuelve la facturación consolidada?",
        answer: [
          "Elimina la necesidad de solicitar facturas individuales",
          "Asegura que toda la información fiscal sea correcta",
          "Facilita la deducción de impuestos",
          "Simplifica la contabilidad y el control de gastos",
          "Reduce el tiempo de gestión administrativa"
        ]
      },
      {
        question: "¿Las facturas son deducibles de impuestos?",
        answer: "Sí, todas las facturas emitidas por MIA cumplen con los requisitos del SAT y son 100% deducibles. Incluimos toda la información fiscal necesaria y emitimos CFDI válidos."
      }
    ]
  },
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
          "Buscar y reservar hoteles y vuelos con tarifas corporativas sin importar el tamaño de tu empresa",
          "Monitorear precios para evitar que pagues de más por tarifas dinámicas",
          "Automatizar la facturación, entregándote un solo comprobante consolidado y deducible",
          "Optimizar costos, evitando cargos ocultos y costos innecesarios",
          "Gestionar cambios y cancelaciones sin dolores de cabeza",
          "Atenderte 24/7, sin bots que no resuelven"
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