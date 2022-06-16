import { itId, nursingId, opId, eitId, mitId } from "./ids.js";

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
];

export { departments };
