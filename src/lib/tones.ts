import type { Tone } from '../content';

/** Background + text pairs that pass contrast for each colour token. */
export const toneClass: Record<Tone, string> = {
  ink: 'bg-ink text-paper',
  paper: 'bg-paper text-ink',
  curtain: 'bg-curtain text-paper',
  diva: 'bg-diva text-ink',
  spot: 'bg-spot text-ink',
};

export const toneVar: Record<Tone, string> = {
  ink: 'var(--color-ink)',
  paper: 'var(--color-paper)',
  curtain: 'var(--color-curtain)',
  diva: 'var(--color-diva)',
  spot: 'var(--color-spot)',
};
