/**
 * lucide-react não inclui ícones de marca, então o glifo do WhatsApp vem do
 * próprio design. Todos os demais ícones do projeto são do lucide.
 */
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 3a8.5 8.5 0 0 0-7.4 12.7L3.5 21l5.5-1.4A8.5 8.5 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M8.6 8.3c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.5.6c-.1.1-.2.3-.1.5.2.4.6 1 1.2 1.5.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.5-.6c.2-.2.4-.1.5-.1l1.6.7c.2.1.3.2.3.3 0 .5-.2 1.4-.7 1.7-.5.3-1.4.5-2.6.1-1.3-.4-2.6-1.2-3.8-2.6C7.6 12 7.1 10.6 7 9.9c-.1-.7.1-1.2.4-1.4l1.2-.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
