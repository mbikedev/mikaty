import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import {motion, AnimatePresence} from "framer-motion";
import {X} from "lucide-react";

const GuaranteedDialog = ({open, onOpenChange, title, description, children}) => {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal forceMount>
                <AnimatePresence>
                    {open && (
                        <>
                            {/* Background overlay */}
                            <RadixDialog.Overlay asChild>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 0.5}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
                                    className="fixed inset-0 bg-black/80 z-50"
                                />
                            </RadixDialog.Overlay>

                            {/* Dialog content */}
                            <RadixDialog.Content asChild>
                                <motion.div
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.95}}
                                    transition={{duration: 0.3}}
                                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                                >
                                    <div
                                        className="w-full max-w-md max-h-[90vh] rounded-xl bg-slate-800 border border-purple-700 p-4 sm:p-6 shadow-lg overflow-y-auto relative"
                                    >
                                        {/* Close button */}
                                        <RadixDialog.Close asChild>
                                            <button
                                                type="button"
                                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
                                            >
                                                <X className="w-6 h-6"/>
                                            </button>
                                        </RadixDialog.Close>

                                        {/* Title + Description */}
                                        <RadixDialog.Title
                                            className="text-purple-400 text-xl font-bold mb-2 text-center">
                                            {title}
                                        </RadixDialog.Title>
                                        <RadixDialog.Description className="text-gray-300 mb-6 text-center">
                                            {description}
                                        </RadixDialog.Description>

                                        {/* Content */}
                                        <div className="flex justify-center items-center">
                                            {children}
                                        </div>
                                    </div>
                                </motion.div>
                            </RadixDialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};

export default GuaranteedDialog;
