import { useEffect, useState } from "react"

const useFetch=<T>(fetchFunction:()=>Promise<T>, autoFetch=true)=>{
    const [data,setData]= useState<T | null > (null);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState<Error | null>(null);

    const fetchData=async()=>{
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFunction();
            setData(response);
            if(response){
                setLoading(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error : new Error("An unknown error occurred"));
            setLoading(false);
        }
    }

    const reset =async()=>{
        await fetchData();
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[])

    return {data,loading,error,refetch:fetchData,reset}
}

export default useFetch;