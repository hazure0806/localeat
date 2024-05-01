import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Image, Text, Flex, Select, Button } from "@chakra-ui/react";
// 県名のリストとコードの型定義
import { Prefectures } from "../context/Prefecture"; // 県名のインポート

// 郷土料理の情報を持つオブジェクトの型定義
interface FoodItem {
  name: string;
  image: string;
  description: string;
}

interface FoodSlideProps {
  items: FoodItem[];
  onSearch: (prefectureName: string) => void; // 検索アクションを実行する関数
}

export const FoodSlide: React.FC<FoodSlideProps> = ({ items, onSearch }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState(
    Prefectures[0].name
  ); // 初期選択値を県名の名前に設定

  return (
    <Box width="full" p={4}>
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign={"center"}>
          県名から郷土料理を探す
        </Text>
        <Flex justify="center" mb={4}>
          <Select
            value={selectedPrefecture} // `value`が正しい型か確認
            onChange={(e) => setSelectedPrefecture(e.target.value)} // セレクトボックスの変更イベント
            width="200px"
          >
            {Prefectures.map((prefecture, index) => (
              <option key={index} value={prefecture.name}>
                {" "}
                {/* 県名の名前を使用 */}
                {prefecture.name}
              </option>
            ))}
          </Select>
          {/* 検索ボタン */}
          <Button
            ml={4}
            colorScheme="teal"
            onClick={() => onSearch(selectedPrefecture)} // 検索アクションの実行
          >
            検索
          </Button>
        </Flex>
      </Box>

      <Swiper slidesPerView={2} spaceBetween={30}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={item.image} alt={item.name} />
              <Box p="6">
                <Text fontWeight="bold" fontSize="xl" mb="2">
                  {item.name}
                </Text>
                <Text fontSize="sm">{item.description}</Text>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
