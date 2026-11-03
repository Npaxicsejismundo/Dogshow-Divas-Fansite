import { motion } from 'framer-motion';
import { cn } from '../../lib/hooks';
import { SplitText } from './SplitText';
import { TornLabel } from './TornLabel';

interface Props {
  kicker: string;
  title: string;
  intro?: string;
  /** id for the h2, used by the section's aria-labelledby. */
  id?: string;
  className?: string;
  align?: 'left' | 'center';
  /** Use `ink` on white sections so the label stays visible. */
  labelTone?: 'paper' | 'ink';
}

export function SectionHeading({ kicker, title, intro, id, className, align = 'left', labelTone }: Props) {
  return (
    <header className={cn('relative', align === 'center' && 'mx-auto text-center', className)}>
      <TornLabel className="-rotate-2" tone={labelTone}>
        {kicker}
      </TornLabel>
      <SplitText
        as="h2"
        id={id}
        text={title}
        className="mt-5 block font-display text-[clamp(2.8rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.03em]"
        swashFirst
      />
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn('mt-5 max-w-[52ch] text-base leading-relaxed opacity-85 sm:text-lg', align === 'center' && 'mx-auto')}
        >
          {intro}
        </motion.p>
      )}
    </header>
  );
}
