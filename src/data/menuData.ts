// Type definitions for menu items
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

// Type for menu categories
export type MenuCategory = 
  | "Προσφορές"
  | "Πίτσες"
  | "Σαλάτες"
  | "Burgers"
  | "Παγωτά"
  | "Vegan"
  | "Ζυμαρικά"
  | "Ποτά";

// Type for the complete menu data structure
export type MenuData = Record<MenuCategory, MenuItem[]>;

export const menuData: MenuData = {
  "Προσφορές": [
    {
      id: 1,
      name: "Strip n Dip",
      description: "Δες την πίτσα ΑΛΛΙΩΣ! Στη νέα Strip n Dip εποχή, η πίτσα κόβεται σε 12 λωρίδες και βουτιέται σε 3 λαχταριστά dips, για ατελείωτα Strip n Dip ρολόγματα με επιπλέον +1,90€!...",
      price: "Επίλεξε προϊόν",
      image: "/api/placeholder/300/200",
      badge: "ΝΕΟ"
    },
    {
      id: 2,
      name: "Pizza Margherita 5€",
      description: "Απόλαυσε καθημερινά την αγαπημένη σου πίτσα Margherita 6 κομματιών μόνο με 5€!",
      price: "Από 5.00€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Summer Box",
      description: "1 BOX FOR YOU classic + 1 παγωτό Scandal 175ml στα 11,50€",
      price: "Από 11.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Ice Deal",
      description: "Συνδύασε την αγαπημένη σου μεσαία Classic πίτσα 6 κομματιών με 1 παγωτό Scandal 175ml μόνο 9,90€ (+1€ για πίτσα Premium)",
      price: "Από 9.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "1+1 Offers",
      description: "Διπλή απόλαυση με τις 1+1 προσφορές μας! Παράγγειλε 2 πίτσες στην ίδια τιμή.",
      price: "Ειδική τιμή",
      image: "/api/placeholder/300/200"
    }
  ],
  "Πίτσες": [
    {
      id: 6,
      name: "Margherita",
      description: "Κλασική πίτσα με τοματοσάλτσα, μοτσαρέλα και φρέσκο βασιλικό",
      price: "Από 8.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      name: "Pepperoni",
      description: "Πίτσα με τοματοσάλτσα, μοτσαρέλα και πικάντικο πεπερόνι",
      price: "Από 10.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      name: "Quattro Stagioni",
      description: "Πίτσα με τοματοσάλτσα, μοτσαρέλα, ζαμπόν, μανιτάρια, αρθισόκες και ελιές",
      price: "Από 12.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      name: "Prosciutto",
      description: "Πίτσα με τοματοσάλτσα, μοτσαρέλα, προσούτο και ρόκα",
      price: "Από 13.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 10,
      name: "Quattro Formaggi",
      description: "Πίτσα με τέσσερα τυριά: μοτσαρέλα, γκοργκοντζόλα, παρμεζάνα και φέτα",
      price: "Από 11.90€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Σαλάτες": [
    {
      id: 11,
      name: "Χωριάτικη Σαλάτα",
      description: "Παραδοσιακή ελληνική σαλάτα με ντομάτες, αγγούρι, κρεμμύδι, ελιές και φέτα",
      price: "6.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 12,
      name: "Caesar Salad",
      description: "Σαλάτα με μαρούλι, κοτόπουλο, παρμεζάνα, κρουτόν και Caesar dressing",
      price: "7.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 13,
      name: "Σαλάτα με Ρόκα",
      description: "Φρέσκια ρόκα με cherry ντομάτες, παρμεζάνα και βαλσάμικο",
      price: "6.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 14,
      name: "Μεσογειακή Σαλάτα",
      description: "Μίγμα πρασίνων με ελιές, φέτα, ντομάτες και ελαιόλαδο",
      price: "7.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 15,
      name: "Σαλάτα του Σεφ",
      description: "Ειδική σαλάτα με κοτόπουλο, μπέικον, αυγό και ντρέσινγκ του σεφ",
      price: "8.90€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Burgers": [
    {
      id: 16,
      name: "Classic Burger",
      description: "Κλασικό burger με μοσχαρίσιο μπιφτέκι, τυρί, ντομάτα, κρεμμύδι και σάλτσα",
      price: "8.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 17,
      name: "Chicken Burger",
      description: "Burger με κοτόπουλο, μαρούλι, ντομάτα και μαγιονέζα",
      price: "7.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 18,
      name: "BBQ Burger",
      description: "Burger με μπιφτέκι, μπέικον, τυρί cheddar και BBQ σάλτσα",
      price: "9.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 19,
      name: "Veggie Burger",
      description: "Vegetarian burger με μπιφτέκι λαχανικών, αβοκάντο και σάλτσα",
      price: "8.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 20,
      name: "Double Cheese Burger",
      description: "Διπλό burger με δύο μπιφτέκια, διπλό τυρί και ειδική σάλτσα",
      price: "11.90€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Παγωτά": [
    {
      id: 21,
      name: "Scandal Vanilla",
      description: "Κρεμώδες παγωτό βανίλια σε συσκευασία 175ml",
      price: "3.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 22,
      name: "Scandal Chocolate",
      description: "Πλούσιο παγωτό σοκολάτα σε συσκευασία 175ml",
      price: "3.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 23,
      name: "Scandal Strawberry",
      description: "Φρέσκο παγωτό φράουλα σε συσκευασία 175ml",
      price: "3.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 24,
      name: "Gelato Mix",
      description: "Συλλογή από 3 γεύσεις gelato σε μεγάλη συσκευασία",
      price: "5.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 25,
      name: "Ice Cream Sandwich",
      description: "Παγωτό ανάμεσα σε δύο μπισκότα σοκολάτας",
      price: "4.50€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Vegan": [
    {
      id: 26,
      name: "Vegan Margherita",
      description: "Πίτσα με vegan τυρί, τοματοσάλτσα και φρέσκο βασιλικό",
      price: "Από 9.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 27,
      name: "Vegan Veggie",
      description: "Πίτσα με λαχανικά εποχής, vegan τυρί και ελαιόλαδο",
      price: "Από 11.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 28,
      name: "Vegan Burger",
      description: "Burger με φυτικό μπιφτέκι, αβοκάντο και vegan μαγιονέζα",
      price: "9.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 29,
      name: "Quinoa Salad",
      description: "Σαλάτα με κινόα, λαχανικά, αμύγδαλα και ταχίνι dressing",
      price: "8.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 30,
      name: "Vegan Pasta",
      description: "Ζυμαρικά με λαχανικά, ελαιόλαδο και φρέσκα αρωματικά",
      price: "10.50€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Ζυμαρικά": [
    {
      id: 31,
      name: "Spaghetti Carbonara",
      description: "Κλασικά σπαγγέτι με μπέικον, αυγό, παρμεζάνα και μαύρο πιπέρι",
      price: "9.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 32,
      name: "Penne Arrabbiata",
      description: "Πέννες με πικάντικη τοματοσάλτσα, σκόρδο και τσίλι",
      price: "8.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 33,
      name: "Lasagna",
      description: "Παραδοσιακή λαζάνια με κιμά, μπεσαμέλ και τυρί",
      price: "11.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 34,
      name: "Fettuccine Alfredo",
      description: "Φετουτσίνι με κρεμώδη σάλτσα αλφρέντο και παρμεζάνα",
      price: "10.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 35,
      name: "Pasta Pesto",
      description: "Ζυμαρικά με φρέσκο pesto βασιλικού και πινόλια",
      price: "9.50€",
      image: "/api/placeholder/300/200"
    }
  ],
  "Ποτά": [
    {
      id: 36,
      name: "Coca Cola",
      description: "Κλασική Coca Cola 330ml",
      price: "2.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 37,
      name: "Φρέσκος Χυμός Πορτοκάλι",
      description: "Φρεσκοστυμμένος χυμός πορτοκάλι 250ml",
      price: "3.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 38,
      name: "Νερό",
      description: "Φυσικό μεταλλικό νερό 500ml",
      price: "1.50€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 39,
      name: "Iced Tea",
      description: "Παγωμένο τσάι λεμόνι 330ml",
      price: "2.90€",
      image: "/api/placeholder/300/200"
    },
    {
      id: 40,
      name: "Espresso",
      description: "Διπλός ελληνικός καφές espresso",
      price: "2.00€",
      image: "/api/placeholder/300/200"
    }
  ]
};
