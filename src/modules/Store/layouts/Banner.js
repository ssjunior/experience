import { Column, Flex, Image, Text, useBreakpoint } from "tomato";

export const Banner = ({ children }) => {
  const index = useBreakpoint();

  return (
    <Flex
      bg="brown"
      sx={{ width: "100%", flexWrap: "wrap", alignItems: "center" }}
    >
      <Column p="2rem" sx={{ width: index ? "40%" : "100%" }}>
        <Text
          sx={{
            fontSize: "48px",
            lineHeight: 1,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          The Wine Experience
        </Text>
        <Text
          mt="1rem"
          sx={{
            fontSize: "16px",
            lineHeight: 1,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          A melhor seleção de vinhos
        </Text>
      </Column>

      {index > 0 && (
        <Column
          bg="blue"
          sx={{
            maxWidth: index ? "60%" : "100%",
          }}
        >
          <Image src="https://img.wine.com.br/revista-digital/cms/saldao_100122_destaque_desktop_5e443a8165.png" />
        </Column>
      )}
    </Flex>
  );
};
