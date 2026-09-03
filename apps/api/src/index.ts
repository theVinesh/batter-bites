/**
 * Batter Bites API - Cloudflare Worker
 *
 * This worker implements API endpoints for the Batter Bites application.
 *
 * Available endpoints:
 * - GET /catalog: Returns a product catalog with sample items
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 */

/**
 * Product interface defining the structure of catalog items
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface CatalogResponse {
  items: Product[];
}


/**
 * Sample product catalog data
 */
const productCatalog: Product[] = [
  {
    id: "p001",
    name: "Idly/Dosa Batter",
    description: "Classic batter made with rice and urid dal. Perfect for making fluffy idlies and tasty dosas.",
    price: 5.00,
    category: "Breakfast",
    imageUrl: "https://example.com/images/classic-pancakes.jpg"
  },
  {
    id: "p002",
    name: "Crispy Dosa Batter",
    description: "Level up your dosa game with the special crispy dosa batter. Perfect for the dosa purists!",
    price: 6.00,
    category: "Breakfast",
    imageUrl: "https://example.com/images/blueberry-waffles.jpg"
  },
  {
    id: "p003",
    name: "Millet Dosa Batter",
    description: "Packed with the goodness of millets. Healthy, yet delicious.",
    price: 9.00,
    category: "Breakfast",
    imageUrl: "https://example.com/images/chocolate-chip-pancakes.jpg"
  },
  {
    id: "p004",
    name: "Pesarattu Dosa Batter",
    description: "Bring in some variety and the goodness of green lentils. Healthy, Tastey and fun!",
    price: 8.00,
    category: "Specialty",
    imageUrl: "https://example.com/images/banana-bread-french-toast.jpg"
  },
  {
    id: "p005",
    name: "Adai Dosa Batter",
    description: "Children and Adults go wild when it's Adai for breakfast. Packed with protien rich channa dal. It checks all the boxes!",
    price: 8.00,
    category: "Specialty",
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  },
  {
    id: "p006",
    name: "Paniyaram Batter",
    description: "Make it spicy or make it sweet. Perfect for a quick snack.",
    price: 8.00,
    category: "Specialty",
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  },
  {
    id: "p007",
    name: "Pancake/Waffle Batter",
    description: "Delicious banana pancakes! Awesome with maple syrup or on it's own. When you have to satisfy that sweet-tooth.",
    price: 8.00,
    category: "Specialty",
    imageUrl: "https://example.com/images/savory-crepes.jpg"
  }
];

/**
 * Handler for the /catalog endpoint
 * Returns the product catalog as JSON
 */
async function handleCatalogRequest(_request: Request): Promise<Response> {
  // Return the product catalog with appropriate headers
  const catalogResponse: CatalogResponse = {
    items: productCatalog
  };

  return new Response(JSON.stringify(catalogResponse), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // CORS header for cross-origin requests
      "Cache-Control": "max-age=3600" // Cache response for 1 hour
    },
    status: 200
  });
}

/**
 * Handler for the /product/:id endpoint
 * Returns a single product by ID
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

  // Find the product by ID
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
      // Parse the URL to get the pathname
      const url = new URL(request.url);
      const path = url.pathname;

      // Simple router based on the request path and method
      if (request.method === "GET") {
        if (path === "/catalog") {
          return handleCatalogRequest(request);
        } else if (path.startsWith("/product/")) {
          return handleProductRequest(request);
        }
      }

      // If no route matches, return a 404 Not Found response
      return new Response("Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    } catch (error) {
      // Log the error (in a production environment, you might want to use a proper logging service)
      console.error("Error processing request:", error);

      // Return a 500 Internal Server Error response
      return new Response("Internal Server Error", {
        status: 500,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
  },
} satisfies ExportedHandler<Env>;
