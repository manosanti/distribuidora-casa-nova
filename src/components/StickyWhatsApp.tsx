import { WhatsAppIcon } from './WhatsAppIcon';
import { site, waCotacao } from '@/lib/site';

export function StickyWhatsApp() {
  if (!site.stickyEnabled) return null;

  return (
    <a
      href={waCotacao()}
      target="_blank"
      rel="noopener"
      aria-label="Fazer cotação no WhatsApp"
      className="sticky-wa"
    >
      <WhatsAppIcon size={24} />
      <span>Cotação</span>
    </a>
  );
}
