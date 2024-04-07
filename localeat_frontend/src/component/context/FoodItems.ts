import aichi1 from "../../assets/images/aichi_1.jpg";
import aichi2 from "../../assets/images/aichi_2.jpg";
import aichi3 from "../../assets/images/aichi_3.jpg";

export interface FoodItem {
  name: string;
  image: string;
  description: string;
}

export const foodItems: FoodItem[] = [
  {
    name: "きしめん",
    image: aichi1,
    description: "平たい麺が特徴の、愛知県発祥のうどんです。",
  },
  {
    name: "味噌煮込みうどん",
    image: aichi2,
    description: "味噌ベースのスープで煮込んだうどんで、愛知県の冬の定番料理です。",
  },
  {
    name: "いなりずし",
    image: aichi3,
    description: "酢飯を油揚げで包んだ、日本全国で愛される寿司の一種です。",
  },
];