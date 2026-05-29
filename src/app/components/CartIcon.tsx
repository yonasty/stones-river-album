import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartIcon() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="fixed top-4 right-4 z-40 flex items-center justify-center
                 w-11 h-11 rounded-full bg-zinc-900/80 backdrop-blur-sm
                 border border-white/10 text-white/80
                 transition-all duration-200
                 hover:bg-zinc-800/90 hover:border-white/20 hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-zinc-900"
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
    >
      <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />

      {/* Item count badge */}
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 flex items-center justify-center
                     min-w-[20px] h-5 px-1.5 rounded-full
                     bg-white text-zinc-900 text-xs font-semibold
                     pointer-events-none"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
