import { useEffect, useState } from "react";

const useFetch = (url: string) : [any, boolean, boolean] => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

	const clearState = () => {
		setData(null);
		setIsLoading(false);
		setError(false);
	};
	  const testFunc = async() => {
		setIsLoading(true);
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					setError(true);
				}
				return res.json();
			})
			.then((data) => {
				setData(data);
                setIsLoading(false)
			})
			.catch(() => {
				setError(true);
			})
		clearState()
	  }

	useEffect(() => {
        testFunc()
	}, [url]);

	return [data, isLoading, error];
}
export default useFetch;