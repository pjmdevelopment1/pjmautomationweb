// src/components/products/shared/ProductStyles.ts
// 🎨 CENTRAL DESIGN SYSTEM - All Tailwind classes and variants
// ✅ Consistent styling across server and client components
// ✅ Easy maintenance and theme changes
// ✅ 4-column grid optimized

export const productStyles = {
  // 🎯 GRID LAYOUTS - KEY CHANGE: 3 → 4 columns
  grid: {
    // Main product grid - UPDATED TO 4 COLUMNS
    container: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",

    // List view alternative
    list: "space-y-4",

    // Responsive variations
    mobile: "grid-cols-1",
    tablet: "sm:grid-cols-2",
    desktop: "lg:grid-cols-4", // Changed from lg:grid-cols-3

    // Gap variations
    gapSmall: "gap-3",
    gapMedium: "gap-4",
    gapLarge: "gap-6",
  },

  // 🃏 PRODUCT CARD STYLES
  card: {
    // Container styles
    container:
      "bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group",
    containerList:
      "bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group",

    // Image section
    image: {
      container: "aspect-square relative bg-gray-50 overflow-hidden",
      img: "object-cover transition-all duration-300 group-hover:scale-105",
      imgLoading: "opacity-0",
      imgLoaded: "opacity-100",
      placeholder: "w-full h-full flex items-center justify-center",
      placeholderIcon: "h-16 w-16 text-gray-300",
    },

    // Content section
    content: {
      container: "p-6",
      containerList: "flex-1 min-w-0",
      spacing: "space-y-3",
      spacingList: "space-y-4",
    },

    // Header elements
    header: {
      brandContainer: "flex items-center gap-2 mb-3",
      brand: "text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full",
      category: "text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full",
      title:
        "font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors",
      titleList:
        "font-semibold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2",
      model: "text-sm text-gray-600 mb-3",
    },

    // Description
    description: {
      text: "text-sm text-gray-600 mb-4 line-clamp-3",
      textList: "text-sm text-gray-600 mb-4 line-clamp-3 flex-grow",
    },

    // Services section
    services: {
      container: "mb-4 p-3 bg-gray-50 rounded-lg",
      title: "text-xs font-semibold text-gray-900 mb-2",
      list: "flex items-center gap-4 text-xs text-gray-700",
      item: "flex items-center gap-1",
      icon: "h-3 w-3 text-teal-600",
    },

    // Price section
    price: {
      container: "mb-4",
      amount: "text-xl font-bold text-gray-900",
      amountList: "text-lg font-bold text-gray-900",
      contact: "text-sm text-gray-600",
    },

    // Action buttons
    actions: {
      container: "flex gap-2",
      containerList: "flex items-center gap-3",
      primary: "flex-1",
      secondary: "",
    },

    // Status badges
    badges: {
      container:
        "absolute top-3 left-3 right-3 flex items-start justify-between",
      featured: "bg-yellow-500 text-white",
      inStock: "bg-green-500 text-white",
      outStock: "bg-orange-500 text-white",
      quote: "bg-blue-500 text-white",
    },

    // Overlay effects
    overlay: {
      container:
        "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100",
      actions: "flex items-center gap-2",
    },
  },

  // 🔍 SEARCH & FILTER STYLES
  search: {
    // Main container - mobile responsive
    container:
      "bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8",

    // Header section - mobile responsive
    header: {
      container:
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4",
      info: "flex items-center gap-3",
      title: "font-semibold text-gray-900 text-base sm:text-lg",
      subtitle: "text-sm text-gray-600 leading-tight",
      icon: "p-2 bg-blue-100 rounded-lg",
      iconSvg: "h-5 w-5 text-blue-900",
      stats: "flex items-center gap-2 sm:text-right",
      statsNumber: "text-xl sm:text-2xl font-bold text-blue-900",
      statsLabel: "text-xs text-gray-500",
    },

    // Active filters - MOBILE OPTIMIZED
    filters: {
      container: "mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg",

      // Desktop layout
      header: "hidden md:flex items-center justify-between",
      label: "flex items-center gap-2",
      labelIcon: "h-4 w-4 text-teal-600",
      labelText: "text-sm font-medium text-teal-900",
      list: "flex items-center gap-2 flex-wrap",
      badge:
        "inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full",
      removeButton: "hover:bg-teal-200 rounded-full p-0.5",
      removeIcon: "h-3 w-3",
      clearButton: "text-teal-600 border-teal-300 hover:bg-teal-50 h-7 px-2",

      // Mobile layout - NEW STYLES
      mobileContainer: "md:hidden",
      mobileHeader: "flex items-center justify-between mb-3",
      mobileTitle: "flex items-center gap-2",
      mobileTitleIcon: "h-4 w-4 text-teal-600",
      mobileTitleText: "text-sm font-medium text-teal-900",
      mobileClearButton: "text-teal-600 hover:text-teal-800 h-7 px-2 text-xs",

      // Mobile filter cards
      mobileFiltersGroup: "space-y-2",
      mobileFilterCard:
        "flex items-center justify-between bg-teal-100 rounded-lg p-2",
      mobileFilterContent: "flex items-center gap-2 min-w-0 flex-1",
      mobileFilterLabel: "text-xs font-medium text-teal-900 shrink-0",
      mobileFilterValue: "text-xs text-teal-800 truncate",
      mobileRemoveButton:
        "h-6 w-6 p-0 text-teal-600 hover:text-teal-800 hover:bg-teal-200 shrink-0 ml-2",
      mobileRemoveIcon: "h-3 w-3",
    },

    // Form elements - mobile responsive
    form: {
      container: "space-y-4",
      inputGroup: "relative",
      input:
        "w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base",
      inputIcon:
        "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400",
      selectGroup: "grid grid-cols-1 sm:grid-cols-2 gap-4",
      select:
        "w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer transition-colors text-sm sm:text-base",
      selectIcon:
        "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none",
      button:
        "w-full h-10 bg-gradient-to-r bg-blue-900 hover:bg-blue-950 text-white font-medium shadow-md hover:shadow-lg transition-all text-sm sm:text-base",
      buttonIcon: "h-4 w-4 mr-2",
    },
  },
  // 🛠️ TOOLBAR STYLES
  toolbar: {
    container:
      "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-lg",
    info: "text-sm text-gray-600",
    infoHighlight: "font-semibold",
    controls: "flex items-center gap-4",
    sortGroup: "flex items-center gap-2",
    sortLabel: "text-sm text-gray-600",
    sortSelect:
      "text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
    viewToggle:
      "flex items-center border border-gray-300 rounded-md overflow-hidden",
    viewButton: "p-2 text-sm",
    viewButtonActive: "bg-teal-50 text-teal-600",
    viewButtonInactive: "text-gray-600 hover:bg-gray-50",
  },

  // 📄 PAGINATION STYLES
  pagination: {
    container:
      "mt-12 flex flex-col sm:flex-row items-center justify-between gap-4",
    info: "text-sm text-gray-600",
    controls: "flex items-center gap-2",
    button:
      "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border",
    buttonActive: "bg-teal-600 text-white",
    buttonInactive: "border-gray-300 text-gray-700 hover:bg-gray-50",
    buttonDisabled: "border-gray-200 text-gray-400 cursor-not-allowed",
    pageNumbers: "hidden sm:flex items-center gap-1",
    ellipsis: "px-3 py-2 text-sm text-gray-500",
  },

  // 🎯 STATUS & BADGES
  status: {
    badge: "text-xs px-2 py-1 rounded-full font-medium",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    info: "bg-blue-100 text-blue-700",
    featured: "bg-yellow-100 text-yellow-700",
    inStock: "bg-green-500 text-white",
    outStock: "bg-orange-500 text-white",
  },

  // 🔧 UTILITY CLASSES
  utils: {
    // Text utilities
    textTruncate: "line-clamp-1",
    textTruncate2: "line-clamp-2",
    textTruncate3: "line-clamp-3",

    // Spacing
    spaceY2: "space-y-2",
    spaceY3: "space-y-3",
    spaceY4: "space-y-4",
    spaceY6: "space-y-6",

    // Flexbox
    flexCenter: "flex items-center justify-center",
    flexBetween: "flex items-center justify-between",
    flexStart: "flex items-center justify-start",

    // Transitions
    transition: "transition-all duration-300",
    transitionFast: "transition-all duration-200",
    transitionSlow: "transition-all duration-500",

    // Hover effects
    hoverScale: "hover:scale-105",
    hoverShadow: "hover:shadow-lg",
    hoverTranslate: "hover:-translate-y-1",
  },

  // 📱 RESPONSIVE BREAKPOINTS
  breakpoints: {
    mobile: "sm:hidden",
    tablet: "hidden sm:block lg:hidden",
    desktop: "hidden lg:block",
    mobileUp: "sm:block",
    tabletUp: "md:block",
    desktopUp: "lg:block",
  },

  // 🎨 THEME COLORS (Mederi Karya Indonesia Brand)
  colors: {
    primary: "text-teal-600",
    primaryBg: "bg-teal-600",
    primaryHover: "hover:text-teal-700",
    primaryBgHover: "hover:bg-teal-700",
    secondary: "text-blue-600",
    secondaryBg: "bg-blue-600",
    accent: "text-gray-600",
    accentBg: "bg-gray-600",
    success: "text-green-600",
    successBg: "bg-green-600",
    warning: "text-orange-600",
    warningBg: "bg-orange-600",
    error: "text-red-600",
    errorBg: "bg-red-600",
  },
} as const;

