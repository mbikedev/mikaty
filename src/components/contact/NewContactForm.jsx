// // noinspection JSUnresolvedReference
//
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Send, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
//
// const NewContactForm = ({ t, language }) => {
//   t.contactFormSuccessDescription = undefined;
//   t.contactFormSuccessTitle = undefined;
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };
//
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = language === "en" ? "Name is required" : "Le nom est requis";
//
//     if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = language === "en" ? "Email is invalid" : "L'email est invalide";
//     }
//     if (!formData.subject.trim()) newErrors.subject = language === "en" ? "Subject is required" : "Le sujet est requis";
//     if (!formData.message.trim()) newErrors.message = language === "en" ? "Message is required" : "Le message est requis";
//
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast({
//         title: language === "en" ? "Validation Error" : "Erreur de Validation",
//         description: language === "en" ? "Please fill in all required fields correctly." : "Veuillez remplir correctement tous les champs obligatoires.",
//         variant: "destructive",
//         duration: 5000,
//       });
//       return;
//     }
//     setIsSubmitting(true);
//
//     await new Promise(resolve => setTimeout(resolve, 1500));
//
//     toast({
//       title: t.contactFormSuccessTitle || (language === "en" ? "Message Sent!" : "Message Envoyé !"),
//       description: t.contactFormSuccessDescription || (language === "en" ? "Thank you for reaching out. We'll get back to you soon." : "Merci de nous avoir contactés. Nous vous répondrons bientôt."),
//       duration: 5000,
//     });
//
//     setFormData({
//       name: "",
//       email: "",
//       subject: "",
//       message: ""
//     });
//     setErrors({});
//     setIsSubmitting(false);
//   };
//
//   const formContainerVariants = {
//     initial: { opacity: 0, y: 50 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
//     }
//   };
//
//   const fieldVariants = (delay = 0) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { delay: delay, duration: 0.6, ease: "easeOut" }
//     }
//   });
//
//   // noinspection JSUnresolvedReference
//   return (
//     <motion.div
//       className="bg-background dark:bg-card/80 p-6 md:p-10 rounded-2xl shadow-xl border border-border/20 dark:border-border/10"
//       variants={formContainerVariants}
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
//           <motion.div variants={fieldVariants(0.1)}>
//             <Label htmlFor="name" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
//               {t.contactFormName} <span className="text-destructive">*</span>
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder={language === "en" ? "Your Full Name" : "Votre Nom Complet"}
//               aria-required="true"
//               aria-invalid={!!errors.name}
//               className={`py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.name ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
//             />
//             {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
//           </motion.div>
//           <motion.div variants={fieldVariants(0.2)}>
//             <Label htmlFor="email" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
//               {t.contactFormEmail}
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder={language === "en" ? "your.email@example.com" : "votre.email@example.com"}
//               aria-invalid={!!errors.email}
//               className={`py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.email ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
//             />
//             {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
//           </motion.div>
//         </div>
//         <motion.div variants={fieldVariants(0.3)}>
//           <Label htmlFor="subject" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
//             {t.contactFormSubject} <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder={language === "en" ? "Subject of your message" : "Sujet de votre message"}
//             aria-required="true"
//             aria-invalid={!!errors.subject}
//             className={`py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.subject ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
//           />
//           {errors.subject && <p className="text-xs text-destructive mt-1.5">{errors.subject}</p>}
//         </motion.div>
//         <motion.div variants={fieldVariants(0.4)}>
//           <Label htmlFor="message" className="block text-sm font-medium text-foreground/90 dark:text-foreground/80 mb-1.5">
//             {t.contactFormMessage} <span className="text-destructive">*</span>
//           </Label>
//           <Textarea
//             id="message"
//             name="message"
//             rows={5}
//             value={formData.message}
//             onChange={handleChange}
//             placeholder={language === "en" ? "Type your detailed message here..." : "Écrivez votre message détaillé ici..."}
//             aria-required="true"
//             aria-invalid={!!errors.message}
//             className={`py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary ${errors.message ? 'border-destructive focus:ring-destructive/50' : 'border-input'}`}
//           />
//           {errors.message && <p className="text-xs text-destructive mt-1.5">{errors.message}</p>}
//         </motion.div>
//         <motion.div variants={fieldVariants(0.5)}>
//           <Button
//             type="submit"
//             className="w-full gradient-bg text-white py-3.5 px-6 text-base rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200 ease-in-out flex items-center justify-center"
//             disabled={isSubmitting}
//             aria-live="polite"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                 {t.contactFormSending || (language === "en" ? "Sending..." : "Envoi en cours...")}
//               </>
//             ) : (
//               <>
//                 <Send className="mr-2 h-5 w-5" />
//                 {t.contactFormSend}
//               </>
//             )}
//           </Button>
//         </motion.div>
//       </form>
//     </motion.div>
//   );
// };
//
// export default NewContactForm;