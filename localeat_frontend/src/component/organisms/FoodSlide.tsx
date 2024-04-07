import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// SwiperのCSSをインポート
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Image, Text } from '@chakra-ui/react';

// 郷土料理の情報を持つオブジェクトの配列の型定義
interface FoodItem {
  name: string;
  image: string;
  description: string;
}

interface FoodSlideProps {
  items: FoodItem[];
}

export const FoodSlide: React.FC<FoodSlideProps> = ({ items }) => {
  return (
    <Box width="full" p={4}>
      <Swiper
        slidesPerView={1} // 1画面に表示するスライドの数
        spaceBetween={30} // スライド間のスペース
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={item.image} alt={item.name} />
              <Box p="6">
                <Text fontWeight="bold" fontSize="xl" mb="2">{item.name}</Text>
                <Text fontSize="sm">{item.description}</Text>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
