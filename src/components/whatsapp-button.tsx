import { MessageCircle } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton({
  experienceName,
  className,
}: {
  experienceName?: string;
  className?: string;
}) {
  return (
    <a href={whatsappUrl(experienceName)} target="_blank" rel="noreferrer" className={buttonClassName("primary", className)}>
      <MessageCircle className="h-4 w-4" />
      Reservar por WhatsApp
    </a>
  );
}
