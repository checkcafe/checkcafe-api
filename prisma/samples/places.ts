import {
  OperatingHour,
  PlaceFacility,
  PlacePhoto,
} from "../../src/types/place";

type Place = {
  name: string;
  description?: string;
  streetAddress: string;
  city: string | null;
  priceRangeMin?: number;
  priceRangeMax?: number;
  lat?: number;
  long?: number;
  isPublished: boolean;
  operatingHours?: OperatingHour[];
  placeFacilities?: PlaceFacility[];
  placePhotos?: PlacePhoto[];
};

const places: Place[] = [
  {
    name: "OSH Jakarta",
    streetAddress: "Jl. Tebet Barat IX No. 3, Tebet",
    city: "Kota Jakarta Selatan",
    priceRangeMin: 50000,
    priceRangeMax: 150000,
    isPublished: true,
    lat: -6.238384652269945,
    long: 106.8514705345677,
    operatingHours: [
      {
        day: "Monday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Wednesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Thursday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Friday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Saturday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
    ],
    placeFacilities: [
      {
        facility: "Free Wi-Fi",
        description: "25 Mbps",
      },
      {
        facility: "Indoor Seating",
        description: "10 Table with Chair",
      },
      {
        facility: "Parking Space",
        description: "20 Space Motorcycle & 3 Space Car",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/89bc774b-ec7e-4aa7-bd75-370cfb812b84/oshjakarta1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/0f817510-7998-4ef0-bc44-63b6cd8a85d4/oshjakarta2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/7143cd0d-909a-4211-95c6-d80bc220fec5/oshjakarta3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Evlogia Cafe & Co",
    streetAddress: "Jl. Cisanggiri I No. 6, Senopati, Kebayoran Baru",
    city: "Kota Jakarta Selatan",
    priceRangeMin: 50000,
    priceRangeMax: 150000,
    isPublished: true,
    lat: -6.239833512553738,
    long: 106.81139548342742,
    operatingHours: [
      {
        day: "Monday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Tuesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Wednesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Thursday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Friday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Saturday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
    ],
    placeFacilities: [
      {
        facility: "Free Wi-Fi",
        description: "25 Mbps",
      },
      {
        facility: "Indoor Seating",
        description: "5 Table with Chair",
      },
      {
        facility: "Outdoor Seating",
        description: "6 Table with Chair",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/4dd1d22e-e2f9-40b9-8626-be6f213fbf52/evlogiacafe1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/450b2cf4-dbc0-4f01-a48c-b9fa46e9c004/evlogiacafe2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/e47941cd-33cc-41eb-bf7d-03022539c4c8/evlogiacafe3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Hartaka Coffee & Billiard",
    streetAddress: "Jl. Tebet Barat IX No.4, Tebet Barat, Kec. Tebet",
    city: "Kota Jakarta Selatan",
    priceRangeMin: 50000,
    priceRangeMax: 250000,
    isPublished: true,
    lat: -6.238107805845276,
    long: 106.85163653085576,
    operatingHours: [
      {
        day: "Monday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Tuesday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Wednesday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Thursday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Friday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Saturday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "02:00",
      },
    ],
    placeFacilities: [
      {
        facility: "Indoor Seating",
        description: "5 Table with Chair",
      },
      {
        facility: "Pool Table",
        description: "2 Pool Table",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/34e8ad96-9ec9-42d2-a96b-0c2b9f1a12bc/hartakacoffee1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/31fdadfb-12e6-4cbe-bdcc-12951a6b81a6/hartakacoffee2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/e69b5ed2-469c-47de-9b8e-7c67a951da07/hartakacoffee3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Temu Kita Coffee Terrace",
    streetAddress: "Jl. Cihanjuang No.81A, Cibabat",
    city: "Kota Cimahi",
    priceRangeMin: 30000,
    priceRangeMax: 150000,
    isPublished: true,
    lat: -6.872082058057354,
    long: 107.55317124119699,
    operatingHours: [
      {
        day: "Monday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/0d60a202-4d38-44c0-be97-e850e3a74fa9/temukitacoffee1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/eb441588-b93a-46e4-b384-60aa13210580/temukitacoffee2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/be349640-ceda-4b85-9f5a-c4b0c2c74510/temukitacoffee3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Roemah K-Ve",
    streetAddress: "Jl. Mahar Martanegara No.229, Utama, Kec. Cimahi Sel",
    city: "Kota Cimahi",
    priceRangeMin: 30000,
    priceRangeMax: 150000,
    isPublished: true,
    lat: -6.90213295191926,
    long: 107.54213609940383,
    operatingHours: [
      {
        day: "Monday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/3346090b-6e05-406e-b176-5c4d154423bf/roemahkve1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/83199b7a-2d68-4a86-ad7d-2f571bf08954/roemahkve2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/355ad026-f90d-41f0-95a4-6319c67a69d1/roemahkve3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Haruna Cafe",
    streetAddress: "Jl. Danau Sentarum, Sungai Bangkong, Kec. Pontianak Kota.",
    city: "Kota Pontianak",
    priceRangeMin: 25000,
    priceRangeMax: 100000,
    isPublished: true,
    lat: -0.04809,
    long: 109.30806,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Monday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Tuesday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Wednesday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Thursday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Friday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
      {
        day: "Saturday",
        openingTime: "07:00",
        closingTime: "23:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/430c4a54-21ea-4c12-ad2f-d94134050277/harunacafe1.JPG",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/6e34bdd6-8000-44ce-aa65-e677ef3ec855/harunacafe2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/6a12572c-33ff-4301-bd43-fbf45f7b41fa/harunacafe3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Chara Coffee",
    streetAddress:
      "Gg. Purnama I No.9, Parit Tokaya, Kec. Pontianak Sel., Kota Pontianak.",
    city: "Kota Pontianak",
    priceRangeMin: 25000,
    priceRangeMax: 100000,
    isPublished: true,
    lat: -0.05888,
    long: 109.32483,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Monday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Tuesday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Wednesday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Thursday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Friday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
      {
        day: "Saturday",
        openingTime: "09:00",
        closingTime: "23:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/a669e096-e954-49fa-9cc3-8074a02d65ac/characoffee1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/da604e46-7d39-4595-8e4f-228ba1819b48/characoffee2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/6d1e510e-f70d-442e-aeff-b0675616cbdc/characoffee3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "The Grounds Cafe",
    streetAddress:
      "Jl. WR Supratman No.9, Benua Melayu Darat, Kec. Pontianak Sel., Kota Pontianak.",
    city: "Kota Pontianak",
    priceRangeMin: 50000,
    priceRangeMax: 100000,
    isPublished: true,
    lat: -0.03588,
    long: 109.3394,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Monday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/b0ed05d6-4320-4f99-be18-e319ef26fa9e/thegroundscafe1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/96557877-6ba5-4d3b-8709-a3542283d13d/thegroundscafe2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/b31649bf-b9c8-4eb4-a0df-4271a924c56e/thegroundscafe3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Aming Coffee",
    streetAddress: "Kampung Tengah, Mempawah Hilir, Mempawah Regency.",
    city: "Mempawah",
    priceRangeMin: 50000,
    priceRangeMax: 100000,
    isPublished: true,
    lat: 0.3535,
    long: 108.96379,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Monday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Tuesday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Wednesday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Thursday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Friday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
      {
        day: "Saturday",
        openingTime: "08:00",
        closingTime: "23:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/f5554a9f-ffc9-4df1-b8bd-743eb9dde786/amingcoffe1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/d2ae6586-a466-4efb-9936-ec2f94825328/amingcoffee2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/041d0f68-f904-4da5-9d71-f6965fdc660a/amingcoffee3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "UP Coffee",
    streetAddress: "VXXC+75X, Pasiran, Singkawang Barat, Singkawang City.",
    city: "Kota Singkawang",
    priceRangeMin: 25000,
    priceRangeMax: 50000,
    isPublished: true,
    lat: 0.90343,
    long: 108.975388,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Monday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/6c502cc5-acd1-4c0d-9522-2baffd366094/upcoffee1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/b7c635ed-b321-4eae-9a3f-36d65454b67a/upcoffee2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/e312b8f3-f8da-4202-b13a-aedb6258de5e/upcoffee3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Leaf & co. cafe",
    streetAddress: "53, Jalan Sultan, City Centre, 50000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.",
    city: "Kuala Lumpur City Centre",
    priceRangeMin: 20,
    priceRangeMax: 50,
    isPublished: true,
    lat: 3.142420,
    long: 101.692850,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Monday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/9797f053-9b54-4bbe-a59f-5f8c30540d20/leafandcocafe1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/5999bba3-0a85-4bcb-9b6e-e50b3963a275/leafandcocafe2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/e6c06520-5e99-41fd-ab34-c5c6aa7648e1/leafandcocafe3.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "Solace Bukit Bintang",
    streetAddress: "39, 39A & 41, Jln Sahabat, Bukit Bintang, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.",
    city: "Bukit Bintang",
    priceRangeMin: 20,
    priceRangeMax: 50,
    isPublished: true,
    lat: 3.147350,
    long: 101.706970,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Monday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Tuesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Wednesday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Thursday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Friday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
      {
        day: "Saturday",
        openingTime: "10:00",
        closingTime: "22:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/8f4b93ad-5b22-4ef4-9b6a-3f7d828b5814/solace1.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/d049bef5-e2e5-4244-9be7-56e7aca284ef/solace2.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/eebc9711-6ef2-4394-bf64-c70d80641ce2/solace3.jpeg",
        order: 2,
      },
    ],
  },
  {
    name: "M Marini Grand Caffè & Terrazza",
    streetAddress: "Ground Floor, One Kl, No.6, Jalan Pinang, Kuala Lumpur City Centre, 50450 Kuala Lumpur, Federal Territory of Kuala Lumpur",
    city: "Kuala Lumpur City Centre",
    priceRangeMin: 20,
    priceRangeMax: 50,
    isPublished: true,
    lat: 3.155930,
    long: 101.710120,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Monday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Tuesday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Wednesday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Thursday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Friday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
      {
        day: "Saturday",
        openingTime: "11:30",
        closingTime: "01:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/b86ef166-2da1-429c-ac70-f2c8c7a68994/20200724.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/47cde01f-6414-4257-b344-222f5990393d/20240728.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/150ab550-47a5-4e9c-bbb9-413345b2c551/20220715.jpg",
        order: 2,
      },
    ],
  },
  {
    name: "After One KL",
    streetAddress: "1, Persiaran Lidcol , Jalan Yap Kwan Seng, Wilayah Persekutuan, 1, Persiaran Lidcol, Kampung Baru, 50450 Kuala Lumpur, Federal Territory of Kuala Lumpur",
    city: "Kuala Lumpur City Centre",
    priceRangeMin: 40,
    priceRangeMax: 60,
    isPublished: true,
    lat: 3.162240,
    long: 101.713280,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Monday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Tuesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Wednesday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Thursday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Friday",
       openingTime: "08:00",
        closingTime: "21:00",
      },
      {
        day: "Saturday",
        openingTime: "08:00",
        closingTime: "21:00",
      },
    ],
    placePhotos: [
      {
        url: "https://ucarecdn.com/02e6f08b-05a7-4530-8ca1-ca62238d0b1f/20240530.jpg",
        order: 0,
      },
      {
        url: "https://ucarecdn.com/6863b382-bba0-48fd-aaac-709b85f01d03/20220924.jpg",
        order: 1,
      },
      {
        url: "https://ucarecdn.com/917addf4-c824-4abb-8864-aa3d83760090/DSCF5088.jpg",
        order: 2,
      },
    ],
  },
];

export default places;
