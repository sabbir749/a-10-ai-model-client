import { use, useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";




const ModelDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://a-10-ai-model-server.vercel.app/models/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.success && data.result) {
          setModel(data.result);
        } else {
          setModel(null); // explicitly set null if not found
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setModel(null);
        setLoading(false);
      });
  }, [user, id, refetch]);


  const handleDelete = () => {
    if (user?.email !== model.createdBy) return; // extra safety
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://a-10-ai-model-server.vercel.app/models/${model._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/all-models");
            Swal.fire({
              title: "Deleted!",
              text: "Your model has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDownload = () => {
    const finalModel = {
      name: model.name,
      framework: model.framework,
      useCase: model.useCase,
      dataset: model.dataset,
      description: model.description,
      image: model.image,
      createdBy: model.createdBy,
      purchasedBy: user.email,
      createdAt: new Date(),
      purchased: model.purchased,
    };

    fetch(`https://a-10-ai-model-server.vercel.app/downloads/${model._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...finalModel, downloadedBy: user.email }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Successfully Purchased!");
        setRefetch(!refetch);
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <div><Loader /></div>;
  if (!model) return <div>Model not found!</div>; // now it works

  const isCreator = user?.email === model.createdBy; // check if logged-in user is creator

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={model.image}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {model.name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {model.framework}
              </div>
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Purchased: {model.purchased}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {model.dataset}
              </div>
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Use Case: {model.useCase}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {model.description}
            </p>

            <div className="flex gap-3 mt-6">
              {/* Update Button */}
              <Link
                to={isCreator ? `/update-model/${model._id}` : "#"}
                className={`btn btn-primary rounded-full text-white border-0 ${isCreator
                  ? "bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
                onClick={(e) => !isCreator && e.preventDefault()}
              >
                Update Model
              </Link>

              {/* Purchase Button */}
              <button
                onClick={handleDownload}
                className="btn btn-secondary rounded-full"
              >
                Purchase
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                disabled={!isCreator}
                className={`btn btn-outline rounded-full border-gray-300 ${isCreator
                  ? "hover:border-pink-500 hover:text-pink-600"
                  : "text-gray-400 border-gray-300 cursor-not-allowed"
                  }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
