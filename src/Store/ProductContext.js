import { createContext } from "react";

const ProductContext = createContext(null);

export default function Product ({children}){
    return (
        <ProductContext.Provider value={10}>
            {children}
        </ProductContext.Provider>
    )
}