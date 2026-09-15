"use client";

import { useState, useEffect, use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layouts/SiteShell";
import { ProductModal, Product } from "@/components/ProductModal";
import { ChevronRight, Clock, Star, Phone, MapPin } from "lucide-react";
import { useRestaurants } from "@/store/useRestaurants";

export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const restaurant = useRestaurants((state) => state.getRestaurantById(id));
  const allMenuItems = useRestaurants((state) => state.menuItems);
  
  // Filter menu items for this restaurant
  const menuItems = useMemo(() => 
    allMenuItems.filter(item => item.restaurantId === id),
    [allMenuItems, id]
  );

  // Group menu items by category
  const menuCategories = useMemo(() => {
    const categories = new Map<string, typeof menuItems>();
    
    menuItems.forEach((item) => {
      if (!categories.has(item.category)) {
        categories.set(item.category, []);
      }
      categories.get(item.category)?.push(item);
    });

    return Array.from(categories.entries()).map(([category, items]) => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      title: category,
      items,
    }));
  }, [menuItems]);

  // Set initial active category
  useEffect(() => {
    if (menuCategories.length > 0 && !activeCategory) {
      setActiveCategory(menuCategories[0].id);
    }
  }, [menuCategories, activeCategory]);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuCategories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveCategory(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuCategories]);

  if (!restaurant) return notFound();

  const scrollToCategory = (catId: string) => {
    const element = document.getElementById(catId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <SiteShell>
      {/* Hero Header */}
      <div className="relative h-72 w-full bg-slate-900">
        <img 
          src={restaurant.cover} 
          alt={`${restaurant.name} cover`}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex gap-4">
                {restaurant.logo && (
                  <img 
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="h-20 w-20 rounded-xl border-4 border-white object-cover shadow-lg"
                  />
                )}
                <div className="text-white">
                  <h1 className="text-3xl font-bold md:text-4xl">{restaurant.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-200">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {restaurant.rating} ({restaurant.reviews}+ avis)
                    </span>
                    <span>•</span>
                    <span>{restaurant.cuisine}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {restaurant.eta}
                    </span>
                  </div>
                  {restaurant.isOpen ? (
                    <p className="mt-1 text-xs text-green-400">🟢 Ouvert • {restaurant.openingHours}</p>
                  ) : (
                    <p className="mt-1 text-xs text-red-400">🔴 Fermé</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="rounded-lg bg-white/10 px-4 py-2 text-center backdrop-blur-sm">
                  <p className="text-xs text-slate-300">Livraison</p>
                  <p className="font-bold text-white">{restaurant.deliveryFee} FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {menuItems.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">Menu en construction</p>
            <p className="mt-2 text-sm text-slate-600">
              Ce restaurant n'a pas encore ajouté de plats à son menu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-1">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Menu
                </h3>
                {menuCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{cat.title}</span>
                    {activeCategory === cat.id && <ChevronRight size={16} />}
                  </button>
                ))}
                
                <div className="mt-8 rounded-xl bg-slate-50 p-4 space-y-2">
                  {restaurant.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone className="h-3.5 w-3.5" />
                      {restaurant.phone}
                    </div>
                  )}
                  {restaurant.address && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5" />
                      {restaurant.address}
                    </div>
                  )}
                  <Link href="/cart" className="btn btn-accent mt-4 w-full text-sm">
                    Voir mon panier
                  </Link>
                </div>
              </div>
            </aside>

            {/* Mobile Category Nav */}
            <div className="sticky top-[60px] z-10 -mx-4 overflow-x-auto bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm lg:hidden">
              <div className="flex gap-2">
                {menuCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Menu Content */}
            <div className="space-y-16 pb-20">
              {menuCategories.map((category) => (
                <section key={category.id} id={category.id} className="scroll-mt-28">
                  <div className="mb-6 flex items-end justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
                      <p className="text-sm text-slate-500">{category.items.length} article{category.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    {category.items.filter(item => item.available).map((item) => (
                      <div 
                        key={item.id} 
                        className="group relative flex cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:border-[var(--color-primary)] hover:shadow-lg"
                        onClick={() => setSelectedProduct(item as any)}
                      >
                        {item.image && (
                          <div className="h-32 w-32 flex-shrink-0 overflow-hidden bg-slate-100 sm:h-40 sm:w-40">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-[var(--color-primary)]">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">
                              {item.price.toLocaleString()} FCFA
                            </span>
                            <button className="rounded-full bg-slate-100 p-2 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        restaurant={{
          id: restaurant.id,
          name: restaurant.name,
          logo: restaurant.logo,
          cuisine: restaurant.cuisine,
        }}
      />
    </SiteShell>
  );
}
