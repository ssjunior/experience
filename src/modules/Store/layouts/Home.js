import { Column } from "tomato";

import { Banner } from "./Banner";
import { Header } from "./Header";

export const Home = ({ children }) => {
  return (
    <Column
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <Banner />
      {children}
    </Column>
  );
};
