import { Link } from "react-router";

export default function ProductPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <Link to="/">
          <i className="fa-solid fa-arrow-left text-2xl mb-2"></i>
        </Link>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
          explicabo obcaecati corporis quibusdam ipsum commodi harum quos cumque
          laudantium! Quis doloribus deserunt laudantium temporibus dolorem,
          omnis esse. Expedita, repudiandae corrupti?
        </p>
      </div>
    </div>
  );
}
