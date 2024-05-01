import React, { useState, useEffect } from "react";

// components
import Appbar from "../template/Appbar";
import Footer from "../template/Footer";
import { PrefectureContainer } from "../organisms/PrefectureContainer";
import { FoodSlide } from "../organisms/FoodSlide";

// image
import aichi from "../../assets/images/aichi.png";
import { foodItems } from "../context/FoodItems";

// interface
import { FoodItem } from "../context/FoodItems";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationState {
  loaded: boolean;
  coordinates?: Coordinates;
}

export const Main: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({ loaded: false });
  const [prefectureName, setPrefectureName] = useState<string | null>(null);

  const [food, setFooda] = useState<FoodItem[]>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  }, []);

  const getPrefecture = async (lat: number, lng: number) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].address_components;
        const prefecture = address.find((component: any) =>
          component.types.includes("administrative_area_level_1")
        );
        if (prefecture) {
          setPrefectureName(prefecture.long_name);
          setFooda(foodItems);
        }
      }
    } catch (error) {
      console.error("Failed to fetch the prefecture name", error);
    }
  };

  useEffect(() => {
    if (location.loaded && location.coordinates) {
      getPrefecture(location.coordinates.lat, location.coordinates.lng);
    }
  }, [location]);

  // 検索アクションを実行する関数
  const onSearch = (prefectureName: string) => {
    const prefecture = prefectureName
    setPrefectureName(prefecture);
  };

  return (
    <div>
      <Appbar />
      <PrefectureContainer
        prefectureName={prefectureName || "Loading..."}
        phrase="味わい深き伝統、愛知の味を堪能せよ"
        prefectureImage={aichi}
      />

      <FoodSlide items={food} onSearch={onSearch}/>

      <Footer />
    </div>
  );
};
