import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone as PhoneIcon, User } from "lucide-react";

const RegistrationFormFields = ({ formData, handleChange, t, language }) => (
  <>
    <div>
      <Label htmlFor="fullName">{t.fullNameLabel || (language === "en" ? "Full Name" : "Nom Complet")} <span className="text-destructive">*</span></Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mt-1 pl-10"
          aria-describedby="fullNameError"
        />
      </div>
    </div>
    <div>
      <Label htmlFor="phoneNumber">{t.phoneNumberLabel || (language === "en" ? "Phone Number (for SMS)" : "Numéro de téléphone (pour SMS)")} <span className="text-destructive">*</span></Label>
      <div className="relative">
        <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="mt-1 pl-10"
          placeholder="+221 7X XXX XX XX"
          aria-describedby="phoneNumberError"
        />
      </div>
    </div>
  </>
);

export default RegistrationFormFields;