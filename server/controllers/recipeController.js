const categoryModel = require("../models/CategoryModel");
const recipeModel = require("../models/RecipeModel");
/**
 * GET /
 * homepage
 */
exports.homepage = async (req, res) => {
  try {
    const categoryLimit = 5;
    const categories = await categoryModel.find({}).limit(categoryLimit);

    res.render("index", { title: "epiceats - Home", categories });
  } catch (error) {}
};

/**
 * GET /categories
 * Categories
 */
exports.categoryPage = async (req, res) => {
  try {
    const categoryLimit = 20;
    const categories = await categoryModel.find({}).limit(categoryLimit);

    res.render("categories", { title: "epiceats - Categories", categories });
  } catch (error) {}
};

/** create category manually */
/**
 * 
const categories = [
  {
    name: "Indian",
    image: "indian_food.png",
  },
  {
    name: "Thai",
    image: "thai_food.png",
  },
  {
    name: "American",
    image: "american_food.png",
  },
  {
    name: "Chinese",
    image: "chinese_food.png",
  },
  {
    name: "Spanish",
    image: "spanish_food.png",
  },
  {
    name: "Mexican",
    image: "Mexican_food.png",
  },
];
async function insertCategoryData() {
  try {
    await categoryModel.insertMany(categories);
    console.log("category inserted");
  } catch (error) {
    throw new Error(error.message);
  }
}

*/

