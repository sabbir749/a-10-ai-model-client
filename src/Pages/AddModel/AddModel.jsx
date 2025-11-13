import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

const AddModal = () => {

  const { user } = use(AuthContext)
  const Navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.thumbnail.value,
      createdBy: user.email,
      created_at: new Date(),
      purchased: 5,
    }

    //     "name": "T5 Transformer",
    // "framework": "TensorFlow",
    // "useCase": "Text-to-Text",
    // "dataset": "C4",
    // "description": "Text-to-text transfer transformer designed to convert any NLP task into a unified text generation format.",
    // "image": "https://i.ibb.co/m5wj8vY/t5-transformer.png",
    // "createdBy": "nlpinnovator@example.com",
    // "createdAt": "2025-11-05T17:50:00.000Z",
    // "purchased": 19

    fetch('https://a-10-ai-model-server.vercel.app/models', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Successfully added!")
        Navigate('/all-models')
        // console.log(data)
      })
      .catch(err => {
        console.log(err)
      })


  }


  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
     
     <div className="text-center text-5xl font-bold border-b-2 border-b-blue-400 mb-4 mx-auto pb-5">Add <span className="text-blue-800 font-black">Model</span> </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Framework</label>
            <select
              defaultValue={""}
              name="framework"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Framework
              </option>
              <option value="Pytorch">PyTorch</option>
              <option value="TensorFlow">TensorFlow</option>

            </select>
          </div>

          <div>
            <label className="label font-medium">Use Case</label>
            <input
              type="text"
              name="useCase"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Use Case"
            />
          </div>
          <div>
            <label className="label font-medium">Dataset</label>
            <input
              type="text"
              name="dataset"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Dataset"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-[#2454b9] to-[#3575ffa9] hover:from-pink-600 hover:to-red-700"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