// 🎨 STYLE VARIANTS (for different component states)
export const styleVariants = {
  card: {
    default: productStyles.card.container,
    list: productStyles.card.containerList,
    featured: `${productStyles.card.container} ring-2 ring-teal-200 ring-offset-2`,
    loading: `${productStyles.card.container} animate-pulse`,
  },

  grid: {
    default: productStyles.grid.container,
    dense: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
    loose: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
    list: productStyles.grid.list,
  },

  button: {
    primary: "bg-teal-600 hover:bg-teal-700 text-white",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    outline: "border border-teal-600 text-teal-600 hover:bg-teal-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  },
} as const;

// 🔧 UTILITY FUNCTIONS
export const getGridClasses = (viewMode: "grid" | "list" = "grid") => {
  return viewMode === "grid"
    ? productStyles.grid.container
    : productStyles.grid.list;
};

export const getCardClasses = (
  viewMode: "grid" | "list" = "grid",
  featured = false
) => {
  const base =
    viewMode === "grid"
      ? productStyles.card.container
      : productStyles.card.containerList;
  return featured ? `${base} ring-2 ring-teal-200 ring-offset-2` : base;
};

export const getStatusClasses = (
  status: "inStock" | "outStock" | "featured"
) => {
  switch (status) {
    case "inStock":
      return `${productStyles.status.badge} ${productStyles.status.inStock}`;
    case "outStock":
      return `${productStyles.status.badge} ${productStyles.status.outStock}`;
    case "featured":
      return `${productStyles.status.badge} ${productStyles.status.featured}`;
    default:
      return productStyles.status.badge;
  }
};
