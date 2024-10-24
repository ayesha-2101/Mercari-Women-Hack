import React from 'react';
import product1 from '../../assets/product1.jpg';
import product2 from '../../assets/product2.jpg';
import product3 from '../../assets/product3.webp';
import product4 from '../../assets/product4.jpeg';
import prod5 from '../../assets/product5.webp';

const products = [
  {
    id: 1,
    name: 'Dark Shade Foundation',
    description: 'A rich, creamy foundation available in a variety of dark shades.',
    imageUrl: product2,
    price: '$25.00',
  },
  {
    id: 2,
    name: 'Plus Size Dress',
    description: 'Comfortable and stylish dress designed to fit and flatter all body types.',
    imageUrl: product1,
    price: '$45.00',
  },
  {
    id: 3,
    name: 'Inclusive Activewear',
    description: 'High-quality, breathable activewear available in extended sizes for all your fitness needs. Always Good.',
    imageUrl: product3,
    price: '$40.00',
  },
  {
    id: 4,
    name: 'Curvy Fit Jeans',
    description: 'Stylish jeans tailored for curvy figures, offering comfort and style in one. Flaunt your curves like a pro and feel great',
    imageUrl: product4,
    price: '$60.00',
  },
  {
    id: 5,
    name: 'Body Positive T-Shirt',
    description: 'Soft, comfortable T-shirt with empowering messages promoting body positivity. Everyone is beautiful. Wear oversized and sassy shirts.',
    imageUrl: prod5,
    price: '$20.00',
  },
];

const ProductCard = ({ product }) => (
  <div className="flex flex-col bg-white rounded-lg shadow-md p-4 m-2 w-60">
    <div className="overflow-hidden rounded-md mb-2">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
    </div>
    <h2 className="text-lg font-semibold">{product.name}</h2>
    <p className="text-gray-600 mb-2">{product.description}</p>
    <span className="text-xl font-bold mb-2">{product.price}</span>
    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
      Buy Now
    </button>
  </div>
);

const Product = () => (
  <div className="max-w-full mx-auto p-6 mt-20">
    <h3 className="text-xl font-bold text-center text-black mb-2">
        Just for you
      </h3>
      <h1 className="text-5xl font-bold text-center mb-8">
      <span className="text-black">Feel Good, Look Great – Just as </span>
      <span className="text-red-500">You</span>
      <span className="text-black"> Are</span>
    </h1>

    {/* Product Cards */}
    <div className="flex justify-center items-center flex-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default Product;


