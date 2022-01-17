import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ACTIONS, Button, Card, Column, Flex, Grid, Image, Text } from "tomato";

export const Products = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const products = useSelector((state) => state["store"].objs);
  const cart = useSelector((state) => state["store"].cart);

  const addToCart = (id) => {
    const newCart = { ...cart };
    if (!newCart[id]) {
      newCart[id] = 1;
    } else {
      newCart[id] += 1;
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(ACTIONS.store.changeState({ cart: newCart }));
    navigate(`/product/${id}`, { replace: true });
  };

  return (
    <Grid
      mx="auto"
      sx={{
        width: "100%",
        maxWidth: "1024px",
        padding: "32px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr));",
      }}
      gap="16px 32px"
    >
      {Object.values(products).map((product, index) => (
        <Column key={product.id}>
          <Card
            justifyContent="space-between"
            sx={{
              width: "100%",
              height: "300px",
              justifyContent: "space-between",
            }}
          >
            <Image
              src={product.img}
              mx="auto"
              sx={{ maxWidth: "180px", width: "100px" }}
            />
            <Link
              key={product.id}
              style={{
                textDecoration: "none",
                fontWeight: "semibold",
                fontSize: "14px",
                textAlign: "center",
              }}
              to={`/product/${product.id}`}
            >
              <Text>{product.name}</Text>
            </Link>

            <Flex mx="auto" sx={{ alignItems: "baseline" }}>
              <Text ml="auto" sx={{ fontWeight: "semibold", fontSize: "13px" }}>
                apenas
              </Text>
              <Text
                ml="4px"
                color="red"
                sx={{ fontWeight: "bold", fontSize: "18px" }}
              >
                R$ {product.price}
              </Text>
            </Flex>
          </Card>

          <Button
            my="16px"
            sx={{ cursor: "pointer", width: "100%" }}
            color="#ffffff"
            onClick={() => {
              addToCart(product.id);
            }}
            variant="disabled"
          >
            {t("Add")}
          </Button>
        </Column>
      ))}
    </Grid>
  );
};
