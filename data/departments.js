import { itId, nursingId, opId, eitId, mitId, designId, foodId, chefId, PTId, PEId, SportsScienceId, hairdressingId, beautyId } from "./ids.js";

const departments = [
  {
    _id: itId,
    name: "Information Technology",
    institutions:[opId, eitId, mitId],
  },
  {
    _id: nursingId,
    name: "Nursing",
    institutions:[opId, mitId],
  },
  {
    _id: designId,
    name: "Design",
    institutions:[opId, mitId],
  },
  {
    _id: foodId,
    name: "Food",
    institutions:[opId, mitId],
  },
  {
    _id: chefId,
    name: "Chef",
    institutions:[opId, mitId],
  },
  {
    _id: PTId,
    name: "PT",
    institutions:[opId, mitId],
  },
  {
    _id: PEId,
    name: "PE",
    institutions:[opId, mitId],
  },
  {
    _id: SportsScienceId,
    name: "SportsScience",
    institutions:[opId, mitId],
  },
  {
    _id: hairdressingId,
    name: "Hairdressing",
    institutions:[opId, mitId],
  },
  {
    _id: beautyId,
    name: "beauty",
    institutions:[opId, mitId],
  },
];

export { departments };
