type OperatingHour = {
  day: string;
  startDateTime: string;
  endDateTime: string;
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
        startDateTime: "2024-10-21T09:00:00Z",
        endDateTime: "2024-10-21T22:00:00Z",
      },
      {
        day: "Tuesday",
        startDateTime: "2024-10-22T08:00:00Z",
        endDateTime: "2024-10-22T21:00:00Z",
      },
      {
        day: "Wednesday",
        startDateTime: "2024-10-23T08:00:00Z",
        endDateTime: "2024-10-23T21:00:00Z",
      },
      {
        day: "Thursday",
        startDateTime: "2024-10-24T08:00:00Z",
        endDateTime: "2024-10-24T21:00:00Z",
      },
      {
        day: "Friday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
      },
      {
        day: "Saturday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
      },
      {
        day: "Sunday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
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
        startDateTime: "2024-10-21T08:00:00Z",
        endDateTime: "2024-10-21T21:00:00Z",
      },
      {
        day: "Tuesday",
        startDateTime: "2024-10-22T08:00:00Z",
        endDateTime: "2024-10-22T21:00:00Z",
      },
      {
        day: "Wednesday",
        startDateTime: "2024-10-23T08:00:00Z",
        endDateTime: "2024-10-23T21:00:00Z",
      },
      {
        day: "Thursday",
        startDateTime: "2024-10-24T08:00:00Z",
        endDateTime: "2024-10-24T21:00:00Z",
      },
      {
        day: "Friday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
      },
      {
        day: "Saturday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
      },
      {
        day: "Sunday",
        startDateTime: "2024-10-25T08:00:00Z",
        endDateTime: "2024-10-25T21:00:00Z",
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
        startDateTime: "2024-10-21T10:00:00Z",
        endDateTime: "2024-10-21T02:00:00Z",
      },
      {
        day: "Tuesday",
        startDateTime: "2024-10-22T10:00:00Z",
        endDateTime: "2024-10-22T02:00:00Z",
      },
      {
        day: "Wednesday",
        startDateTime: "2024-10-23T10:00:00Z",
        endDateTime: "2024-10-23T02:00:00Z",
      },
      {
        day: "Thursday",
        startDateTime: "2024-10-24T10:00:00Z",
        endDateTime: "2024-10-24T02:00:00Z",
      },
      {
        day: "Friday",
        startDateTime: "2024-10-25T10:00:00Z",
        endDateTime: "2024-10-25T02:00:00Z",
      },
      {
        day: "Saturday",
        startDateTime: "2024-10-25T10:00:00Z",
        endDateTime: "2024-10-25T02:00:00Z",
      },
      {
        day: "Sunday",
        startDateTime: "2024-10-25T10:00:00Z",
        endDateTime: "2024-10-25T02:00:00Z",
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
        startDateTime: "2024-10-21T09:00:00Z",
        endDateTime: "2024-10-21T22:00:00Z",
      },
      {
        day: "Tuesday",
        startDateTime: "2024-10-22T09:00:00Z",
        endDateTime: "2024-10-22T22:00:00Z",
      },
      {
        day: "Wednesday",
        startDateTime: "2024-10-23T09:00:00Z",
        endDateTime: "2024-10-23T22:00:00Z",
      },
      {
        day: "Thursday",
        startDateTime: "2024-10-24T09:00:00Z",
        endDateTime: "2024-10-24T22:00:00Z",
      },
      {
        day: "Friday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
      },
      {
        day: "Saturday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
      },
      {
        day: "Sunday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
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
        startDateTime: "2024-10-21T09:00:00Z",
        endDateTime: "2024-10-21T22:00:00Z",
      },
      {
        day: "Tuesday",
        startDateTime: "2024-10-22T09:00:00Z",
        endDateTime: "2024-10-22T22:00:00Z",
      },
      {
        day: "Wednesday",
        startDateTime: "2024-10-23T09:00:00Z",
        endDateTime: "2024-10-23T22:00:00Z",
      },
      {
        day: "Thursday",
        startDateTime: "2024-10-24T09:00:00Z",
        endDateTime: "2024-10-24T22:00:00Z",
      },
      {
        day: "Friday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
      },
      {
        day: "Saturday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
      },
      {
        day: "Sunday",
        startDateTime: "2024-10-25T09:00:00Z",
        endDateTime: "2024-10-25T22:00:00Z",
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
];

export default places;