/** create recipes manually */
/*
const recipes = [
  {
    name: "Spicy Curry Delight",
    description:
      "Spicy Curry Delight is a mouth-watering Indian curry with a blend of aromatic spices. This dish is a favorite for those who crave bold flavors and a touch of heat. \n\nCooking Process: Begin by marinating chicken pieces with a mixture of spices, then sauté them with a medley of tomatoes and onions until tender. Finish with a generous garnish of fresh cilantro. \n\nResources: You can find authentic Indian spice blends at your local spice shop or use your own mix. \n\nLinks: For a step-by-step video tutorial, check out this [Spicy Curry Recipe](https://example.com/spicy-curry-recipe). \n\nGuidance: Adjust the spice level according to your preference by adding more or less chili powder.",
    email: "spicycurry@example.com",
    ingredients: ["Chicken", "Tomatoes", "Onions", "Spices"],
    category: "Indian",
    image: "curry.jpg",
  },
  {
    name: "Pad Thai Sensation",
    description:
      "Pad Thai Sensation is a classic Thai dish known for its perfect balance of sweet, sour, and savory flavors. This dish combines stir-fried rice noodles with shrimp, tofu, and peanuts, all tossed in a tangy tamarind sauce. \n\nCooking Process: Start by stir-frying rice noodles and tofu, then add shrimp and crushed peanuts for that perfect crunch. Finish by drizzling the tamarind sauce and garnishing with fresh cilantro. \n\nResources: Visit an Asian grocery store for authentic Thai ingredients. \n\nLinks: Here's a detailed [Pad Thai Recipe](https://example.com/pad-thai-recipe) with step-by-step instructions. \n\nGuidance: Customize the spice level with extra chili flakes for a spicier kick.",
    email: "padthai@example.com",
    ingredients: ["Rice noodles", "Shrimp", "Tofu", "Peanuts"],
    category: "Thai",
    image: "padthai.jpg",
  },
  {
    name: "All-American Burger",
    description:
      "The All-American Burger is the ultimate burger experience, made with high-quality ingredients that satisfy your cravings. This classic American dish features a juicy beef patty, fresh lettuce, tomato, cheese, and a soft bun. \n\nCooking Process: Begin by grilling a perfectly seasoned beef patty to your desired level of doneness. Assemble the burger with lettuce, tomato, and cheese, and serve it on a fresh bun. \n\nResources: Look for premium ground beef and fresh vegetables at your local butcher and farmer's market. \n\nLinks: Here's a detailed [Burger Making Guide](https://example.com/burger-making-guide) for burger enthusiasts. \n\nGuidance: Experiment with various toppings like bacon, avocado, or fried eggs to create your own signature burger.",
    email: "burger@example.com",
    ingredients: ["Beef patty", "Lettuce", "Tomato", "Cheese", "Bun"],
    category: "American",
    image: "burger.jpg",
  },
  {
    name: "Sizzling Szechuan Stir-Fry",
    description:
      "The Sizzling Szechuan Stir-Fry is a flavorful Chinese dish that tingles your taste buds with its bold and spicy flavors. This stir-fry features marinated beef, bell peppers, and broccoli tossed in a zesty Szechuan sauce. \n\nCooking Process: Start by quickly searing marinated beef in a hot wok, then add bell peppers and broccoli. Finish by tossing the ingredients in a homemade Szechuan sauce. \n\nResources: Chinese markets often have authentic Szechuan sauces and ingredients. \n\nLinks: Discover more about Szechuan cuisine with this [Szechuan Cooking Tutorial](https://example.com/szechuan-cooking-tutorial). \n\nGuidance: Adjust the level of spice by increasing or decreasing the amount of chili paste in the sauce.",
    email: "szechuan@example.com",
    ingredients: ["Beef", "Bell peppers", "Broccoli", "Szechuan sauce"],
    category: "Chinese",
    image: "stirfry.jpg",
  },
  {
    name: "Cheesy Enchiladas",
    description:
      "Cheesy Enchiladas are a delightful Mexican dish with a touch of spice. These enchiladas are made by rolling shredded chicken and cheese in corn tortillas, smothering them with rich enchilada sauce, and baking until bubbly. \n\nCooking Process: Start by filling corn tortillas with a mixture of shredded chicken and cheese, then roll them tightly. Place them in a baking dish, cover with enchilada sauce, and bake until the cheese melts and the sauce is bubbly. \n\nResources: You can find corn tortillas and enchilada sauce at most grocery stores. \n\nLinks: Follow this [Enchilada Cooking Video](https://example.com/enchilada-cooking-video) for a visual guide. \n\nGuidance: Customize the filling with beans or vegetables for a vegetarian option.",
    email: "enchiladas@example.com",
    ingredients: ["Corn tortillas", "Chicken", "Cheese", "Enchilada sauce"],
    category: "Mexican",
    image: "enchiladas.jpg",
  },
  {
    name: "Spanish Paella Feast",
    description:
      "The Spanish Paella Feast is a festive dish loaded with seafood and saffron-infused rice. This iconic Spanish paella is known for its rich flavors and vibrant colors. \n\nCooking Process: Sauté rice, shrimp, mussels, and bell peppers in a large pan, then simmer with saffron-infused broth until the rice is cooked and the seafood is tender. \n\nResources: Visit a specialty store for saffron and fresh seafood ingredients. \n\nLinks: Dive into the world of paella with this [Paella Making Tutorial](https://example.com/paella-making-tutorial). \n\nGuidance: Use a paella pan for the best results and a traditional Spanish touch.",
    email: "paella@example.com",
    ingredients: ["Rice", "Shrimp", "Mussels", "Saffron", "Bell peppers"],
    category: "Spanish",
    image: "paella.jpg",
  },
  {
    name: "Tom Yum Soup",
    description:
      "Tom Yum Soup is a tangy and flavorful Thai soup with a mix of herbs and spices. This soup is known for its vibrant taste and aromatic ingredients. \n\nCooking Process: Boil shrimp, mushrooms, lemongrass, and chili in a fragrant broth, then finish with a squeeze of lime for a zesty kick. \n\nResources: Lemongrass and Thai chili can be found at Asian grocery stores. \n\nLinks: Explore the art of Thai cooking with this [Tom Yum Soup Recipe](https://example.com/tom-yum-soup-recipe). \n\nGuidance: Adjust the level of spiciness by adding more or less chili according to your taste.",
    email: "tomyum@example.com",
    ingredients: ["Shrimp", "Mushrooms", "Lemongrass", "Chili", "Lime"],
    category: "Thai",
    image: "tomyum.jpg",
  },
  {
    name: "BBQ Ribs Extravaganza",
    description:
      "BBQ Ribs Extravaganza features fall-off-the-bone ribs coated in a smoky and sweet sauce. This dish is a BBQ lover's dream, perfect for gatherings and feasts. \n\nCooking Process: Slow-cook pork ribs until tender, then grill and baste them with a delectable BBQ sauce. Serve with coleslaw and cornbread for a true BBQ experience. \n\nResources: Look for high-quality pork ribs and BBQ sauce at your local butcher or specialty store. \n\nLinks: Master the art of BBQ with this [Ribs Grilling Guide](https://example.com/ribs-grilling-guide). \n\nGuidance: Experiment with different BBQ sauce flavors for a unique twist on this classic dish.",
    email: "bbqribs@example.com",
    ingredients: ["Pork ribs", "BBQ sauce", "Coleslaw", "Cornbread"],
    category: "American",
    image: "bbqribs.jpg",
  },
];
async function insertRecipesData() {
  try {
    await recipeModel.insertMany(recipes);
    console.log("category inserted");
  } catch (error) {
    throw new Error(error.message);
  }
}
*/
