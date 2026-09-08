import { FaFileAlt } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";

const FEATURES = [
  {
    icon: FaFileAlt,
    boldText: "Key ideas in few min",
    restText: " with many books to read",
  },
  {
    icon: RiLeafLine,
    boldText: "3 million",
    restText: " people growing with Summarist everyday",
  },
  {
    icon: FaHandshake,
    boldText: "Precise recommendations",
    restText: " collections curated by experts",
  },
];

export default function PlanFeatures() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-12">
      {FEATURES.map(({ icon: Icon, boldText, restText }) => (
        <div
          key={boldText}
          className="flex flex-col items-center text-center max-w-[90%] md:max-w-[240px]"
        >
          <Icon size={50} className="text-brand-navy mb-3" />
          <p className="text-md text-[#394547]">
            <span className="font-bold">{boldText}</span>
            {restText}
          </p>
        </div>
      ))}
    </div>
  );
}
