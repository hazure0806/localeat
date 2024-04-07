import React from "react";
import { Box, Container, Stack, Text, Link, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.100" color="gray.600" mt={4}>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
        fontSize={16}
        mt={4}
      >
        <Flex>
          <Link href="/contact" mr={4}>
            お問い合わせ
          </Link>{" "}
          {/* 右側のマージンを適用 */}
          <Link href="/faq">FAQ</Link>
        </Flex>
      </Container>
      <Box textAlign="center" py={4}>
        <Text>© 2024 LocalEat. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Footer;
