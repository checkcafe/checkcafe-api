type FeatureRecord = {
  name: string;
  description?: string;
};

type FeatureCategory = {
  category: string;
  description?: string;
  features: FeatureRecord[];
};

const featureCategories: FeatureCategory[] = [
  {
    category: "Comfort & Convenience",
    description:
      "Features that focus on providing comfort and convenience to customers during their stay at the cafe.",
    features: [
      {
        name: "Free Wi-Fi",
        description:
          "High-speed wireless internet connection available for all customers.",
      },
      {
        name: "Outdoor Seating",
        description: "Comfortable outdoor seating area with a view.",
      },
      {
        name: "Parking Space",
        description: "Free parking space available for customers.",
      },
      {
        name: "Air Conditioning",
        description:
          "The cafe is fully air-conditioned for a comfortable experience.",
      },
      {
        name: "Wheelchair Accessible",
        description: "The cafe has facilities for wheelchair users.",
      },
    ],
  },
  {
    category: "Entertainment & Activities",
    description:
      "Features providing entertainment and activities for customers to enjoy while at the cafe.",
    features: [
      {
        name: "Live Music",
        description: "Enjoy live performances from local artists.",
      },
      {
        name: "Board Games",
        description:
          "A variety of board games available for customers to enjoy with friends.",
      },
      {
        name: "Arcade Games",
        description: "Classic arcade games available for entertainment.",
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
    features: [
      {
        name: "Vegan Options",
        description: "The cafe offers vegan-friendly menu items.",
      },
      {
        name: "Halal Food",
        description: "Halal-certified food is available in the menu.",
      },
      {
        name: "Organic Food Options",
        description:
          "The menu includes organic and locally-sourced ingredients.",
      },
      {
        name: "Gluten-Free Options",
        description: "The cafe offers gluten-free alternatives on the menu.",
      },
    ],
  },
  {
    category: "Services & Facilities",
    description:
      "Additional services and facilities for customer convenience and needs.",
    features: [
      {
        name: "Meeting Rooms",
        description: "Private meeting rooms are available for booking.",
      },
      {
        name: "Delivery Service",
        description: "Home delivery service is available for cafe orders.",
      },
      {
        name: "Charging Stations",
        description: "Charging stations are available for electronic devices.",
      },
      {
        name: "Takeaway & Pre-ordering Service",
        description:
          "Order your food and drinks in advance and pick them up at your convenience.",
      },
    ],
  },
  {
    category: "Safety & Security",
    description:
      "Features related to customer safety and security while at the cafe.",
    features: [
      {
        name: "CCTV Surveillance",
        description: "The cafe is monitored by CCTV for customer safety.",
      },
      {
        name: "Wheelchair Accessible",
        description: "The cafe has facilities for wheelchair users.",
      },
      {
        name: "Smoking Area",
        description: "Designated smoking area available for smokers.",
      },
      {
        name: "Non-Smoking Area",
        description: "Dedicated non-smoking area for a smoke-free environment.",
      },
    ],
  },
  {
    category: "Community & Events",
    description:
      "Features that encourage community engagement and events held at the cafe.",
    features: [
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
