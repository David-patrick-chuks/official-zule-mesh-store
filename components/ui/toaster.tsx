"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Info } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        const getIcon = () => {
          switch (variant) {
            case "destructive":
              return <XCircle className="h-5 w-5 text-red-400" />
            case "default":
              return <CheckCircle className="h-5 w-5 text-cyan-400" />
            default:
              return <Info className="h-5 w-5 text-blue-400" />
          }
        }

        const getStyles = () => {
          switch (variant) {
            case "destructive":
              return "bg-red-950/90 border-red-500/30 text-red-50 backdrop-blur-sm"
            case "default":
              return "bg-gray-900/90 border-cyan-500/30 text-white backdrop-blur-sm"
            default:
              return "bg-gray-900/90 border-gray-700/50 text-white backdrop-blur-sm"
          }
        }

        return (
          <Toast key={id} className={`${getStyles()} shadow-2xl`} {...props}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
              <div className="flex-1 min-w-0">
                {title && <ToastTitle className="font-semibold text-base leading-tight">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm opacity-90 mt-1 leading-relaxed">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="text-gray-400 hover:text-white transition-colors" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}
