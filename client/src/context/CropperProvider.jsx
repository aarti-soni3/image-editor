import { CropperContext } from "./createContext";

export const CropperProvider = ({ children }) => {





  return (
  <CropperContext.Provider value={{}}>
    {children}
    </CropperContext.Provider>
    );
};
