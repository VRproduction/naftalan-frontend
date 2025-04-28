'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useTranslations } from 'next-intl';


export default function ContactForm() {
  const tf = useTranslations('pages.contact.form');
  const tContact = useTranslations('contact');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));

    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <>
      {formState.isSubmitted ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{tf('success_title')}</h3>
              <p className="mt-2 text-sm text-green-700">
                {tf('success_message')}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {tf('full_name')}
            </label>
            <input
              type="text"
              id="name"
              placeholder={tContact('name_placeholder')}
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {tf('email')}
            </label>
            <input
              placeholder={tContact('email_placeholder')}
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {tf('phone')}
            </label>
            <input
              placeholder={tContact('phone_placeholder')}
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              {tf('subject')}
            </label>
            <select
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">{tf('subject_placeholder')}</option>
              <option value="reservation">{tf('subject_reservation')}</option>
              <option value="question">{tf('subject_question')}</option>
              <option value="feedback">{tf('subject_feedback')}</option>
              <option value="other">{tf('subject_other')}</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {tf('message')}
          </label>
          <textarea
            placeholder={tContact('message_placeholder')}
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {tf('required_fields')}
          </div>
          
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${
              formState.isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
            }`}
          >
            {formState.isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {tf('sending')}
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                {tf('send')}
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
} 