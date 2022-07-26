import { useEffect, useState } from "react";
import {GET} from '../constants/FetchDataMethods'
const useFetch = (url: string, method: string = GET, props: any = null) : [any, boolean, boolean] => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

	const clearState = () => {
		setData(null);
		setIsLoading(false);
		setError(false);
	};
	  const testFunc = async() => {
		setIsLoading(true);
		if(method !== GET && props !== null){
			await fetch(url, {
				method: method,
				body: JSON.stringify(props)
			})
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
		} else{
			await fetch(url)
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
		}
	  }

	useEffect(() => {
        testFunc()
		clearState()
	}, [url]);

	return [data, isLoading, error];
}
export default useFetch;

