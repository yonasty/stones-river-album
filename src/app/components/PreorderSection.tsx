import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Package, ShoppingCart, AlertCircle, ImageIcon, Check } from 'lucide-react';
import { preorderProducts, shopifyConfig, type ProductConfig } from '../data/preorderData';
import { ContentModal } from './ContentModal';
import { useIsMobile } from '../hooks/useIsMobile';
import { useCart } from '../context/CartContext';

// Shopify Buy Button JS SDK type declarations
interface ShopifyClient {
  product: {
    fetch: (id: string) => Promise<ShopifyProduct>;
  };
  checkout: {
    create: () => Promise<ShopifyCheckout>;
    addLineItems: (checkoutId: string, lineItems: Array<{ variantId: string; quantity: number }>) => Promise<ShopifyCheckout>;
  };
}

interface ShopifyProduct {
  title: string;
  description: string;
  images: Array<{ src: string }>;
  variants: Array<{ id: string; price: { amount: string } }>;
}

interface ShopifyCheckout {
  id: string;
  webUrl: string;
}

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => ShopifyClient;
    };
  }
}

export function PreorderSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [25, -25] : [50, -50]);

  const [shopifyClient, setShopifyClient] = useState<ShopifyClient | null>(null);
  const [shopifyAvailable, setShopifyAvailable] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductConfig | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [productImages, setProductImages] = useState<Record<string, string[]>>({});
  const [productDescriptions, setProductDescriptions] = useState<Record<string, string>>({});

  const { addItem } = useCart();

  // Load Shopify Buy Button JS SDK via script injection
  useEffect(() => {
    // If credentials are not configured, skip SDK loading
    if (!shopifyConfig.domain || !shopifyConfig.storefrontAccessToken) {
      setSdkLoading(false);
      setShopifyAvailable(false);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const loadShopifySDK = () => {
      try {
        // Check if already loaded
        if (window.ShopifyBuy) {
          initializeClient();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        script.async = true;

        // 15-second timeout for SDK loading
        timeoutId = setTimeout(() => {
          if (!cancelled) {
            setSdkLoading(false);
            setShopifyAvailable(false);
          }
        }, 15000);

        script.onload = () => {
          if (!cancelled) {
            clearTimeout(timeoutId);
            initializeClient();
          }
        };

        script.onerror = () => {
          if (!cancelled) {
            clearTimeout(timeoutId);
            setSdkLoading(false);
            setShopifyAvailable(false);
          }
        };

        document.head.appendChild(script);
      } catch {
        if (!cancelled) {
          setSdkLoading(false);
          setShopifyAvailable(false);
        }
      }
    };

    const initializeClient = () => {
      try {
        if (window.ShopifyBuy) {
          const client = window.ShopifyBuy.buildClient({
            domain: shopifyConfig.domain,
            storefrontAccessToken: shopifyConfig.storefrontAccessToken,
          });
          if (!cancelled) {
            setShopifyClient(client);
            setShopifyAvailable(true);
            setSdkLoading(false);
          }
        }
      } catch {
        if (!cancelled) {
          setSdkLoading(false);
          setShopifyAvailable(false);
        }
      }
    };

    loadShopifySDK();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch product data (images + descriptions) from Shopify once the client is available
  useEffect(() => {
    if (!shopifyClient || !shopifyAvailable) return;

    let cancelled = false;

    const fetchProductData = async () => {
      const images: Record<string, string[]> = {};
      const descriptions: Record<string, string> = {};

      await Promise.allSettled(
        preorderProducts.map(async (product) => {
          if (!product.shopifyProductId) return;
          try {
            const shopifyProduct = await shopifyClient.product.fetch(product.shopifyProductId);
            if (!cancelled) {
              if (shopifyProduct.images && shopifyProduct.images.length > 0) {
                images[product.id] = shopifyProduct.images.map((img) => img.src);
              }
              if (shopifyProduct.description) {
                descriptions[product.id] = shopifyProduct.description;
              }
            }
          } catch {
            // Silently fall back to local data
          }
        })
      );

      if (!cancelled) {
        setProductImages(images);
        setProductDescriptions(descriptions);
      }
    };

    fetchProductData();

    return () => {
      cancelled = true;
    };
  }, [shopifyClient, shopifyAvailable]);

  const handleCardClick = useCallback((product: ProductConfig) => {
    setSelectedProduct(product);
    setAddedFeedback(false);
    setModalOpen(true);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedProduct) return;

    const image = (productImages[selectedProduct.id] && productImages[selectedProduct.id][0]) || selectedProduct.fallbackImage;

    addItem({
      variantId: selectedProduct.shopifyVariantId,
      productId: selectedProduct.shopifyProductId,
      title: selectedProduct.fallbackTitle,
      price: selectedProduct.fallbackPrice,
      image,
    });

    // Show "Added ✓" feedback briefly
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  }, [selectedProduct, productImages, addItem]);

  const isShopifyConfigured = Boolean(shopifyConfig.domain && shopifyConfig.storefrontAccessToken);

  return (
    <section
      ref={ref}
      id="preorder-stones-river"
      className="relative w-full py-20 px-6 md:px-12"
    >
      {/* Semi-transparent overlay for text readability against blue background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl text-parchment mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Preorder Stones River
          </motion.h2>
        </div>

        {/* Fallback notice when Shopify is not configured */}
        {!isShopifyConfigured && !sdkLoading && (
          <motion.div
            className="mb-8 p-4 border border-amber-500/40 bg-amber-900/20 rounded-lg text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-200/80 text-sm">
              <AlertCircle className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              Shopify integration pending — configure <code className="text-amber-300">domain</code> and{' '}
              <code className="text-amber-300">storefrontAccessToken</code> in{' '}
              <code className="text-amber-300">preorderData.ts</code> for live product data and checkout.
            </p>
          </motion.div>
        )}

        {/* Kickstarter-style reward card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preorderProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <ProductCard
                product={product}
                shopifyAvailable={shopifyAvailable}
                shopifyImage={productImages[product.id]?.[0]}
                onClick={() => handleCardClick(product)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <ContentModal open={modalOpen} onOpenChange={setModalOpen} className="max-w-2xl">
        {selectedProduct && (
          <ProductModalContent
            product={selectedProduct}
            shopifyAvailable={shopifyAvailable}
            shopifyGallery={productImages[selectedProduct.id] || []}
            shopifyDescription={productDescriptions[selectedProduct.id] || ''}
            addedFeedback={addedFeedback}
            onAddToCart={handleAddToCart}
          />
        )}
      </ContentModal>
    </section>
  );
}

// --- ProductCard Component ---

interface ProductCardProps {
  product: ProductConfig;
  shopifyAvailable: boolean;
  shopifyImage?: string;
  onClick: () => void;
}

function ProductCard({ product, shopifyAvailable, shopifyImage, onClick }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const displayTitle = product.fallbackTitle;
  const displayPrice = product.fallbackPrice;
  const displayImage = shopifyImage || product.fallbackImage;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full h-full flex flex-col border border-white/10 bg-zinc-900/70 backdrop-blur-sm
                 rounded-lg overflow-hidden transition-all duration-300
                 hover:border-white/25 hover:bg-zinc-800/80 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]
                 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-zinc-900
                 text-left cursor-pointer"
      aria-label={`View details for ${displayTitle}`}
    >
      {/* Price badge — prominent at top */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-2xl font-semibold text-white">{displayPrice}</span>
      </div>

      {/* Product image */}
      <div className="relative w-full aspect-square bg-zinc-800/50 overflow-hidden">
        {!imageError ? (
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-white/10 bg-zinc-800 p-4">
            <ImageIcon className="w-8 h-8 text-white/30 mb-2" strokeWidth={1.5} />
            <span className="text-white/40 text-xs text-center">{product.fallbackImage.split('/').pop()}</span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Tier name */}
        <h3 className="text-lg font-medium text-white/90 mb-2 group-hover:text-white transition-colors">
          {displayTitle}
        </h3>

        {/* Includes list */}
        {product.tierIncludes && product.tierIncludes.length > 0 && (
          <ul className="space-y-1.5 text-white/60 text-xs leading-relaxed mb-4 flex-1">
            {product.tierIncludes.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-white/40 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
            {product.tierIncludes.length > 4 && (
              <li className="text-white/40 italic">+ {product.tierIncludes.length - 4} more...</li>
            )}
          </ul>
        )}

        {/* CTA hint */}
        <div className="mt-auto pt-3 flex items-center justify-center gap-2 py-2.5 rounded-md
                        border border-white/10 text-white/60 text-sm
                        group-hover:border-white/25 group-hover:text-white/80 transition-all">
          <Package className="w-4 h-4" strokeWidth={1.5} />
          <span className="tracking-wide">View Details</span>
        </div>
      </div>
    </button>
  );
}

// --- ProductModalContent Component ---

interface ProductModalContentProps {
  product: ProductConfig;
  shopifyAvailable: boolean;
  shopifyGallery: string[];
  shopifyDescription: string;
  addedFeedback: boolean;
  onAddToCart: () => void;
}

function ProductModalContent({
  product,
  shopifyAvailable,
  shopifyGallery,
  shopifyDescription,
  addedFeedback,
  onAddToCart,
}: ProductModalContentProps) {
  const [imageError, setImageError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Build gallery: Shopify images or fallback
  const gallery = shopifyGallery.length > 0 ? shopifyGallery : [product.fallbackImage];
  const currentImage = gallery[selectedImageIndex] || gallery[0];

  return (
    <div className="space-y-6 pt-8">
      {/* Main Product Image — preserves aspect ratio, no cropping */}
      <div className="relative w-full rounded-md overflow-hidden bg-zinc-800 flex items-center justify-center"
           style={{ minHeight: '200px', maxHeight: '400px' }}>
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.fallbackTitle}
            className="max-w-full max-h-[400px] object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 flex flex-col items-center justify-center border border-white/10">
            <ImageIcon className="w-10 h-10 text-white/30 mb-2" strokeWidth={1.5} />
            <span className="text-white/40 text-xs">{product.fallbackImage.split('/').pop()}</span>
          </div>
        )}
      </div>

      {/* Thumbnail navigation — only show if multiple images */}
      {gallery.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          {gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setSelectedImageIndex(i); setImageError(false); }}
              className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                i === selectedImageIndex
                  ? 'border-white/80 ring-1 ring-white/30'
                  : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${product.fallbackTitle} image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div>
        <h3 className="text-2xl font-medium text-white mb-1">
          {product.fallbackTitle}
        </h3>
        <p className="text-white/60 text-xl">
          {product.fallbackPrice}
        </p>
      </div>

      {/* Description — uses Shopify description when available, falls back to local tier data */}
      <div className="text-white/70 text-sm leading-relaxed">
        {shopifyDescription ? (
          <div
            className="prose prose-sm prose-invert max-w-none [&_p]:mb-3 [&_ul]:space-y-1 [&_li]:text-white/70"
            dangerouslySetInnerHTML={{ __html: shopifyDescription }}
          />
        ) : (
          <>
            <p className="mb-3 text-white/80">{product.cardDescription}</p>
            {product.tierIncludes && product.tierIncludes.length > 0 && (
              <>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Includes:</p>
                <ul className="space-y-1.5">
                  {product.tierIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white/40 mt-1 text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>

      {/* Shopify fallback notice */}
      {!shopifyAvailable && (
        <div className="p-3 border border-amber-500/30 bg-amber-900/10 rounded text-amber-200/70 text-xs">
          <AlertCircle className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
          Full product description from Shopify will appear here once credentials are configured.
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={!product.shopifyVariantId}
        className="w-full py-3.5 px-6 flex items-center justify-center gap-2
                   bg-white text-zinc-900 font-medium rounded-md
                   transition-all duration-200
                   hover:bg-white/90 hover:shadow-lg
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-none
                   focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        {addedFeedback ? (
          <>
            <Check className="w-4 h-4" />
            <span>Added ✓</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>{product.shopifyVariantId ? 'Add to Cart' : 'Coming Soon'}</span>
          </>
        )}
      </button>

      {!product.shopifyVariantId && (
        <p className="text-center text-white/40 text-xs">
          This tier is not yet available for purchase.
        </p>
      )}
    </div>
  );
}
