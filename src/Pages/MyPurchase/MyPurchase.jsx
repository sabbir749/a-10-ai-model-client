import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
import PurchaseCard from "../../components/PurchaseCard";

const MyPurchase = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-purchase?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div> Please wait ... Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        {models.map((model) => (
          <PurchaseCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyPurchase;
