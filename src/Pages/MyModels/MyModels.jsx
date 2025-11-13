import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
import Loader from "../../components/Loader";
const MyModels = () => {
    const { user } = use(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch(`https://a-10-ai-model-server.vercel.app/my-models?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {

                setModels(data)
                setLoading(false)
            })

    }, [user])


    if (loading) {
        return <div> <Loader/></div>
    }

    return (
        <div>
             <div className="text-center text-5xl font-bold mt-5 border-b-2 border-b-blue-400 w-1/2 mb-11 mx-auto pb-5">My <span className="text-blue-800 font-black">Model</span> </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                {models.map(model => <ModelCard key={model._id} model={model} />)}
            </div>

        </div>
    );
};

export default MyModels;