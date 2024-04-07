import React from "react";
import { Container, Text, Flex, Box } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface PrefectureContainerProps {
  prefectureName: string;
  phrase: string;
  prefectureImage: string;
}

export const PrefectureContainer: React.FC<PrefectureContainerProps> = ({
  prefectureName,
  phrase,
  prefectureImage,
}) => {
  return (
    <Container
      maxW="full"
      p={4}
      backgroundImage={`url(${prefectureImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      height={56}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 0, // オーバーレイを背面に
      }}
    >
      {/* Flex コンテナを追加して、内容を左下に配置します */}
      <Flex
        height="100%"
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        p={4}
        position="relative"
        zIndex="1" // テキストを前面に
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          p={2}
          borderRadius="md"
          color={"ivory"}
          fontFamily={"serif"}
          display="flex"
          alignItems="center"
        >
          <Box as={FaMapMarkerAlt} color="ivory" mr={2} size={16} />
          {prefectureName}
        </Text>

        <Text
          mt={2}
          p={2}
          borderRadius="md"
          color={"ivory"}
          fontFamily={"serif"}
          fontWeight="bold"
        >
          {phrase}
        </Text>
      </Flex>
    </Container>
  );
};
