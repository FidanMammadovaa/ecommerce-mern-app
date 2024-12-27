import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Review from "../../../components/unknown/review";
import ProductForm from "../../../components/productForm";

export default function Product() {
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        console.log(data);
        setProduct(data);
        setMainImage(data.images[0]);

        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="pt-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Left: Image */}
          <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
            <img
              alt={product.name}
              src={mainImage}
              className="w-full object-cover sm:rounded-lg"
            />

            {/* Carousel */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className={`h-24 w-24 rounded-lg cursor-pointer object-cover ${
                    mainImage === image ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Details and Options */}
          <div className="mt-4 lg:mt-0">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <p className="text-3xl mt-2 text-gray-900">{product.price}</p>
            </div>

            <div className="mt-4">
              <Review />
            </div>

            <ProductForm
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            {/* Product Info at the Bottom */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-4 text-sm text-gray-600">
                {product.description}
              </p>

              <h3 className="text-sm font-medium text-gray-900 mt-6">Tags</h3>
              <ul
                role="list"
                className="list-disc pl-4 mt-4 text-sm text-gray-600"
              >
                {product.tags?.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
