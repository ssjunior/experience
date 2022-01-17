import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Flex, Icon, Text } from "tomato";

export const Header = ({ children }) => {
  const cart = useSelector((state) => state["store"].cart);

  return (
    <Flex
      p="16px"
      sx={{
        width: "100%",
        minHeight: "48px",
        maxHeight: "48px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link style={{ textDecoration: "none" }} to="/">
        <Text sx={{ fontWeight: "bold" }} color="t2">
          The Wine Experience
        </Text>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/cart">
        <Flex alignItems="center">
          <Icon.Cart />
          <Text
            bg="l3"
            ml="4px"
            sx={{
              fontSize: "13px",
              padding: "2px",
              lineHeight: 1,
              borderRadius: "50%",
            }}
          >
            {Object.keys(cart).length}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
