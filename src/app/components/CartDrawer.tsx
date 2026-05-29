import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { shopifyConfig } from '../data/preorderData';

/** Extract numeric ID from Shopify GID format */
function getNumericId(gid: string): string {
  return gid.split('/').pop() || '';
}

export function CartDrawer() {
  const { items, itemCount, subtotal, isDrawerOpen, closeDrawer, removeItem, updateQuantity, clearCart } = useCart();

  const shopifyDomain = shopifyConfig.domain;
  const checkoutAvailable = Boolean(shopifyDomain);

  const handleCheckout = () => {
    if (!checkoutAvailable || items.length === 0) return;

    const cartPath = items
      .map((item) => `${getNumericId(item.variantId)}:${item.quantity}`)
      .join(',');

    const cartUrl = `https://${shopifyDomain}/cart/${cartPath}`;

    console.log('[Cart] Checkout initiated', {
      itemCount,
      domainConfigured: !!shopifyDomain,
      tokenConfigured: !!shopifyConfig.storefrontAccessToken,
    });

    window.open(cartUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md
                   flex flex-col bg-zinc-900 border-l border-white/10 shadow-2xl
                   animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white/70" strokeWidth={1.5} />
            <h2 className="text-lg font-medium text-white">
              Cart {itemCount > 0 && <span className="text-white/50">({itemCount})</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10
                       transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-white/20 mb-4" strokeWidth={1} />
              <p className="text-white/50 text-sm">Your cart is empty</p>
              <p className="text-white/30 text-xs mt-1">Add items from the preorder section</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                const lineTotal = numericPrice * item.quantity;

                return (
                  <li
                    key={item.variantId}
                    className="flex gap-4 p-3 rounded-lg border border-white/5 bg-zinc-800/40"
                  >
                    {/* Item image */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white/90 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/50 mt-0.5">{item.price} each</p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded
                                     border border-white/10 text-white/60
                                     hover:border-white/30 hover:text-white transition-colors
                                     focus:outline-none focus:ring-1 focus:ring-white/30"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm text-white/80 w-6 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded
                                     border border-white/10 text-white/60
                                     hover:border-white/30 hover:text-white transition-colors
                                     focus:outline-none focus:ring-1 focus:ring-white/30"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto p-1 text-white/30 hover:text-red-400 transition-colors
                                     focus:outline-none focus:ring-1 focus:ring-white/30 rounded"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="flex-shrink-0 text-right">
                      <span className="text-sm font-medium text-white/70">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-4 space-y-4">
            {/* Clear cart */}
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-white/40 hover:text-white/60 transition-colors
                         focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1"
            >
              Clear cart
            </button>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Subtotal</span>
              <span className="text-white text-lg font-medium">${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!checkoutAvailable}
              className="w-full py-3.5 px-6 flex items-center justify-center gap-2
                         bg-white text-zinc-900 font-medium rounded-md
                         transition-all duration-200
                         hover:bg-white/90 hover:shadow-lg
                         disabled:opacity-40 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Proceed to Checkout
            </button>

            {!checkoutAvailable && (
              <p className="text-center text-white/40 text-xs">
                Checkout unavailable — Shopify domain not configured.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
