import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router';

const PurchasedDetails = () => {


  const { id } = useParams();
  const [model, setModel] = useState({});
  //   const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);

  // console.log(model);


  useEffect(() => {

    fetch(`https://a-10-ai-model-server.vercel.app/downloads/${id}`, {
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
        //   setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setModel(null);
        //   setLoading(false);
      });
  }, [user, id]);

  return (
    <div>
      {/* {model} */}
    </div>
  );
};

export default PurchasedDetails;