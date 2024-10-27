type OperatingHour = {
  day: string;
  openingTime: string;
  closingTime: string;
};

type PlaceFacility = {
  facility: string;
  description: string;
};

type PlacePhoto = {
  url: string;
  order: number;
};

type Place = {
  name: string;
  description?: string;
  streetAddress: string;
  city: string | null;
  priceRange?: string;
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
    priceRange: "50000",
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
        url: "https://lh3.googleusercontent.com/p/AF1QipNyXWksKJT4Eoz8HLZS0PDwGCoRc5dLB4YwONdc=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOz9u5wGSl_o_qxBtjce5TM_2CIRMuOnKGtJT0z=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOu2NFzu6j87osV9KF4Fo-EAlMm3dASx_uwVuis=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Evlogia Cafe & Co",
    streetAddress: "Jl. Cisanggiri I No. 6, Senopati, Kebayoran Baru",
    city: "Kota Jakarta Selatan",
    priceRange: "50000",
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
        url: "https://lh3.googleusercontent.com/p/AF1QipNny5HMeEVYF6GnOfUpCFhQGUDj7-PJNiz8d0ob=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPmM6O4vD9pqI28ABgamhB9tXCsSS2vLzsAN6s0=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOpWW18QCw27w5nWWUDb-aMkbKLWJfQcdb2QCDH=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Hartaka Coffee & Billiard",
    streetAddress: "Jl. Tebet Barat IX No.4, Tebet Barat, Kec. Tebet",
    city: "Kota Jakarta Selatan",
    priceRange: "50000",
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
        url: "https://lh3.googleusercontent.com/p/AF1QipPvey2kvaRnm5Cefi3kOGQLMqYMWAtajhySt7jN=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMjjwu4oSslBIA4uUYu2BQd69tUI2A6gc3UhALg=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMNlJeL5RDALhUwsDFG3E2svnx3BgjXHMHZIvqM=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Temu Kita Coffee Terrace",
    streetAddress: "Jl. Cihanjuang No.81A, Cibabat",
    city: "Kota Cimahi",
    priceRange: "30000",
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
        url: "https://lh3.googleusercontent.com/p/AF1QipMLrpuYue-dg2rU5vv14ko1GWXdeh8z_uxuOlUB=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipO-5c8ZeOUu34SWJISAQwGEjFW8Wbhx5G1HiP9J=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPT-pCeJUMRNkGdboPGvH-6LMc6f-wrhRmK8-h1=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Roemah K-Ve",
    streetAddress: "Jl. Mahar Martanegara No.229, Utama, Kec. Cimahi Sel",
    city: "Kota Cimahi",
    priceRange: "30000",
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
        url: "https://lh3.googleusercontent.com/p/AF1QipP4C0hX7m2oRNYPAIBKDtdQqWYeo2xiO2k2ffIe=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMOc0YO9E6cTOtHWZtGzN7neBlwQYpYZQBln3pT=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOZCl8VVprf7lg65BGXUx3htu3-DMnl5k9IDzi3=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Haruna Cafe",
    streetAddress: "Jl. Danau Sentarum, Sungai Bangkong, Kec. Pontianak Kota.",
    city: "Kota Pontianak",
    priceRange: "25000",
    isPublished: true,
    lat: -0.048090,
    long: 109.308060,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "07:00",
        closingTime: "23:00"
      },
    ],
    placePhotos: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPs47nBR9i97qUNwEs0tWTRR18kfHsETdzxInPa=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPdSWn1wtLD7vVD-j_71RrxlrKGXZeqCIi5IvV8=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipNGBXIlnKx_zZ021rJZWz4qcZVWMChl8ViPPg0G=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Chara Coffee",
    streetAddress: "Gg. Purnama I No.9, Parit Tokaya, Kec. Pontianak Sel., Kota Pontianak.",
    city: "Kota Pontianak",
    priceRange: "25000",
    isPublished: true,
    lat: -0.058880,
    long: 109.324830,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "09:00",
        closingTime: "23:00"
      },
    ],
    placePhotos: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMrF6SVCQztp1zjTVWPo7w20ouQ-BOHj8KLArGO=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipMLnNmwpKUZejq67updudKrcUHPVpqSuykPvVmz=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipNrmr2sxvYA_4GNTbpCs9r24pd2hwGNE8qx5AL8=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "The Grounds Cafe",
    streetAddress: "Jl. WR Supratman No.9, Benua Melayu Darat, Kec. Pontianak Sel., Kota Pontianak.",
    city: "Kota Pontianak",
    priceRange: "50000",
    isPublished: true,
    lat: -0.035880,
    long: 109.339400,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
    ],
    placePhotos: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPqmWlYvGskzgxml9dJApksqk9GgL-NxDIsYyxb=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipP_IqljSQHPzbXCDW-tOjAXV7vZyIAhfmW1wg71=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPgBrXT_QCkYRDbdpH0ZoFt6DIYXsfZHceqfreR=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "Aming Coffee",
    streetAddress: "Kampung Tengah, Mempawah Hilir, Mempawah Regency.",
    city: "Mempawah",
    priceRange: "50000",
    isPublished: true,
    lat: 0.353500,
    long: 108.963790,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "23:00"
      },
    ],
    placePhotos: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipNE2Rr-eJuMWIKrfhespJI0EXVuePpVu0JhiPtZ=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPasmT39ZOyjM5hmriu0glvV4uUqKXlZteoM8Wa=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipO_zSDzRH9WwIXoYlTS1Vh1LNaFm94ekP4TkLFG=s680-w680-h510",
        order: 2,
      },
    ],
  },
  {
    name: "UP Coffee",
    streetAddress: "VXXC+75X, Pasiran, Singkawang Barat, Singkawang City.",
    city: "Kota Singkawang",
    priceRange: "25000",
    isPublished: true,
    lat: 0.903430,
    long: 108.975388,
    operatingHours: [
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
      {
        day: "Sunday",
        openingTime: "10:00",
        closingTime: "22:00"
      },
    ],
    placePhotos: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipN2FSa-FPEnauvP7ZcHc9kBnEnWqubC_fRetMkC=s680-w680-h510",
        order: 0,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipOPEkNu9R6aHHOyw-jQtRm5alFiRY-42Sew86tL=s680-w680-h510",
        order: 1,
      },
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipPVGHM88Q_KrmOb0tvXiL7bq6Gqc2v1zLLOTjIr=s680-w680-h510",
        order: 2,
      },
    ],
  },
];

export default places;
