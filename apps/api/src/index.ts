/**
 * Batter Bites API - Cloudflare Worker
 *
 * Available endpoints:
 * - GET /catalog: Returns full product catalog, fee structure, and policies
 * - GET /product/:id: Returns a single product by ID
 */

export interface ProductVariant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Breakfast" | "Specialty" | "Accompaniments";
  unit?: string;
  minOrder?: string;
  ingredients?: string[];
  variants?: ProductVariant[];
  imageUrl?: string;
}

export interface CatalogFees {
  delivery: number;
  cancellation: number;
  currency: string;
}

export interface CatalogPolicies {
  minBatterOrder: string;
}

export interface CatalogResponse {
  items: Product[];
  fees: CatalogFees;
  policies: CatalogPolicies;
}

export const fees: CatalogFees = {
  delivery: 1.00,
  cancellation: 1.00,
  currency: "EUR"
};

export const policies: CatalogPolicies = {
  minBatterOrder: "1 kg"
};

export const productCatalog: Product[] = [
  {
    id: "p001",
    name: "Idly/Dosa Batter",
    description: "Classic fermented batter made with rice and urad dal. Perfect for making fluffy idlies and golden dosas.",
    price: 5.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Breakfast",
    imageUrl: "https://example.com/images/classic-pancakes.jpg"
  },
  {
    id: "p002",
    name: "Crispy Dosa Batter",
    description: "Special recipe crafted for ultra-crispy, restaurant-style golden dosas. Perfect for dosa enthusiasts!",
    price: 6.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Breakfast",
    imageUrl: "https://example.com/images/blueberry-waffles.jpg"
  },
  {
    id: "p003",
    name: "Adai Dosa Batter",
    description: "Hearty, protein-packed batter made from a traditional blend of wholesome dals and rice.",
    price: 8.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Specialty",
    ingredients: [
      "Toor Dal",
      "Chana Dal",
      "Urad Dal",
      "Rice"
    ],
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  },
  {
    id: "p004",
    name: "Pesarattu Dosa Batter",
    description: "Nutritious and flavor-rich batter made from green moong dal. Healthy, authentic Andhra-style specialty.",
    price: 8.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Specialty",
    ingredients: [
      "Whole Green Moong Dal",
      "Ginger",
      "Green Chilies",
      "Cumin"
    ],
    imageUrl: "https://example.com/images/banana-bread-french-toast.jpg"
  },
  {
    id: "p005",
    name: "Millet Batter",
    description: "Nutrient-dense multi-millet blend. Packed with fiber and earthy flavors for healthy everyday breakfast.",
    price: 9.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Breakfast",
    ingredients: [
      "Pearl Millet (Bajra)",
      "Sorghum (Jowar)",
      "Foxtail Millet",
      "Urad Dal"
    ],
    imageUrl: "https://example.com/images/chocolate-chip-pancakes.jpg"
  },
  {
    id: "p006",
    name: "Banana Waffle / Pancake Batter",
    description: "Sweet and fluffy ready-to-pour banana batter. Ideal for quick weekend waffles and pancakes.",
    price: 8.50,
    unit: "kg",
    minOrder: "1 kg",
    category: "Specialty",
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  },
  {
    id: "p007",
    name: "Paniyaram Batter",
    description: "Versatile fermented batter for crispy outside, soft inside paniyarams (kuzhi paniyaram). Great spicy or sweet.",
    price: 6.00,
    unit: "kg",
    minOrder: "1 kg",
    category: "Specialty",
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  },
  {
    id: "p008",
    name: "Gunpowder Chutney Podi",
    description: "Handcrafted authentic South Indian gunpowder recipe. A fragrant, spicy blend of roasted lentils and spices for dosas and idlies.",
    price: 2.50,
    category: "Accompaniments",
    variants: [
      { weight: "100g", price: 2.50 },
      { weight: "200g", price: 4.00 }
    ],
    ingredients: [
      "Roasted Chana Dal",
      "Urad Dal",
      "Dry Red Chilies",
      "Curry Leaves",
      "Sesame Seeds",
      "Asafoetida (Hing)",
      "Salt"
    ],
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  }
];

/**
 * Handler for the /catalog endpoint
 */
async function handleCatalogRequest(_request: Request): Promise<Response> {
  const catalogResponse: CatalogResponse = {
    items: productCatalog,
    fees,
    policies
  };

  return new Response(JSON.stringify(catalogResponse), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=3600"
    },
    status: 200
  });
}

/**
 * Handler for the /product/:id endpoint
 */
async function handleProductRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const productId = pathParts[2]; // /product/{id}

  if (!productId) {
    return new Response("Product ID is required", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  const product = productCatalog.find(p => p.id === productId);

  if (!product) {
    return new Response("Product not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  return new Response(JSON.stringify(product), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=3600"
    },
    status: 200
  });
}

export default {
  async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (request.method === "GET") {
        if (path === "/catalog") {
          return handleCatalogRequest(request);
        } else if (path.startsWith("/product/")) {
          return handleProductRequest(request);
        }
      }

      return new Response("Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response("Internal Server Error", {
        status: 500,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
  },
} satisfies ExportedHandler<Env>;
