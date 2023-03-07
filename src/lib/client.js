import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "ev3x6i09",
  dataset: "production",
  useCdn: true,
  token:
    "skKN44J2hKF9R5Nje18syDML1jjHtfRcNuO1yRq8VMVkyTQcqI01TXOpdh9awSggOLoe0uieGFcpJWhdJTI4fN1DWG8o1rswRBBbEL5c1A3xCX6EsKJ02pbiigJE0WuyWCkXdGOD4RdmDFSokaBdjE5RrIV9W6lheRyZPtfu2NfdED442nc5",
});

export async function fetchProducts() {
  const query = `*[_type == 'product']`;
  const products = await client.fetch(query);
  return products;
}

export async function fetchCategories() {
  const query = `*[_type == 'categories']`;
  const categories = await client.fetch(query);
  return categories;
}

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
