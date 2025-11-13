import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const UpdateModel = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.accessToken) return; // wait for user

    fetch(`https://a-10-ai-model-server.vercel.app/models/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (!data.result) {
          toast.error("You are not authorized to update this model.");
          navigate("/all-models");
          return;
        }
        setModel(data.result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch model.");
        navigate("/all-models");
      });
  }, [user, id, navigate]);

  const isCreator = user?.email === model?.createdBy;

  const handleSubmit = e => {
    e.preventDefault();
    if (!isCreator) return toast.error("You are not allowed to update this model.");

    const formData = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.thumbnail.value,
      createdBy: user.email,
      created_at: new Date(),
      purchased: model.purchased || 0,
    };

    fetch(`https://a-10-ai-model-server.vercel.app/models/${model._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        toast.success("Model updated successfully!");
        navigate(`/model-details/${model._id}`);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update model. Check authorization.");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={model.name}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          <div>
            <label className="label font-medium">Framework</label>
            <input
              type="text"
              name="framework"
              defaultValue={model.framework}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          <div>
            <label className="label font-medium">Use Case</label>
            <input
              type="text"
              name="useCase"
              defaultValue={model.useCase}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          <div>
            <label className="label font-medium">Dataset</label>
            <input
              type="text"
              name="dataset"
              defaultValue={model.dataset}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={model.description}
              required
              rows={5}
              className="textarea w-full rounded-2xl focus:outline-gray-200"
            ></textarea>
          </div>

          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={model.image}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
            disabled={!isCreator}
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
