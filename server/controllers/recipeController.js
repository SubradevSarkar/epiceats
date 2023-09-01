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
    const latestRecipes = await recipeModel
      .find({})
      .sort({ _id: -1 })
      .limit(categoryLimit);

    const indianRecipes = await recipeModel.find({ category: "Indian" });

    const americanRecipes = await recipeModel.find({ category: "American" });

    const thaiRecipes = await recipeModel.find({ category: "Thai" });

    const food = { latestRecipes, indianRecipes, thaiRecipes, americanRecipes };

    res.render("index", { title: "epiceats - Home", categories, food });
  } catch (error) {
    throw new Error(error.message);
  }
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
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /categories/:id
 * Categories
 */
exports.exploreCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryLimit = 20;
    const category = await recipeModel
      .find({ category: categoryId })
      .limit(categoryLimit);

    res.render("categories", {
      title: `epiceats - ${categoryId}`,
      categoryId,
      category,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /recipe/:id
 * recipe
 */
exports.recipePage = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeModel.findById(recipeId);

    res.render("recipe", { title: "epiceats - Recipe", recipe });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /explore-latest
 * explore Latest Category
 */
exports.exploreCategoryLatest = async (req, res) => {
  try {
    const recipeLimit = 20;
    const recipes = await recipeModel
      .find({})
      .sort({ _id: -1 })
      .limit(recipeLimit);

    res.render("exploreLatest", {
      title: "epiceats - Explore latest",
      recipes,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Post /search
 * searchRecipes
 */
exports.searchRecipes = async (req, res) => {
  try {
    const searchContext = req.body.searchTerm;
    const recipes = await recipeModel.find({
      $text: { $search: searchContext, $diacriticSensitive: true },
    });

    res.render("search", { title: "epiceats - Search", recipes });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Post /submit-recipe
 * submitRecipe
 */
exports.submitRecipe = async (req, res) => {
  try {
    res.render("submitRecipe", { title: "epiceats - Submit recipe" });
  } catch (error) {
    throw new Error(error.message);
  }
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
/** 
const recipes = [
  {
    name: "Savory Chicken Delight",
    description:
      "Indulge in the rich flavors of Savory Chicken Delight, a classic dish that combines tender chicken, aromatic herbs, and a touch of garlic. Perfect for a hearty meal with loved ones.",
    email: "chicken.delight@example.com",
    ingredients: [
      "Chicken breast",
      "Rosemary",
      "Thyme",
      "Garlic",
      "Olive oil",
      "Salt",
      "Pepper",
    ],
    category: "American",
    image: "chicken_delight.jpg",
  },
  {
    name: "Classic American Burger",
    description:
      "Sink your teeth into the Classic American Burger, a timeless favorite featuring a juicy beef patty, melted cheese, crisp lettuce, and tangy ketchup. A satisfying delight for all ages.",
    email: "burger@example.com",
    ingredients: [
      "Beef patty",
      "Cheddar cheese",
      "Lettuce",
      "Tomato",
      "Ketchup",
      "Burger bun",
      "Onion rings",
    ],
    category: "American",
    image: "classic_burger.jpg",
  },
  {
    name: "American BBQ Ribs",
    description:
      "Savor the finger-licking goodness of American BBQ Ribs, slow-cooked to perfection and smothered in a smoky-sweet sauce. A crowd-pleasing dish for gatherings and celebrations.",
    email: "bbq.ribs@example.com",
    ingredients: [
      "Pork ribs",
      "BBQ sauce",
      "Brown sugar",
      "Paprika",
      "Garlic powder",
      "Onion powder",
      "Cayenne pepper",
    ],
    category: "American",
    image: "american_bbq_ribs.jpg",
  },
  {
    name: "Thai Green Curry Bliss",
    description:
      "Experience the culinary magic of Thai Green Curry Bliss, a fragrant dish that brings together succulent prawns, vibrant vegetables, and a luscious coconut milk base.",
    email: "green.curry.bliss@example.com",
    ingredients: [
      "Prawns",
      "Coconut milk",
      "Thai green curry paste",
      "Bell peppers",
      "Zucchini",
      "Basil leaves",
      "Jasmine rice",
    ],
    category: "Thai",
    image: "green_curry_bliss.jpg",
  },
  {
    name: "Pad Thai Sensation",
    description:
      "Indulge in the iconic flavors of Pad Thai Sensation, a delectable Thai street food dish featuring stir-fried rice noodles, succulent shrimp, tofu, and crushed peanuts.",
    email: "pad.thai@example.com",
    ingredients: [
      "Rice noodles",
      "Shrimp",
      "Tofu",
      "Eggs",
      "Bean sprouts",
      "Tamarind sauce",
      "Lime wedges",
    ],
    category: "Thai",
    image: "pad_thai_sensation.jpg",
  },
  {
    name: "Thai Mango Sticky Rice",
    description:
      "Satisfy your sweet cravings with Thai Mango Sticky Rice, a delightful dessert featuring glutinous rice, ripe mango slices, and a drizzle of sweet coconut sauce.",
    email: "mango.sticky.rice@example.com",
    ingredients: [
      "Glutinous rice",
      "Ripe mango",
      "Coconut milk",
      "Sugar",
      "Salt",
      "Sesame seeds",
      "Coconut flakes",
    ],
    category: "Thai",
    image: "thai_mango_sticky_rice.jpg",
  },
  {
    name: "Sizzling Szechuan Stir-Fry",
    description:
      "Ignite your taste buds with the Sizzling Szechuan Stir-Fry, a fiery Chinese dish featuring tender beef, colorful bell peppers, and a bold Szechuan sauce.",
    email: "szechuan.stirfry@example.com",
    ingredients: [
      "Beef sirloin",
      "Bell peppers",
      "Broccoli florets",
      "Szechuan sauce",
      "Soy sauce",
      "Garlic",
      "Ginger",
    ],
    category: "Chinese",
    image: "szechuan_stirfry.jpg",
  },
  {
    name: "Chinese Dumplings (Jiaozi)",
    description:
      "Delight in the taste of Chinese Dumplings (Jiaozi), handmade parcels filled with a flavorful mixture of pork, vegetables, and spices, steamed to perfection.",
    email: "chinese.dumplings@example.com",
    ingredients: [
      "Ground pork",
      "Napa cabbage",
      "Ginger",
      "Green onions",
      "Soy sauce",
      "Sesame oil",
      "Dumpling wrappers",
    ],
    category: "Chinese",
    image: "chinese_dumplings.jpg",
  },
  {
    name: "Mexican Street Tacos",
    description:
      "Embark on a flavorful journey with Mexican Street Tacos, small soft corn tortillas filled with seasoned meats, fresh salsa, and a burst of lime. A fiesta of taste in every bite.",
    email: "mexican.tacos@example.com",
    ingredients: [
      "Marinated beef",
      "Corn tortillas",
      "Onions",
      "Cilantro",
      "Salsa",
      "Lime wedges",
      "Avocado",
    ],
    category: "Mexican",
    image: "mexican_street_tacos.jpg",
  },
  {
    name: "Authentic Mexican Guacamole",
    description:
      "Dive into the rich and creamy goodness of Authentic Mexican Guacamole, a vibrant dip made from ripe avocados, diced tomatoes, onions, and a hint of lime.",
    email: "mexican.guacamole@example.com",
    ingredients: [
      "Ripe avocados",
      "Tomatoes",
      "Onion",
      "Lime juice",
      "Cilantro",
      "Jalapeño",
      "Garlic",
    ],
    category: "Mexican",
    image: "mexican_guacamole.jpg",
  },
  {
    name: "Spanish Paella Fiesta",
    description:
      "Celebrate with the Spanish Paella Fiesta, a vibrant dish showcasing saffron-infused rice, succulent shrimp, and a medley of seafood and vegetables.",
    email: "paella@example.com",
    ingredients: [
      "Arborio rice",
      "Shrimp",
      "Mussels",
      "Chicken drumsticks",
      "Bell peppers",
      "Saffron threads",
      "Peas",
    ],
    category: "Spanish",
    image: "spanish_paella.jpg",
  },
  {
    name: "Spanish Tapas Platter",
    description:
      "Transport your taste buds to Spain with the Spanish Tapas Platter, a delightful assortment of small dishes, including chorizo, olives, and grilled vegetables. Perfect for sharing.",
    email: "spanish.tapas@example.com",
    ingredients: [
      "Chorizo",
      "Manchego cheese",
      "Green olives",
      "Red peppers",
      "Artichoke hearts",
      "Garlic",
      "Olive oil",
    ],
    category: "Spanish",
    image: "spanish_tapas_platter.jpg",
  },
  {
    name: "Aromatic Indian Biryani",
    description:
      "Delight in the Aromatic Indian Biryani, a fragrant rice dish featuring tender lamb, fragrant spices, and caramelized onions. A true culinary journey to India.",
    email: "indian.biryani@example.com",
    ingredients: [
      "Lamb shoulder",
      "Basmati rice",
      "Onions",
      "Yogurt",
      "Garam masala",
      "Saffron milk",
      "Cashews",
    ],
    category: "Indian",
    image: "indian_biryani.jpg",
  },
  {
    name: "Indian Butter Chicken",
    description:
      "Experience the creamy delight of Indian Butter Chicken, succulent pieces of chicken simmered in a rich tomato and butter sauce, with a touch of aromatic spices.",
    email: "indian.butter.chicken@example.com",
    ingredients: [
      "Chicken thighs",
      "Tomato puree",
      "Butter",
      "Cream",
      "Ginger",
      "Garlic",
      "Kasuri methi",
    ],
    category: "Indian",
    image: "indian_butter_chicken.jpg",
  },
];
const recipes1 = [
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
