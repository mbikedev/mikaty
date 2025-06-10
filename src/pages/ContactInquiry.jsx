import React from "react";
import ContactInquiryHeader from "@/components/contact/ContactInquiryHeader";
import ContactPhoneInfo from "@/components/contact/ContactPhoneInfo";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";

const ContactInquiry = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 min-h-screen">
      <ContactInquiryHeader />
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <ContactPhoneInfo />
          <ContactInquiryForm />
        </div>
      </section>
    </div>
  );
};

export default ContactInquiry;