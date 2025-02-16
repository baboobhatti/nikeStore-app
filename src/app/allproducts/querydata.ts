import Datatypes from "@/components/Datatypes";
import { client } from "@/sanity/lib/client";

        const allProducts = async ()=>{
        const query =  `*[_type == "product"]{ _type, _id, productName, category, price, inventory, colors,status, "imageUrl": image.asset._ref, description}`;       
        const productData:Datatypes[] = await client.fetch(query)
        return productData;
      };
      
      export default allProducts;
