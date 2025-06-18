// noinspection JSUnresolvedReference

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

let ContactForm;
ContactForm = ({t, language}) => {
  const {toast} = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: language === "en" ? "Message Sent!" : "Message Envoyé !",
      description: language === "en" ? "Thank you for reaching out. We'll get back to you soon." : "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
      duration: 5000,
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setIsSubmitting(false);
  };

  // noinspection JSUnresolvedReference
  return (
      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name"
                     className="block text-sm font-medium text-foreground/80 dark:text-foreground/70 mb-2">
                {t.contactFormName} <span className="text-destructive">*</span>
              </label>
              <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email"
                     className="block text-sm font-medium text-foreground/80 dark:text-foreground/70 mb-2">
                {t.contactFormEmail} <span className="text-destructive">*</span>
              </label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject"
                   className="block text-sm font-medium text-foreground/80 dark:text-foreground/70 mb-2">
              {t.contactFormSubject} <span className="text-destructive">*</span>
            </label>
            <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message"
                   className="block text-sm font-medium text-foreground/80 dark:text-foreground/70 mb-2">
              {t.contactFormMessage} <span className="text-destructive">*</span>
            </label>
            <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
            />
          </div>
          <Button
              type="submit"
              className="gradient-bg w-full"
              disabled={isSubmitting}
          >
            {isSubmitting ? (
                <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
                  {language === "en" ? "Sending..." : "Envoi en cours..."}
            </span>
            ) : (
                <span className="flex items-center">
              <Send className="mr-2 h-4 w-4"/>
                  {t.contactFormSend}
            </span>
            )}
          </Button>
        </form>
      </div>
  );
};

