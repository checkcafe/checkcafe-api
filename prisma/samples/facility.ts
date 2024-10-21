type FaciltityRecord = {
  name: string;
  description?: string;
};

type FaciltityCategory = {
  category: string;
  description?: string;
  facilties: FaciltityRecord[];
};

const featureCategories: FaciltityCategory[] = [
  {
    category: "Comfort & Convenience",
    description:
      "Features that provide comfort and convenience to customers during their stay at the cafe.",
    facilties: [
      {
        name: "Free Wi-Fi",
        description:
          "High-speed wireless internet available for all customers.",
      },
      {
        name: "Outdoor Seating",
        description: "Comfortable outdoor seating with a pleasant view.",
      },
      {
        name: "Indoor Seating",
        description: "Cozy indoor seating for work or relaxation.",
      },
      {
        name: "Parking Space",
        description: "Free parking space available for customers.",
      },
      {
        name: "Air Conditioning",
        description:
          "The cafe is air-conditioned for a comfortable experience.",
      },
      {
        name: "Wheelchair Accessible",
        description: "The cafe is accessible to customers using wheelchairs.",
      },
      {
        name: "Toilet",
        description: "Clean and accessible restroom for customers.",
      },
      {
        name: "Prayer Room",
        description: "A small prayer room for Muslim customers.",
      },
    ],
  },
  {
    category: "Entertainment & Activities",
    description:
      "Entertainment and activities provided for customers to enjoy during their visit.",
    facilties: [
      {
        name: "Live Music",
        description: "Enjoy live performances by local artists.",
      },
      {
        name: "Board Games",
        description: "A variety of board games to enjoy with friends.",
      },
      {
        name: "Arcade Games",
        description: "Classic arcade games for customer entertainment.",
      },
      {
        name: "Pool Table",
        description: "A pool table is available for customers to play.",
      },
      {
        name: "Gaming Consoles",
        description:
          "Gaming consoles available for customers to enjoy popular video games.",
      },
    ],
  },
  {
    category: "Food & Beverage",
    description:
      "Features related to food and drink offerings, including special menu options.",
    facilties: [
      {
        name: "Vegan Options",
        description: "The cafe offers vegan-friendly menu items.",
      },
      {
        name: "Halal Food",
        description: "Halal-certified food is available on the menu.",
      },
      {
        name: "Organic Food Options",
        description:
          "The menu includes organic and locally sourced ingredients.",
      },
      {
        name: "Gluten-Free Options",
        description: "Gluten-free alternatives are available on the menu.",
      },
    ],
  },
  {
    category: "Services & Facilities",
    description:
      "Additional services and facilities provided for customer convenience.",
    facilties: [
      {
        name: "Meeting Rooms",
        description: "Private meeting rooms available for booking.",
      },
      {
        name: "Delivery Service",
        description: "Delivery service is available for cafe orders.",
      },
      {
        name: "Charging Stations",
        description: "Charging stations available for electronic devices.",
      },
      {
        name: "Takeaway & Pre-ordering Service",
        description:
          "Pre-order food and drinks for pickup at your convenience.",
      },
    ],
  },
  {
    category: "Safety & Security",
    description:
      "Features that ensure the safety and security of customers at the cafe.",
    facilties: [
      {
        name: "CCTV Surveillance",
        description: "The cafe is monitored by CCTV for customer safety.",
      },
      {
        name: "Smoking Area",
        description: "Designated smoking area available for smokers.",
      },
      {
        name: "Non-Smoking Area",
        description: "Dedicated non-smoking area for a smoke-free environment.",
      },
      {
        name: "First Aid Kit",
        description: "A first aid kit is available in case of emergencies.",
      },
    ],
  },
  {
    category: "Community & Events",
    description:
      "Features that encourage community engagement and events held at the cafe.",
    facilties: [
      {
        name: "Trivia Night",
        description:
          "Join our weekly trivia night for a fun and competitive evening.",
      },
      {
        name: "Board Game Nights",
        description:
          "Join us for board game nights with a variety of games and friendly competition.",
      },
      {
        name: "Live Sports Broadcast",
        description: "Watch live sports events on big screens.",
      },
      {
        name: "Themed Nights",
        description:
          "Enjoy special themed nights like karaoke, movie screenings, and more.",
      },
    ],
  },
];

export default featureCategories;
