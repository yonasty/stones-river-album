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
          console.log('[Shopify] Initializing client', { domain: shopifyConfig.domain, tokenPresent: !!shopifyConfig.storefrontAccessToken });
          const client = window.ShopifyBuy.buildClient({
            domain: shopifyConfig.domain,
            storefrontAccessToken: shopifyConfig.storefrontAccessToken,
          });
          if (!cancelled) {
            setShopifyClient(client);
            setShopifyAvailable(true);
            setSdkLoading(false);
            console.log('[Shopify] Client initialized successfully');
          }
        }
      } catch (err) {
        console.warn('[Shopify] Client initialization failed:', err);
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

  // Fetch product data (images + descriptions) directly from Shopify Storefront API
  useEffect(() => {
    if (!shopifyConfig.domain || !shopifyConfig.storefrontAccessToken) return;

    let cancelled = false;

    const fetchProductData = async () => {
      const images: Record<string, string[]> = {};
      const descriptions: Record<string, string> = {};

      await Promise.allSettled(
        preorderProducts.map(async (product) => {
          if (!product.shopifyProductId) return;
          try {
            const gid = product.shopifyProductId;
            console.log(`[Shopify] Fetching product via Storefront API: ${gid}`);

            const query = `
              query getProduct($id: ID!) {
                node(id: $id) {
                  ... on Product {
                    title
                    description
                    descriptionHtml
                    images(first: 10) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            `;

            const response = await fetch(
              `https://${shopifyConfig.domain}/api/2024-01/graphql.json`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
                },
                body: JSON.stringify({ query, variables: { id: gid } }),
              }
            );

            if (!response.ok) {
              console.warn(`[Shopify] HTTP ${response.status} for product ${product.id}`);
              return;
            }

            const data = await response.json();
            const node = data?.data?.node;

            if (!cancelled && node) {
              const productImages = node.images?.edges?.map((edge: any) => edge.node.url).filter(Boolean) || [];
              if (productImages.length > 0) {
                images[product.id] = productImages;
              }
              if (node.descriptionHtml || node.description) {
                descriptions[product.id] = node.descriptionHtml || node.description;
              }
              console.log(`[Shopify] Product ${product.id} fetched:`, { imageCount: productImages.length, hasDescription: !!(node.descriptionHtml || node.description) });
            }
          } catch (err) {
            console.warn(`[Shopify] Failed to fetch product ${product.id}:`, err);
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
  }, []);

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
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-section-bg"
    >

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-[1400px] mx-auto"
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

        {/* Kickstarter-style tier rows — single column vertical stack */}
        <div className="space-y-8">
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
      <ContentModal open={modalOpen} onOpenChange={setModalOpen} className="max-w-4xl">
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

// --- ProductCard Component (Kickstarter-style horizontal row) ---

interface ProductCardProps {
  product: ProductConfig;
  shopifyAvailable: boolean;
  shopifyImage?: string;
  onClick: () => void;
}

function ProductCard({ product, shopifyAvailable, shopifyImage, onClick }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ name: string; image: string; modalImage?: string; modalImages?: string[] } | null>(null);
  const [itemImageIndex, setItemImageIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    setItemImageIndex(0);
  }, [selectedItem]);

  const displayTitle = product.fallbackTitle;
  const displayPrice = product.fallbackPrice;
  const displayImage = shopifyImage || product.fallbackImage;

  const handleAddToCart = () => {
    if (!product.shopifyVariantId) return;

    addItem({
      variantId: product.shopifyVariantId,
      productId: product.shopifyProductId,
      title: product.fallbackTitle,
      price: product.fallbackPrice,
      image: shopifyImage || product.fallbackImage,
    });

    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div
      className="border border-white/10 bg-preorder-card-bg backdrop-blur-sm rounded-lg overflow-hidden
                 transition-all duration-300 hover:border-white/20"
    >
      {/* Desktop: horizontal row layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left column — Product image, tier number, tier name, price */}
        <div className="w-full md:w-[30%] bg-zinc-800/50 flex flex-col items-center justify-center p-4 md:p-6">
          {!imageError ? (
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-full h-48 md:h-52 object-contain mb-4"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 md:h-52 flex flex-col items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-white/30 mb-2" strokeWidth={1.5} />
              <span className="text-white/40 text-xs text-center">{product.fallbackImage.split('/').pop()}</span>
            </div>
          )}
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{product.id.replace('-', ' ')}</p>
          <h3 className="text-lg font-medium text-white/90 text-center mb-2">
            {displayTitle.replace(/^Tier \d+ — /, '')}
          </h3>
          <span className="text-2xl font-semibold text-white">{displayPrice}</span>
        </div>

        {/* Middle column — Description, View Details, Add to Cart */}
        <div className="w-full md:w-[25%] p-5 md:p-6 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-white/5">
          <p className="text-white/60 text-sm leading-relaxed">
            {product.tierDescription}
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={onClick}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md
                         border border-white/10 text-white/70 text-sm
                         hover:border-white/25 hover:text-white/90 hover:bg-white/5
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              <Package className="w-4 h-4" strokeWidth={1.5} />
              <span className="tracking-wide">View Details</span>
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.shopifyVariantId}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md
                         border border-white/10 text-white/70 text-sm
                         hover:border-white/25 hover:text-white/90 hover:bg-white/5
                         transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label={product.shopifyVariantId ? `Add ${displayTitle} to cart` : `${displayTitle} coming soon`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  <span className="tracking-wide">Added ✓</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                  <span className="tracking-wide">{product.shopifyVariantId ? 'Add to Cart' : 'Coming Soon'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right column — Included items list (~45%) */}
        <div className="w-full md:w-[45%] p-5 md:p-6 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-center">
          <p className="text-white/50 text-sm mb-3">
            {product.includedItems.length} item{product.includedItems.length !== 1 ? 's' : ''} included
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {product.includedItems.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedItem({ name: item.name, image: item.image, modalImage: item.modalImage, modalImages: item.modalImages })}
                className="flex items-center gap-3 border border-white/5 bg-zinc-800/30 rounded-md p-3
                           transition-all duration-200 hover:border-white/25 hover:bg-white/5
                           cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded object-contain bg-zinc-800 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-white/80 text-sm leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">Qty: {item.quantity}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Individual item detail modal */}
      <ContentModal open={selectedItem !== null} onOpenChange={(open) => { if (!open) setSelectedItem(null); }} className="max-w-lg">
        {selectedItem && (() => {
          const itemGallery = selectedItem.modalImages && selectedItem.modalImages.length > 0
            ? selectedItem.modalImages
            : [selectedItem.modalImage || selectedItem.image];
          const currentItemImage = itemGallery[itemImageIndex] || itemGallery[0];
          return (
            <div className="flex flex-col items-center gap-4 pt-4">
              <img
                src={currentItemImage}
                alt={selectedItem.name}
                className="w-full max-h-[400px] object-contain rounded-lg"
              />
              {itemGallery.length > 1 && (
                <div className="grid grid-cols-5 gap-1.5 w-full">
                  {itemGallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setItemImageIndex(idx)}
                      className={`w-full aspect-square rounded overflow-hidden border-2 transition-all duration-200 ${
                        idx === itemImageIndex
                          ? 'border-white/80'
                          : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View image ${idx + 1} of ${itemGallery.length}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <p className="text-white text-center text-base leading-relaxed">
                {selectedItem.name}
              </p>
            </div>
          );
        })()}
      </ContentModal>
    </div>
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
    <div className="flex flex-col md:flex-row gap-6 pt-6">
      {/* Left — Product image + thumbnails */}
      <div className="w-full md:w-2/5 flex flex-col items-center gap-3 min-h-0">
        <div className="relative w-full rounded-md overflow-hidden bg-zinc-800 flex items-center justify-center"
             style={{ maxHeight: '240px' }}>
          {!imageError ? (
            <img
              src={currentImage}
              alt={product.fallbackTitle}
              className="max-w-full max-h-[240px] object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-40 flex flex-col items-center justify-center border border-white/10">
              <ImageIcon className="w-8 h-8 text-white/30 mb-2" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Thumbnail navigation — grid layout, no scroll */}
        {gallery.length > 1 && (
          <div className="grid grid-cols-5 gap-1.5 w-full">
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSelectedImageIndex(i); setImageError(false); }}
                className={`flex-shrink-0 w-10 h-10 rounded overflow-hidden border-2 transition-all duration-200 ${
                  i === selectedImageIndex
                    ? 'border-white/80'
                    : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right — Title, price, description, button */}
      <div className="w-full md:w-3/5 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">{product.fallbackTitle}</h3>
          <p className="text-white/60 text-lg">{product.fallbackPrice}</p>
        </div>

        {/* Description — Shopify API when available */}
        <div className="text-white/70 text-sm leading-relaxed flex-1">
          {shopifyDescription ? (
            <div
              className="prose prose-sm prose-invert max-w-none [&_p]:mb-2 [&_ul]:space-y-1 [&_li]:text-white/70"
              dangerouslySetInnerHTML={{ __html: shopifyDescription }}
            />
          ) : (
            <p className="text-white/60">{product.tierDescription}</p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!product.shopifyVariantId}
          className="w-full py-3 px-6 flex items-center justify-center gap-2
                     bg-white text-zinc-900 font-medium rounded-md
                     transition-all duration-200
                     hover:bg-white/90 hover:shadow-lg
                     disabled:opacity-40 disabled:cursor-not-allowed
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
      </div>
    </div>
  );
}
