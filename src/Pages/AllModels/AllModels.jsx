// File: AllModels.jsx
import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { useState, } from "react";

const AllModels = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data); // Displayed models
  const [loading, setLoading] = useState(false);
  const [frameworkFilter, setFrameworkFilter] = useState(""); // Filter state

  // Filter models based on framework
  const filteredModels = frameworkFilter
    ? models.filter((model) => model.framework === frameworkFilter)
    : models;

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    setLoading(true);

    fetch(`https://a-10-ai-model-server.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="text-2xl text-center font-bold">All Models</div>
      <p className="text-center">Explore AI models.</p>


      <div className="flex justify-evenly gap-10 items-center my-10">

        {/* Framework Filter Dropdown (Separate Div) */}
        <div className="flex justify-center">

          <select
            onChange={(e) => setFrameworkFilter(e.target.value)}
            defaultValue="Pick a Framework"
            className="select select-info">
            <option value="">All Frameworks</option>
            <option value="TensorFlow">TensorFlow</option>
            <option value="PyTorch">PyTorch</option>
          </select>

        </div>
        <form
          onSubmit={handleSearch}
          className="mt-5 mb-5 flex gap-2 justify-center items-center"
        >
          <label className="input rounded-full flex items-center gap-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input name="search" type="search" placeholder="Search" />
          </label>
          <button className="btn btn-primary rounded-full">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredModels.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AllModels;
