import React, { useState } from 'react';
import { Send, Calendar, Users, Building, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import AnimatedPlanes from './AnimatedPlanes';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    employees: '',
    monthlyTrips: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true, error: null });

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          employees: formData.employees,
          monthly_trips: formData.monthlyTrips,
          message: formData.message
        }]);

      if (error) throw error;

      setFormStatus({
        submitted: true,
        loading: false,
        error: null
      });
      
      toast.success('¡Mensaje enviado con éxito!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        employees: '',
        monthlyTrips: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: false,
        loading: false,
        error: 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.'
      });
      toast.error('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Toaster position="top-right" />
      <AnimatedPlanes />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-6">
                Contacta con MIA
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Company Input */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Employee Count Select */}
                  <div>
                    <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-2">
                      Número de empleados
                    </label>
                    <select
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="1-10">1-10 empleados</option>
                      <option value="11-50">11-50 empleados</option>
                      <option value="51-200">51-200 empleados</option>
                      <option value="201+">201+ empleados</option>
                    </select>
                  </div>

                  {/* Monthly Trips Select */}
                  <div>
                    <label htmlFor="monthlyTrips" className="block text-sm font-medium text-gray-700 mb-2">
                      Viajes mensuales aprox.
                    </label>
                    <select
                      id="monthlyTrips"
                      name="monthlyTrips"
                      value={formData.monthlyTrips}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="1-5">1-5 viajes</option>
                      <option value="6-20">6-20 viajes</option>
                      <option value="21-50">21-50 viajes</option>
                      <option value="51+">51+ viajes</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo podemos ayudarte?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus.loading || formStatus.submitted}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200
                    ${formStatus.loading || formStatus.submitted 
                      ? 'bg-sky-400 cursor-not-allowed' 
                      : 'bg-sky-500 hover:bg-sky-600 hover:scale-[1.02]'}`}
                >
                  {formStatus.loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Enviando...
                    </>
                  ) : formStatus.submitted ? (
                    <>
                      <CheckCircle size={20} />
                      ¡Mensaje enviado!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar mensaje
                    </>
                  )}
                </button>

                {/* Error Message */}
                {formStatus.error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    {formStatus.error}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Benefits */}
              <div className="bg-sky-900/90 backdrop-blur-sm text-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">
                  ¿Por qué elegir MIA?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-sky-300">
                        {benefit.icon}
                      </div>
                      <p>{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sky-900">{info.title}</h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data
const benefits = [
  {
    icon: <Calendar size={24} />,
    text: "Ahorra hasta 30% en tus reservaciones"
  },
  {
    icon: <Users size={24} />,
    text: "Soporte personalizado 24/7"
  },
  {
    icon: <Building size={24} />,
    text: "Tarifas corporativas garantizadas"
  }
];

const contactInfo = [
  {
    icon: <Mail size={24} />,
    title: "Email",
    content: "contacto@viajaconmia.com"
  },
  {
    icon: <Phone size={24} />,
    title: "Teléfono",
    content: "+52 (55) 1234-5678"
  },
  {
    icon: <MapPin size={24} />,
    title: "Ubicación",
    content: "Ciudad de México, México"
  }
];

export default Contact;