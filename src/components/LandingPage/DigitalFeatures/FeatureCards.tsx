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
            <div key={index} className="font-normal">
              {item.icon}
            </div>
          );
        }
      })}
    </>
  );
}
