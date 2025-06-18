import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import {motion, AnimatePresence} from "framer-motion";
import {X} from "lucide-react";

const MotionOverlay = React.forwardRef((props, ref) => (
    <motion.div
        ref={ref}
        initial={{opacity: 0}}
        animate={{opacity: 0.5}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
        className="fixed inset-0 bg-black/80 z-50"
        {...props}
    />
));

MotionOverlay.displayName = 'MotionOverlay';

const MotionDialogContent = React.forwardRef((props, ref) => (
    <motion.div
        ref={ref}
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.95}}
        transition={{duration: 0.3}}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        {...props}
    />
));

MotionDialogContent.displayName = 'MotionDialogContent';

const CloseButton = React.forwardRef((props, ref) => (
    <button
        ref={ref}
        type="button"
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        {...props}
    >
        <X className="w-6 h-6"/>
    </button>
));

CloseButton.displayName = 'CloseButton';

const DialogContent = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        className="w-full max-w-md max-h-[90vh] rounded-xl bg-slate-800 border border-purple-700 p-4 sm:p-6 shadow-lg overflow-y-auto relative"
        {...props}
    />
));

DialogContent.displayName = 'DialogContent';

const DialogPortal = React.forwardRef(({ children, ...props }, ref) => (
    <RadixDialog.Portal {...props}>
        <div ref={ref}>
            {children}
        </div>
    </RadixDialog.Portal>
));

DialogPortal.displayName = 'DialogPortal';

const GuaranteedDialog = React.forwardRef(({open, onOpenChange, title, description, children}, ref) => {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <DialogPortal forceMount>
                <AnimatePresence>
                    {open && (
                        <>
                            {/* Background overlay */}
                            <RadixDialog.Overlay asChild>
                                <MotionOverlay />
                            </RadixDialog.Overlay>

                            {/* Dialog content */}
                            <RadixDialog.Content asChild>
                                <MotionDialogContent>
                                    <DialogContent>
                                        {/* Close button */}
                                        <RadixDialog.Close asChild>
                                            <CloseButton />
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
                                    </DialogContent>
                                </MotionDialogContent>
                            </RadixDialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </DialogPortal>
        </RadixDialog.Root>
    );
});

GuaranteedDialog.displayName = 'GuaranteedDialog';

export default GuaranteedDialog;
