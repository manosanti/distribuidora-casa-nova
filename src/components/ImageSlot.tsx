import Image from 'next/image';

type Props = {
  /** Texto exibido enquanto não há foto cadastrada para o slot. */
  hint: string;
  /** Caminho da imagem, quando o item já tiver foto. */
  src?: string;
  escuro?: boolean;
};

/**
 * Placeholder de imagem herdado do design (`<image-slot>`). Enquanto o
 * catálogo não tiver fotos, mostra a dica; assim que `src` for preenchido,
 * renderiza a imagem otimizada.
 */
export function ImageSlot({ hint, src, escuro }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={hint}
        fill
        sizes="(max-width: 700px) 100vw, 300px"
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <div className={escuro ? 'image-slot image-slot--escuro' : 'image-slot'}>
      <span>{hint}</span>
    </div>
  );
}
