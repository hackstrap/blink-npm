import { initData as initTykeTable } from "./TykeTechnologies/productTableConfig";
import { initData as initEmamarlyTable } from "./Examarly/productTableConfig";

export const initializeProductTable = (startupId, currentYear) => {
  switch (startupId) {
    case "Tyke Technologies Private Limited": {
      return {
        startup_id: startupId,
        year: parseInt(currentYear),
        ...initTykeTable,
      };
    }
    case "Tyke Technologies Private Limited": {
      return {
        startup_id: startupId,
        year: parseInt(currentYear),
        ...initEmamarlyTable,
      };
    }
    default: {
      return null;
    }
  }
};
