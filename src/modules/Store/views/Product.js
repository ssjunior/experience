import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  ACTIONS,
  Button,
  Card,
  Column,
  Flex,
  Image,
  Spinner,
  Text,
  useRouteMatch,
} from "tomato";

export const Product = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const products = useSelector((state) => state["store"].objs);
  const cart = useSelector((state) => state["store"].cart);

  const [product, setProduct] = useState();

  const match = useRouteMatch("/product/:id");
  const id = match ? match.params.id : null;

  useEffect(() => {
    if (!id) return;
    document.title = products[id].name;
    setProduct(products[id]);
    return () => {
      setProduct();
      document.title = "The Wine Store";
    };
  }, [id, products, setProduct]);

  const addToCart = () => {
    const newCart = { ...cart };
    if (!newCart[product.id]) {
      newCart[product.id] = 1;
    } else {
      newCart[product.id] += 1;
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(ACTIONS.store.changeState({ cart: newCart }));
  };

  const removeFromCart = () => {
    if (!cart[product.id]) return;

    const newCart = { ...cart };
    newCart[product.id] -= 1;
    if (newCart[product.id] === 0) delete newCart[product.id];
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(ACTIONS.store.changeState({ cart: newCart }));
  };

  if (!product) return <Spinner />;

  const inCart = cart[id] && cart[id] > 0;

  return (
    <Flex bg="l2" sx={{ width: "100%", height: "100%" }}>
      <Link to="/">Voltar</Link>
      <Card bg="l0" m="32px" sx={{ height: "fit-content" }}>
        <Flex>
          <Column sx={{ width: "20%" }}>
            <Image src={product.img} />
          </Column>

          <Column key={product.id} mx="32px" sx={{ width: "55%" }}>
            <Text
              mt="16px"
              sx={{
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {product.name}
            </Text>
            <Text
              mt="16px"
              sx={{
                fontSize: "18px",
              }}
            >
              {product.description}
            </Text>
          </Column>

          <Column sx={{ width: "25%" }}>
            <Text
              ml="4px"
              color="green"
              sx={{ fontWeight: "bold", fontSize: "36px" }}
            >
              R$ {product.price}
            </Text>

            {inCart ? (
              <Flex
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  borderRadius: "8px",
                  border: "1px solid grey",
                }}
              >
                <Text
                  sx={{
                    cursor: "pointer",
                    width: "33%",
                    borderRight: "1px solid grey",
                  }}
                  onClick={removeFromCart}
                >
                  -
                </Text>
                <Text py="8px">{cart[product.id]}</Text>
                <Text
                  sx={{
                    cursor: "pointer",
                    borderLeft: "1px solid grey",
                    width: "33%",
                  }}
                  onClick={addToCart}
                >
                  +
                </Text>
              </Flex>
            ) : (
              <Button
                mt="16px"
                sx={{ cursor: "pointer", width: "100%" }}
                color="#ffffff"
                onClick={() => {
                  addToCart(product.id);
                }}
                variant="disabled"
              >
                {t("Add")}
              </Button>
            )}

            <Link to="/cart">
              <Button
                mt="16px"
                sx={{ cursor: "pointer", width: "100%" }}
                color="#ffffff"
                onClick={() => {
                  addToCart(product.id);
                }}
                variant="disabled"
              >
                {t("Checkout")}
              </Button>
            </Link>
          </Column>
        </Flex>
      </Card>
    </Flex>
  );
};
