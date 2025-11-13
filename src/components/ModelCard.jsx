import { Link } from "react-router-dom";

export const ModelCard = ({ model }) => {
  const { name, image, framework, useCase, dataset, purchased, description, _id, createdBy} = model
  // console.log(model);
  
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex justify-between">
          <div className="badge text-xs border border-blue-400 rounded-full">{framework}</div>
          <div className="badge text-xs border border-blue-400 rounded-full">Purchased: {purchased}</div>
        </div>
        <div className="flex justify-between">    
             <div className="badge text-xs border border-blue-400 rounded-full">{dataset}</div>
          </div>
          <div className="badge text-xs border border-blue-400 rounded-full">UseCase: {useCase}</div>    
        <div className="text-xs text-secondary">Created By: {createdBy}</div>
        <p className="line-clamp-1">
          {description}
        </p>
        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60">
            {/* <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views}
            </span> */}
            {/* <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </span> */}
          </div>
          <Link to={`/model-details/${_id}`} className="btn rounded-full bg-linear-to-r from-[#1f4cad] to-[#3072ffd0] hover:from-[#3072FF] hover:to-[#3072FF] text-white w-full btn-sm">View</Link>
        </div>
      </div>
    </div>
  );
};
