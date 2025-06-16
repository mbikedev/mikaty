import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send as SendIcon, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ContactInquiryForm = () => {
  const { language, translations: t } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.inquiryFormValidationFullNameRequired || "Full Name is required.";
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.inquiryFormValidationEmailInvalid || "Please enter a valid email address.";
    }
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = t.inquiryFormValidationMobileRequired || "Mobile Number is required.";
    if (!formData.subject.trim()) newErrors.subject = t.inquiryFormValidationSubjectRequired || "Subject is required.";
    if (!formData.message.trim()) newErrors.message = t.inquiryFormValidationMessageRequired || "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: t.inquiryFormErrorTitle || "Validation Error",
        description: language === "en" ? "Please fill in all required fields correctly." : "Veuillez remplir correctement tous les champs obligatoires.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Form Data Submitted:", formData);

    toast({
      title: t.inquiryFormSuccessTitle || "Message Sent!",
      description: t.inquiryFormSuccessDescription || "Thank you for your inquiry. We will get back to you shortly.",
      duration: 5000,
    });

    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      subject: "",
      message: ""
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-card dark:bg-slate-800/80 p-6 md:p-10 rounded-xl shadow-2xl border border-border/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div custom={0} initial="hidden" animate="visible" variants={inputVariants}>
            <Label htmlFor="fullName" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
              {t.inquiryFormFullNameLabel || "Full Name"} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t.inquiryFormFullNamePlaceholder || "e.g., John Doe"}
              aria-required="true"
              aria-invalid={!!errors.fullName}
              className={`transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-sm ${errors.fullName ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
            />
            {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
          </motion.div>
          <motion.div custom={1} initial="hidden" animate="visible" variants={inputVariants}>
            <Label htmlFor="email" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
              {t.inquiryFormEmailLabel || "Email"}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.inquiryFormEmailPlaceholder || "e.g., john.doe@example.com"}
              aria-invalid={!!errors.email}
              className={`transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-sm ${errors.email ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </motion.div>
        </div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={inputVariants}>
          <Label htmlFor="mobileNumber" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
            {t.inquiryFormMobileLabel || "Mobile Number"} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder={t.inquiryFormMobilePlaceholder || "e.g., +221 XX XXX XX XX"}
            aria-required="true"
            aria-invalid={!!errors.mobileNumber}
            className={`transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-sm ${errors.mobileNumber ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
          />
          {errors.mobileNumber && <p className="text-xs text-destructive mt-1">{errors.mobileNumber}</p>}
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={inputVariants}>
          <Label htmlFor="subject" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
            {t.inquiryFormSubjectLabel || "Subject"} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t.inquiryFormSubjectPlaceholder || "e.g., Inquiry about Premium Plan"}
            aria-required="true"
            aria-invalid={!!errors.subject}
            className={`transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-sm ${errors.subject ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
          />
          {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={inputVariants}>
          <Label htmlFor="message" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
            {t.inquiryFormMessageLabel || "Message"} <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={t.inquiryFormMessagePlaceholder || "Write your message here..."}
            aria-required="true"
            aria-invalid={!!errors.message}
            className={`transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-sm ${errors.message ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
          />
          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
        </motion.div>

        <motion.div custom={5} initial="hidden" animate="visible" variants={inputVariants}>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center group"
            disabled={isSubmitting}
            aria-live="polite"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t.inquiryFormSendingButton || "Sending..."}
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                {t.inquiryFormSendButton || "Send"}
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactInquiryForm;