import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ACTIONS, Column, Flex, Grid, Image, Text } from "tomato";

export const Cart = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const products = useSelector((state) => state["store"].objs);
  const cart = useSelector((state) => state["store"].cart);

  const removeFromCart = (id) => {
    if (!cart[id]) return;

    const newCart = { ...cart };
    newCart[id] -= 1;
    if (newCart[id] === 0) delete newCart[id];
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(ACTIONS.store.changeState({ cart: newCart }));
  };

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

  let total = 0;
  Object.keys(cart).forEach((productId) => {
    console.log(productId);
    total += products[productId].price * cart[productId];
  });

  total = total.toFixed(2);

  return (
    <Column p="32px" bg="l2" sx={{ width: "100%", height: "100%" }}>
      <Text variant="title">{t("My Cart")}</Text>
      {Object.keys(cart).map((productId, index) => (
        <Grid
          key={index}
          bg="l0"
          gap="16px"
          mt="16px"
          p="8px 16px"
          sx={{
            mt: 3,
            borderRadius: "8px",
            alignItems: "center",
            width: "100%",
          }}
          columns="repeat(auto-fit, minmax(250px, 1fr));"
        >
          <Flex sx={{ alignItems: "center" }}>
            <div
              sx={{
                justifyContent: "center",
                height: "60px",
                minHeight: "60px",
                width: "60px",
                minWidth: "60px",
              }}
            >
              <Image
                sx={{
                  maxHeight: "60px",
                  maxWidth: "60px",
                }}
                src={products[productId].img}
              />
            </div>

            <Text
              sx={{
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              {products[productId].name}
            </Text>
          </Flex>

          <Flex sx={{ justifyContent: "flex-end", alignItems: "center" }}>
            <Text ml="4px" sx={{ fontSize: "16px" }}>
              {cart[productId]} x
            </Text>

            <Text ml="4px" sx={{ fontSize: "16px" }}>
              R$ {products[productId].price} =
            </Text>
            <Text ml="4px" sx={{ fontSize: "16px" }}>
              R$ {(cart[productId] * products[productId].price).toFixed(2)}
            </Text>
          </Flex>
        </Grid>
      ))}
      <Text ml="auto" mt="16px" variant="subtitle">
        Total: R$ {total}
      </Text>
    </Column>
  );
};
