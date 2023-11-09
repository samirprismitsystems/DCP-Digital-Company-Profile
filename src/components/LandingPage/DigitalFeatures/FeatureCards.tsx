import { lstFeatures } from "@/data/FeaturesCard";

interface IFeatureCardsProps {
  logoText: string;
}

export default function FeatureCards(props: IFeatureCardsProps) {
  return (
    <>
      {lstFeatures.map((item, index) => {
        if (item.iconPack === props.logoText) {
          return (
            
            <div
              style={{
                backgroundColor: "rgba(80, 196, 211, 0.102)",
              }}
              className="iconBox hover:cursor-pointer hover:border hover:border-primary-lightDark border border-transparent h-full py-4 rounded-lg  text-center relative"
              key={index}>
              {item.icon}
            </div>
          );
        }
      })}
    </>
  );
}
