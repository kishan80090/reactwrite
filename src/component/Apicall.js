import React, { useState } from "react";
import axios from "axios";
function Apicall() {
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
        const Show = () => {        
            const baseURL=`https://kishan80090.github.io/html/Call.json`;
                axios.get(baseURL).then((response) => {                    
                        setImage(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching weather:", error);
                        setError("API Call Field.");
                    });
            };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Image Data</h2>
            <button onClick={Show}>Click Here</button>
            {image && (
                <pre>
                {JSON.stringify(image,null,2)}
                </pre>
            )}   
        </div>
    );
}
export default Apicall;