import React, { useState } from 'react';
import { AlertCircle, Clock, DollarSign, Calculator, Shield, Phone, Menu, X, Eye, Laptop, Building } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import FAQ from './pages/FAQ';
import Contact from './components/Contact';
import { supabase } from './lib/supabase';
import { MiaLogo } from './components/Logo';

const MiaFeatureIcon = ({ className = "w-96 h-96", rotate = false }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 493 539"
    className={`${className} ${rotate ? '-rotate-12 transform' : ''}`}
  >
    <path
      fill="currentColor"
      d="M205.1,500.5C205.1,500.5,205,500.6,205.1,500.5C140.5,436.1,71.7,369.1,71.7,291.1
      c0-86.6,84.2-157.1,187.6-157.1S447,204.4,447,291.1c0,74.8-63.4,139.6-150.8,154.1c0,0,0,0,0,0l-8.8-53.1
      c61.3-10.2,105.8-52.6,105.8-100.9c0-56.9-60-103.2-133.7-103.2s-133.7,46.3-133.7,103.2c0,49.8,48,93.6,111.7,101.8c0,0,0,0,0,0
      L205.1,500.5L205.1,500.5z"
    />
    <path
      fill="currentColor"
      d="M341,125.5c-2.9,0-5.8-0.7-8.6-2.1c-70.3-37.3-135.9-1.7-138.7-0.2c-8.8,4.9-20,1.8-24.9-7.1
      c-4.9-8.8-1.8-20,7-24.9c3.4-1.9,85.4-47.1,173.8-0.2c9,4.8,12.4,15.9,7.6,24.8C353.9,122,347.6,125.5,341,125.5z"
    />
    <g>
      <path
        fill="currentColor"
        d="M248.8,263.8c-38.1-26-73.7-0.8-75.2,0.2c-6.4,4.6-8.7,14-5.3,21.8c1.9,4.5,5.5,7.7,9.8,8.9
        c4,1.1,8.2,0.3,11.6-2.1c0.9-0.6,21.4-14.9,43.5,0.2c2.2,1.5,4.6,2.3,7.1,2.4c0.2,0,0.4,0,0.6,0c0,0,0,0,0,0
        c5.9,0,11.1-3.7,13.5-9.7C257.8,277.6,255.4,268.3,248.8,263.8z"
      />
      <path
        fill="currentColor"
        d="M348.8,263.8c-38.1-26-73.7-0.8-75.2,0.2c-6.4,4.6-8.7,14-5.3,21.8c1.9,4.5,5.5,7.7,9.8,8.9
        c4,1.1,8.2,0.3,11.6-2.1c0.9-0.6,21.4-14.9,43.5,0.2c2.2,1.5,4.6,2.3,7.1,2.4c0.2,0,0.4,0,0.6,0c0,0,0,0,0,0
        c5.9,0,11.1-3.7,13.5-9.7C357.8,277.6,355.4,268.3,348.8,263.8z"
      />
    </g>
  </svg>
);

const features = [
  {
    icon: <Shield className="w-8 h-8 text-sky-400" />,
    title: "Protección contra\nTarifas Dinámicas",
    description: "MIA monitorea constantemente los precios\ny te garantiza las mejores tarifas\n\ndel mercado."
  },
  {
    icon: <Clock className="w-8 h-8 text-sky-400" />,
    title: "Ahorro de Tiempo",
    description: "Olvídate de comparar precios.\nMIA encuentra las mejores opciones\n\nen segundos."
  },
  {
    icon: <Building className="w-8 h-8 text-sky-400" />,
    title: "Tarifas Corporativas",
    description: "Accede a precios preferenciales\nsin importar el tamaño de tu empresa."
  },
  {
    icon: <Calculator className="w-8 h-8 text-sky-400" />,
    title: "Gestión de Gastos",
    description: "Reportes consolidados y facturación\ncorrecta para una mejor administración."
  },
  {
    icon: <Phone className="w-8 h-8 text-sky-400" />,
    title: "Soporte 24/7",
    description: "Reportes consolidados y facturación\ncorrecta para una mejor administración."
  },
  {
    icon: <Shield className="w-8 h-8 text-sky-400" />,
    title: "Sin Costos Ocultos",
    description: "Transparencia total en precios y\nprotección contra cargos sorpresa."
  }
];

