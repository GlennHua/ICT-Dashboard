import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(url);
            setData(response.data);
        }
        fetchData();
    }, [url]);

    return { data };
}