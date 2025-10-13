const CONFETTI_PIECES = [
  // camada principal
  {
    position: 'left-[4%]',
    color: 'bg-emerald-400',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:0s]',
    size: 'h-3.5 w-2.5 rounded-sm',
  },
  {
    position: 'left-[10%]',
    color: 'bg-sky-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:80ms]',
    size: 'h-3 w-2 rounded-sm',
  },
  {
    position: 'left-[16%]',
    color: 'bg-rose-400',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:160ms]',
    size: 'h-2.5 w-3 rounded-md',
  },
  {
    position: 'left-[22%]',
    color: 'bg-amber-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:240ms]',
    size: 'h-3.5 w-2 rounded-sm',
  },
  {
    position: 'left-[28%]',
    color: 'bg-violet-400',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:320ms]',
    size: 'h-3 w-2 rounded-sm',
  },
  {
    position: 'left-[34%]',
    color: 'bg-lime-400',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:400ms]',
    size: 'h-2.5 w-3 rounded-md',
  },
  {
    position: 'left-[40%]',
    color: 'bg-teal-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:480ms]',
    size: 'h-3 w-2 rounded-sm',
  },
  {
    position: 'left-[46%]',
    color: 'bg-emerald-300',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:560ms]',
    size: 'h-3.5 w-2.5 rounded-sm',
  },
  {
    position: 'left-[52%]',
    color: 'bg-fuchsia-400',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:640ms]',
    size: 'h-2.5 w-3 rounded-md',
  },
  {
    position: 'left-[58%]',
    color: 'bg-yellow-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:720ms]',
    size: 'h-3.5 w-2 rounded-sm',
  },
  {
    position: 'left-[64%]',
    color: 'bg-sky-300',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:800ms]',
    size: 'h-3 w-2 rounded-sm',
  },
  {
    position: 'left-[70%]',
    color: 'bg-rose-300',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:880ms]',
    size: 'h-3 w-2.5 rounded-md',
  },
  {
    position: 'left-[76%]',
    color: 'bg-indigo-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:960ms]',
    size: 'h-3.5 w-2 rounded-sm',
  },
  {
    position: 'left-[82%]',
    color: 'bg-emerald-400',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:1040ms]',
    size: 'h-3 w-2 rounded-sm',
  },
  {
    position: 'left-[88%]',
    color: 'bg-sky-500',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:1120ms]',
    size: 'h-2.5 w-3 rounded-md',
  },
  {
    position: 'left-[94%]',
    color: 'bg-amber-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:1200ms]',
    size: 'h-3.5 w-2 rounded-sm',
  },
  // camada extra
  {
    position: 'left-[8%]',
    color: 'bg-blue-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:200ms]',
    size: 'h-2.5 w-1.5 rounded-sm',
  },
  {
    position: 'left-[18%]',
    color: 'bg-emerald-300',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:360ms]',
    size: 'h-2 w-3 rounded',
  },
  {
    position: 'left-[30%]',
    color: 'bg-pink-400',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:520ms]',
    size: 'h-2.5 w-1.5 rounded-sm',
  },
  {
    position: 'left-[44%]',
    color: 'bg-cyan-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:680ms]',
    size: 'h-2 w-3 rounded',
  },
  {
    position: 'left-[56%]',
    color: 'bg-violet-300',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:840ms]',
    size: 'h-2.5 w-1.5 rounded-sm',
  },
  {
    position: 'left-[66%]',
    color: 'bg-emerald-400',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:1000ms]',
    size: 'h-2 w-3 rounded',
  },
  {
    position: 'left-[78%]',
    color: 'bg-orange-400',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:1160ms]',
    size: 'h-2.5 w-1.5 rounded-sm',
  },
  {
    position: 'left-[90%]',
    color: 'bg-sky-500',
    animation: 'animate-confetti-left',
    delay: '[animation-delay:1320ms]',
    size: 'h-2 w-3 rounded',
  },
  {
    position: 'left-[98%]',
    color: 'bg-rose-300',
    animation: 'animate-confetti-center',
    delay: '[animation-delay:1480ms]',
    size: 'h-2.5 w-1.5 rounded-sm',
  },
  {
    position: 'left-[2%]',
    color: 'bg-lime-300',
    animation: 'animate-confetti-right',
    delay: '[animation-delay:1640ms]',
    size: 'h-2 w-3 rounded',
  },
]

export function CelebrationOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {CONFETTI_PIECES.map((piece, index) => (
        <span
          key={index}
          className={[
            'absolute top-[-12%] opacity-0',
            piece.position,
            piece.color,
            piece.animation,
            piece.delay,
            piece.size,
            'drop-shadow-[0_6px_12px_rgba(50,205,140,0.25)]',
          ].join(' ')}
        />
      ))}
    </div>
  )
}