const problems = [
  {
    title: "Precios Inestables",
    description: "Reservaste un hotel por $1,500 MXN... pero cuando vuelves a buscarlo días después, la misma habitación cuesta $3,000 MXN.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Costos Ocultos",
    description: "Compraste un vuelo económico... pero al sumar equipaje, selección de asiento y cambios, terminaste pagando más que una tarifa completa.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Problemas de Facturación",
    description: "Recibiste facturas por separado... y ninguna tiene la información fiscal correcta para deducir impuestos.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const MiaLanding = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setCurrentPage('home');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (!email) {
      toast.error('Por favor, ingresa un correo electrónico válido');
      return;
    }

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast.error('Este correo ya está registrado');
        } else {
          throw error;
        }
      } else {
        toast.success('¡Gracias por suscribirte!');
        emailInput.value = '';
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Error al suscribirse. Por favor, intenta de nuevo.');
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            {/* Hero Section */}
            <div id="top" className="relative bg-gradient-to-r from-sky-600 to-sky-400 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-900/50 to-transparent"></div>
              <div className="container mx-auto px-6 py-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <h1 className="text-5xl font-bold mb-6">
                      ¡Hola! Soy MIA!
                    </h1>
                    <h2 className="text-3xl font-light mb-8">
                      Tu agente de inteligencia<br />
                      para viajes de negocio.
                    </h2>
                    <button 
                      onClick={() => scrollToSection('waitlist')}
                      className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-50 transition-colors shadow-lg"
                    >
                      Pídeselo a MIA
                    </button>
                  </div>
                  <div className="hidden lg:flex justify-center items-center">
                    <div className="text-white transform hover:scale-105 transition-transform duration-500">
                      <MiaFeatureIcon className="w-[400px] h-[400px]" rotate={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white py-20">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="p-6">
                    <div className="w-20 h-20 bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Precios fijos</h3>
                    <p className="text-gray-600">Reservaste un hotel para un viaje de negocio en $1,500 MXN.</p>
                  </div>
                  <div className="p-6">
                    <div className="w-20 h-20 bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Sin costos ocultos</h3>
                    <p className="text-gray-600">Compraste un vuelo económico sin sorpresas en el precio final.</p>
                  </div>
                  <div className="p-6">
                    <div className="w-20 h-20 bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Laptop className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Sin problemas de facturación</h3>
                    <p className="text-gray-600">Recibe todas tus facturas consolidadas y correctamente emitidas.</p>
                  </div>
                </div>
                
                {/* Protection Text Section */}
                <div className="text-center mt-16 max-w-4xl mx-auto space-y-6">
                  <p className="text-4xl md:text-5xl font-bold text-sky-500 leading-tight">
                    MIA te protege de las tarifas dinámicas<br />
                    y encuentra las mejores ofertas del mercado.
                  </p>
                  <p className="text-2xl md:text-3xl text-sky-500">
                    Ahorra tiempo y dinero en tus viajes de negocio.
                  </p>
                </div>
              </div>
            </div>

            {/* How it Works Section */}
            <div id="funciona" className="py-24 bg-gray-50">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-sky-900 mb-20">
                  ¿Cómo funciona?
                </h2>
                
                <div className="relative max-w-5xl mx-auto">
                  {/* Connecting Lines */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sky-200 hidden md:block"></div>
                  <div className="hidden md:flex justify-between absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2">
                    <div className="w-4 h-4 bg-sky-200 transform rotate-45"></div>
                    <div className="w-4 h-4 bg-sky-200 transform rotate-45"></div>
                    <div className="w-4 h-4 bg-sky-200 transform rotate-45"></div>
                  </div>
                  
                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Step 1 */}
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold relative z-10">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-sky-900 mb-4">Pídeselo a MIA</h3>
                      <p className="text-gray-600">
                        Dile lo que necesitas: un vuelo,<br />hotel o cambio de itinerario.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold relative z-10">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-sky-900 mb-4">MIA lo hace por ti</h3>
                      <p className="text-gray-600">
                        MIA analiza opciones<br />y te presenta la mejor alternativa.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold relative z-10">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-sky-900 mb-4">Confirma y viaja</h3>
                      <p className="text-gray-600">
                        Aprueba la selección y viaja<br />sin preocupaciones.
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold relative z-10">
                        4
                      </div>
                      <h3 className="text-xl font-bold text-sky-900 mb-4">Gestión simplificada</h3>
                      <p className="text-gray-600">
                        Recibe reportes consolidados<br />y facturas correctas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problems Section */}
            <div className="bg-gray-50 py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">¿Te ha pasado esto?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {problems.map((problem, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={problem.image} 
                          alt={problem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                        <p className="text-gray-600">{problem.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-sky-900 text-white py-32 relative overflow-hidden">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-24">
                  ¿Por qué elegir a MIA?
                </h2>
                
                <div className="relative max-w-[1400px] mx-auto px-4 md:px-20">
                  {/* Feature Chat Bubbles Layout - Mobile First */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-[500px] md:gap-y-8 relative">
                    {/* Left Column - Desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:space-y-8 md:gap-y-0">
                      {features.slice(0, 3).map((feature, index) => (
                        <div
                          key={index}
                          className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg relative md:mr-12 max-w-[320px] mx-auto md:mx-0"
                        >
                          {/* Chat bubble pointer */}
                          <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-[-35deg]">
                            <div className="w-4 h-4 bg-white/95 transform rotate-45"></div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-sky-100 p-2 rounded-lg shrink-0">
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sky-900 text-base mb-1 whitespace-pre-line">{feature.title}</h3>
                              <p className="text-gray-600 text-sm whitespace-pre-line">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Center MIA Icon */}
                    <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto my-8 md:my-0 md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                      <div className="text-white">
                        <MiaFeatureIcon className="w-full h-full" />
                      </div>
                    </div>

                    {/* Right Column - Desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:space-y-8 md:gap-y-0">
                      {features.slice(3).map((feature, index) => (
                        <div
                          key={index}
                          className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg relative md:ml-12 max-w-[320px] mx-auto md:mx-0"
                        >
                          {/* Chat bubble pointer */}
                          <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[35deg]">
                            <div className="w-4 h-4 bg-white/95 transform rotate-45"></div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-sky-100 p-2 rounded-lg shrink-0">
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sky-900 text-base mb-1 whitespace-pre-line">{feature.title}</h3>
                              <p className="text-gray-600 text-sm whitespace-pre-line">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div id="waitlist" className="bg-[#0B1B3D] py-24">
              <div className="container mx-auto px-6 text-center text-white">
                <h2 className="text-5xl font-bold mb-4">
                  ¡No te quedes atrás!
                </h2>
                <div className="text-2xl mb-12 space-y-2">
                  <p>Y con tu empresa</p>
                  <p>se parte de la nueva forma</p>
                  <p>de viajar con MIA</p>
                </div>
                <p className="text-3xl mb-8">
                  Únete a nuestra <span className="font-bold">waitlist</span>
                </p>
                <div className="max-w-xl mx-auto space-y-6">
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Correo empresarial"
                      className="w-full px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 text-lg"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-[#1B3C7C] hover:bg-[#264b8f] px-8 py-4 rounded-xl text-xl font-bold transition-colors"
                    >
                      ¡Únete!
                    </button>
                  </form>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    Al registrarte aceptas recibir comunicaciones sobre nuestros servicios. Revisa nuestro aviso de privacidad
                  </p>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div 
              onClick={() => setCurrentPage('home')} 
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <MiaLogo />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('funciona')}
                className="text-gray-600 hover:text-sky-500 transition-colors"
              >
                ¿Cómo te ayudo?
              </button>
              <button 
                onClick={() => setCurrentPage('faq')}
                className="text-gray-600 hover:text-sky-500 transition-colors"
              >
                FAQ
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                Contáctanos
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen 
                ? 'max-h-64 opacity-100 mt-4' 
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col space-y-4 pb-4">
              <button 
                onClick={() => scrollToSection('funciona')}
                className="text-gray-600 hover:text-sky-500 transition-colors text-left"
              >
                ¿Cómo te ayudo?
              </button>
              <button 
                onClick={() => setCurrentPage('faq')}
                className="text-gray-600 hover:text-sky-500 transition-colors text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}

      {/* Toast Container */}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default MiaLanding;