import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const QRCodeModal = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=MikatyFinanceAppDownloadLink&bgcolor=ffffff&color=210233&qzone=1";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {language === "en" ? "Download Our App" : "Téléchargez Notre Application"}
          </DialogTitle>
          <DialogDescription className="text-foreground/70 dark:text-foreground/60 mt-2">
            {language === "en" 
              ? "Scan the QR code with your phone's camera to download the Mikaty Finance app."
              : "Scannez le code QR avec l'appareil photo de votre téléphone pour télécharger l'application Mikaty Finance."}
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 flex justify-center">
          <motion.div
            className="p-3 bg-white rounded-lg shadow-md border border-border"
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 25px rgba(var(--primary-rgb), 0.2)" }}
            transition={{ duration: 0.3, ease: "circOut" }}
          >
            <motion.img
              alt="Mikaty Finance App QR Code"
              className="w-48 h-48 md:w-52 md:h-52 object-contain rounded"
              src={qrCodeUrl}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25, ease: "circOut" }}
            />
          </motion.div>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {language === "en" 
            ? "Compatible with iOS and Android devices." 
            : "Compatible avec les appareils iOS et Android."}
        </p>
        <DialogFooter className="mt-6">
          <Button onClick={onClose} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" />
            {language === "en" ? "Close" : "Fermer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;