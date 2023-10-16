import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";
import GoldProductCard from "./Card/GoldProductCard";

export default function GoldProduct() {
    const lstProduct = useContext(ThemeContextApi).product;

    if (!lstProduct) return null;
    return (
        <section className="pb-24 bg-white">
            <h2 className="uppercase text-center text-gold-primary py-16">Products</h2>
            <section className="bg-gold-primary ">
                {lstProduct.map((item, index: number) => (
                    <GoldProductCard key={index} desc={item.product_desc} title={item.product_name} companyID={parseInt(item.company_id)} image={item.product_image} price={parseInt(item.product_price)} isLeft={(index % 2 == 0)} />
                ))}
            </section>
        </section>
    )
}
