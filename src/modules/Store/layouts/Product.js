import { Column } from "tomato";

import { Header } from "./Header";

export const Product = ({ children }) => {
  return (
    <Column sx={{ width: "100%", height: "100%" }}>
      <Header />
      {children}
    </Column>
  );
};
