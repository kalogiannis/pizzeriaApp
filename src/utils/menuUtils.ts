// import type { MenuItem, MenuCategory, MenuData } from "../data/menuData";

// export const addCategoryToMenuItems = (menuData: MenuData): MenuData => {
//   const updatedMenuData: MenuData = {};

//   // Ensure all categories are present in the updated data, even if empty
//   const allCategories: MenuCategory[] = [
//     "Προσφορές", "Πίτσες", "Σαλάτες", "Burgers", "Παγωτά", "Vegan", "Ζυμαρικά", "Ποτά"
//   ];

//   for (const category of allCategories) {
//     updatedMenuData[category] = (menuData[category] || []).map(item => ({
//       ...item,
//       category: category,
//     }));
//   }
//   return updatedMenuData;
// };



import type { MenuCategory, MenuData } from "../data/menuData";

export const addCategoryToMenuItems = (menuData: MenuData): MenuData => {
  const updatedMenuData: MenuData = {
    "Προσφορές": [],
    "Πίτσες": [],
    "Σαλάτες": [],
    "Burgers": [],
    "Παγωτά": [],
    "Vegan": [],
    "Ζυμαρικά": [],
    "Ποτά": [],
  };

  // Ensure all categories are present in the updated data, even if empty
  const allCategories: MenuCategory[] = [
    "Προσφορές", "Πίτσες", "Σαλάτες", "Burgers", "Παγωτά", "Vegan", "Ζυμαρικά", "Ποτά"
  ];

  for (const category of allCategories) {
    updatedMenuData[category] = (menuData[category] || []).map(item => ({
      ...item,
      category: category,
    }));
  }
  return updatedMenuData;
};
