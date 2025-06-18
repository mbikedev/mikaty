// noinspection JSValidateTypes

import React, {useState} from "react";
import {motion} from "framer-motion";
import {ListPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useLanguage, translations} from "@/context/LanguageContext";
import RegistrationFormFields from "@/components/register/RegistrationFormFields";
import RegistrationHero from "@/components/register/RegistrationHero";
import MikatCardImage from "@/assets/images/mikat-summit.webp";
import {useNavigate} from 'react-router-dom';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const Register = () => {
    const {language, getLocalizedPath} = useLanguage();
    const t = translations[language];
    const {toast} = useToast();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fadeIn = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6},
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before proceeding
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Log the data being sent
            console.log('Sending data:', {
                full_name: formData.fullName,
                mobile_number: formData.mobileNumber
            });

            const response = await fetch('https://mikaty.eastatwest.com/admin/api/waiting_list.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'omit',
                body: JSON.stringify({
                    full_name: formData.fullName,
                    mobile_number: formData.mobileNumber
                })
            });

            // Log the raw response
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            // Parse the response as JSON
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', e);
                throw new Error('Invalid server response');
            }

            console.log('Parsed response:', data);

            if (data.success) {
                setSuccess(true);
                toast({
                    title: "Success",
                    description: t.registerSuccess || 'Registration successful',
                    variant: "default",
                });
                // Clear form
                setFormData({
                    fullName: "",
                    mobileNumber: "",
                });
                // Redirect after a short delay
                setTimeout(() => {
                    navigate(getLocalizedPath('/'));
                }, 2000);
            } else {
                throw new Error(data.error || t.registerError || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || t.registerError || 'Registration failed');
            toast({
                title: "Error",
                description: err.message || t.registerError || 'Registration failed',
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.fullName.trim()) {
            errors.push(t.fullNameRequired || 'Full name is required');
        }

        if (!formData.mobileNumber.trim()) {
            errors.push(t.phoneNumberRequired || 'Phone number is required');
        } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.mobileNumber)) {
            errors.push(t.invalidPhoneNumber || 'Please enter a valid phone number');
        }

        if (errors.length > 0) {
            setError(errors[0]); // Show the first error
            return false;
        }

        return true;
    };

    return (
        <>
            <RegistrationHero t={t} pageContext="waitingList"/>

            <section
                className="relative py-16 md:py-24 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-0 left-1/2 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <div
                        className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-400 opacity-20 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse"></div>
                    <div
                        className="absolute left-10 top-1/4 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-full blur-2xl animate-blob"></div>
                    <div
                        className="absolute right-10 bottom-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 opacity-10 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative container mx-auto px-4 md:px-6">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div
                            className="p-8 glass-card rounded-xl shadow-xl bg-white/60 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="rounded-md shadow-sm space-y-4">
                                    <div>
                                        <Label htmlFor="fullName">
                                            {t.fullNameLabel || 'Full Name'} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder={t.fullNamePlaceholder || 'Enter your full name'}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="mobileNumber">
                                            {t.phoneNumberLabel || 'Phone Number (for SMS)'} <span
                                            className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            type="tel"
                                            required
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder={t.phoneNumberPlaceholder || 'Enter your phone number'}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20"
                                                     fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20"
                                                     fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-green-700">
                                                    {t.registrationSuccess || 'Registration successful! Redirecting...'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            {t.registering || 'Registering...'}
                                        </div>
                                    ) : (
                                        <span className="flex items-center justify-center">
                          <ListPlus className="mr-2 h-5 w-5"/>
                                            {t.joinWaitingListButton || 'Join Waiting List'}
                        </span>
                                    )}
                                </Button>
                            </form>
                            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                                {t.waitingListInfoText ||
                                    (language === "en"
                                        ? "We'll notify you via SMS when the app is ready!"
                                        : "Nous vous informerons par SMS lorsque l'application sera prête !")}
                            </p>
                        </div>

                        <motion.div
                            className="flex justify-center items-center"
                            initial={{opacity: 0, scale: 0.95, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0, transition: {duration: 0.8, ease: "easeOut"}}}
                            whileHover={{scale: 1.03, y: -5, transition: {duration: 0.4, ease: "easeOut"}}}
                        >
                            <img
                                src={MikatCardImage}
                                alt="Mikaty Card"
                                className="w-full max-w-sm rounded-2xl shadow-2xl border-2 border-purple-400 dark:border-purple-600"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Register;
