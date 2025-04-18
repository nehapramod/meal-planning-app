"use client"
import { useState } from "react"
import type React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { Home, Heart } from "lucide-react"

const SpinWheelClient = dynamic(() => import("./components/SpinWheelClient"), {
  ssr: false,
})

interface Recipe {
  name: string
  prepTime: number
  calories: number
  macros: string
  description: string
  ingredients: string[]
  instructions: string[]
  allergens: string[]
  dietaryInfo: {
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
    dairyFree: boolean
    lowCarb: boolean
  }
}

const allRecipes: Recipe[] = [
  {
    name: "Spaghetti Bolognese",
    prepTime: 25,
    calories: 500,
    macros: "Protein: 30g, Carbs: 60g, Fat: 10g",
    description: "A classic Italian dish with rich meat sauce and pasta.",
    ingredients: [
      "400g spaghetti",
      "500g ground beef",
      "2 cans crushed tomatoes",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Boil spaghetti according to package instructions",
      "Brown meat in a large pan",
      "Add onion and garlic, sauté until soft",
      "Add tomatoes and simmer for 20 minutes",
      "Season to taste",
      "Serve sauce over pasta",
    ],
    allergens: ["gluten", "beef"],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      lowCarb: false,
    },
  },
  {
    name: "Chicken Salad",
    prepTime: 20,
    calories: 300,
    macros: "Protein: 25g, Carbs: 10g, Fat: 15g",
    description: "A light and healthy salad with grilled chicken breast.",
    ingredients: [
      "2 chicken breasts",
      "Mixed salad greens",
      "Cherry tomatoes",
      "Cucumber",
      "Balsamic vinaigrette",
      "Salt and pepper",
    ],
    instructions: [
      "Grill chicken until cooked through",
      "Slice chicken into strips",
      "Mix salad ingredients in a bowl",
      "Top with chicken",
      "Drizzle with vinaigrette",
    ],
    allergens: ["chicken"],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true,
      lowCarb: true,
    },
  },
  {
    name: "Vegetable Stir Fry",
    prepTime: 15,
    calories: 400,
    macros: "Protein: 15g, Carbs: 50g, Fat: 12g",
    description: "Quick and healthy vegetable stir fry with rice.",
    ingredients: ["Mixed vegetables", "Tofu cubes", "Soy sauce", "Ginger", "Garlic", "Cooked rice"],
    instructions: [
      "Cut vegetables into bite-sized pieces",
      "Heat oil in wok",
      "Stir-fry vegetables until crisp-tender",
      "Add sauce and seasonings",
      "Serve over rice",
    ],
    allergens: ["soy", "tofu"],
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      lowCarb: false,
    },
  },
  {
    name: "Tofu Curry",
    prepTime: 30,
    calories: 450,
    macros: "Protein: 20g, Carbs: 35g, Fat: 18g",
    description: "Creamy coconut curry with tofu and vegetables.",
    ingredients: ["Firm tofu", "Coconut milk", "Curry powder", "Mixed vegetables", "Onion", "Rice"],
    instructions: [
      "Press and cube tofu",
      "Sauté onions and spices",
      "Add coconut milk and simmer",
      "Add tofu and vegetables",
      "Cook until vegetables are tender",
      "Serve with rice",
    ],
    allergens: ["soy", "tofu"],
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      lowCarb: false,
    },
  },
  {
    name: "Quinoa Buddha Bowl",
    prepTime: 25,
    calories: 420,
    macros: "Protein: 15g, Carbs: 65g, Fat: 14g",
    description: "A nourishing bowl packed with quinoa, roasted vegetables, and tahini dressing.",
    ingredients: [
      "1 cup quinoa",
      "Sweet potato",
      "Chickpeas",
      "Kale",
      "Avocado",
      "Tahini",
      "Lemon juice",
      "Mixed seeds",
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Roast sweet potato and chickpeas",
      "Massage kale with olive oil",
      "Make tahini dressing with lemon juice",
      "Assemble bowl with all ingredients",
      "Top with seeds and dressing",
    ],
    allergens: ["sesame", "nuts"],
    dietaryInfo: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      lowCarb: false,
    },
  },
  {
    name: "Grilled Salmon",
    prepTime: 20,
    calories: 380,
    macros: "Protein: 34g, Carbs: 8g, Fat: 24g",
    description: "Fresh salmon fillet with lemon herb butter and roasted asparagus.",
    ingredients: [
      "Salmon fillet",
      "Butter",
      "Fresh herbs",
      "Lemon",
      "Asparagus",
      "Garlic",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Preheat grill to medium-high",
      "Mix herbs with softened butter",
      "Season salmon with salt and pepper",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus until tender",
      "Top with herb butter and lemon",
    ],
    allergens: ["fish", "dairy"],
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      lowCarb: true,
    },
  },
  {
    name: "Black Bean Tacos",
    prepTime: 15,
    calories: 350,
    macros: "Protein: 12g, Carbs: 45g, Fat: 16g",
    description: "Quick vegetarian tacos with seasoned black beans and fresh toppings.",
    ingredients: [
      "Black beans",
      "Corn tortillas",
      "Avocado",
      "Red onion",
      "Cilantro",
      "Lime",
      "Taco seasoning",
      "Sour cream",
    ],
    instructions: [
      "Heat and season black beans",
      "Warm tortillas",
      "Dice avocado and onion",
      "Chop cilantro",
      "Assemble tacos with all toppings",
      "Serve with lime wedges",
    ],
    allergens: ["dairy"],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      lowCarb: false,
    },
  },
  {
    name: "Mushroom Risotto",
    prepTime: 35,
    calories: 480,
    macros: "Protein: 12g, Carbs: 70g, Fat: 16g",
    description: "Creamy Italian risotto with mixed mushrooms and parmesan.",
    ingredients: [
      "Arborio rice",
      "Mixed mushrooms",
      "Vegetable broth",
      "White wine",
      "Onion",
      "Garlic",
      "Parmesan cheese",
      "Butter",
    ],
    instructions: [
      "Sauté mushrooms until golden",
      "Cook onion and garlic until soft",
      "Add rice and toast lightly",
      "Add wine and let absorb",
      "Gradually add hot broth, stirring",
      "Finish with parmesan and butter",
    ],
    allergens: ["dairy", "alcohol"],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      lowCarb: false,
    },
  },
  {
    name: "Greek Salad",
    prepTime: 15,
    calories: 320,
    macros: "Protein: 8g, Carbs: 18g, Fat: 24g",
    description: "Classic Mediterranean salad with fresh vegetables and feta cheese.",
    ingredients: [
      "Cucumber",
      "Tomatoes",
      "Red onion",
      "Bell pepper",
      "Kalamata olives",
      "Feta cheese",
      "Olive oil",
      "Dried oregano",
    ],
    instructions: [
      "Chop all vegetables into chunks",
      "Slice red onion thinly",
      "Combine vegetables in bowl",
      "Add olives and feta chunks",
      "Dress with olive oil",
      "Sprinkle with oregano",
    ],
    allergens: ["dairy"],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      lowCarb: true,
    },
  },
  {
    name: "Breakfast Smoothie Bowl",
    prepTime: 10,
    calories: 380,
    macros: "Protein: 14g, Carbs: 62g, Fat: 10g",
    description: "Nutritious smoothie bowl topped with fresh fruits and granola.",
    ingredients: [
      "Frozen berries",
      "Banana",
      "Greek yogurt",
      "Almond milk",
      "Honey",
      "Granola",
      "Chia seeds",
      "Fresh fruit for topping",
    ],
    instructions: [
      "Blend frozen berries and banana",
      "Add yogurt and almond milk",
      "Blend until smooth",
      "Pour into bowl",
      "Top with granola and fresh fruit",
      "Drizzle with honey",
    ],
    allergens: ["dairy", "nuts"],
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      lowCarb: false,
    },
  },
]

function RecipeApp() {
  // Change the filters state to remove customAllergy
  const [filters, setFilters] = useState({
    maxPrepTime: 30,
    maxCalories: 600,
    allergies: "",
    dietaryPreferences: [] as string[],
  })
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [wheelEnabled, setWheelEnabled] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [activeTab, setActiveTab] = useState("home")
  const [showFilters, setShowFilters] = useState(false)

  // Update the allergyList to use only the allergies field
  const allergyList = filters.allergies
    .split(",")
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean)

  const filteredRecipes = allRecipes.filter((r) => {
    const matchesTime = r.prepTime <= filters.maxPrepTime
    const matchesCalories = r.calories <= filters.maxCalories

    // Improved allergy filtering
    const hasAllergens = allergyList.some(
      (allergy) =>
        r.allergens.some((allergen) => allergen.toLowerCase().includes(allergy)) ||
        r.ingredients.some((ingredient) => ingredient.toLowerCase().includes(allergy)),
    )

    // Dietary preferences filtering
    const matchesDietaryPreferences =
      filters.dietaryPreferences.length === 0 ||
      filters.dietaryPreferences.every((pref) => {
        switch (pref) {
          case "vegetarian":
            return r.dietaryInfo.vegetarian
          case "vegan":
            return r.dietaryInfo.vegan
          case "gluten-free":
            return r.dietaryInfo.glutenFree
          case "dairy-free":
            return r.dietaryInfo.dairyFree
          case "low-carb":
            return r.dietaryInfo.lowCarb
          default:
            return true
        }
      })

    return matchesTime && matchesCalories && !hasAllergens && matchesDietaryPreferences
  })

  const data = filteredRecipes.map((r) => ({ option: r.name }))

  const handleSpin = () => {
    if (filteredRecipes.length === 0) return
    const index = Math.floor(Math.random() * filteredRecipes.length)
    setPrizeIndex(index)
    setMustSpin(true)
  }

  const getDietaryTags = (recipe: Recipe) => {
    const tags = []
    if (recipe.dietaryInfo.vegetarian) tags.push("Vegetarian")
    if (recipe.dietaryInfo.vegan) tags.push("Vegan")
    if (recipe.dietaryInfo.glutenFree) tags.push("Gluten-Free")
    if (recipe.dietaryInfo.dairyFree) tags.push("Dairy-Free")
    if (recipe.dietaryInfo.lowCarb) tags.push("Low-Carb")
    return tags
  }

  const toggleFavorite = (recipe: Recipe) => {
    if (favorites.some((fav) => fav.name === recipe.name)) {
      setFavorites(favorites.filter((fav) => fav.name !== recipe.name))
    } else {
      setFavorites([...favorites, recipe])
    }
  }

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
  }

  const RecipeModal = ({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) => {
    const isFavorite = favorites.some((fav) => fav.name === recipe.name)

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.recipeModalContent}>
          <div style={styles.recipeModalHeader}>
            <h2 style={styles.recipeModalTitle}>{recipe.name}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(recipe)
              }}
              style={styles.favoriteIconLarge}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <p style={styles.recipeDescription}>{recipe.description}</p>

          <div style={styles.recipeBasicInfo}>
            <span style={styles.recipeInfoItem}>⏱️ {recipe.prepTime} mins</span>
            <span style={styles.recipeInfoItem}>🔥 {recipe.calories} cal</span>
          </div>

          <div style={styles.recipeDietaryTags}>
            {getDietaryTags(recipe).map((tag, index) => (
              <span key={index} style={styles.recipeDietaryTag}>
                {tag}
              </span>
            ))}
          </div>

          <div style={styles.recipeDivider}></div>

          <div style={styles.recipeSection}>
            <h3 style={styles.recipeSectionTitle}>Macros:</h3>
            <p>{recipe.macros}</p>
          </div>

          <div style={styles.recipeSection}>
            <h3 style={styles.recipeSectionTitle}>Contains:</h3>
            <div style={styles.recipeAllergenList}>
              {recipe.allergens.map((allergen, index) => (
                <span key={index} style={styles.recipeAllergenBadge}>
                  {allergen}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.recipeSection}>
            <h3 style={styles.recipeSectionTitle}>Ingredients:</h3>
            <ul style={styles.recipeList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} style={styles.recipeListItem}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.recipeSection}>
            <h3 style={styles.recipeSectionTitle}>Instructions:</h3>
            <ol style={styles.recipeList}>
              {recipe.instructions.map((instruction, index) => (
                <li key={index} style={styles.recipeListItem}>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div style={styles.recipeFiltersSection}>
            <h3 style={styles.recipeSectionTitle}>Current Filters:</h3>
            <div style={styles.recipeFilters}>
              <p>
                <strong>Max Prep Time:</strong> {filters.maxPrepTime} mins
              </p>
              <p>
                <strong>Max Calories:</strong> {filters.maxCalories}
              </p>
              {allergyList.length > 0 && (
                <p>
                  <strong>Allergies:</strong> {allergyList.join(", ")}
                </p>
              )}
              {filters.dietaryPreferences.length > 0 && (
                <p>
                  <strong>Dietary Preferences:</strong>{" "}
                  {filters.dietaryPreferences.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
                </p>
              )}
            </div>
          </div>

          <button onClick={onClose} style={styles.closeRecipeButton}>
            Close Recipe
          </button>
        </div>
      </div>
    )
  }

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const isFavorite = favorites.some((fav) => fav.name === recipe.name)

    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>{recipe.name}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(recipe)
            }}
            style={styles.favoriteIcon}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
        <p style={styles.truncatedDescription}>{recipe.description}</p>
        <div style={styles.basicInfo}>
          <span>⏱️ {recipe.prepTime} mins</span>
          <span>🔥 {recipe.calories} cal</span>
        </div>
        <div style={styles.dietaryTagsContainer}>
          {getDietaryTags(recipe).map((tag, index) => (
            <span key={index} style={styles.dietaryTag}>
              {tag}
            </span>
          ))}
        </div>
        <button onClick={() => openRecipeModal(recipe)} style={styles.recipeButton}>
          See Recipe
        </button>
      </div>
    )
  }

  const commonAllergens = ["dairy", "gluten", "nuts", "peanuts", "soy", "fish", "shellfish", "eggs", "sesame"]
  const dietaryOptions = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten-Free", value: "gluten-free" },
    { label: "Dairy-Free", value: "dairy-free" },
    { label: "Low-Carb", value: "low-carb" },
  ]

  const renderHomeTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.filterToggle}>
        <button onClick={() => setShowFilters(!showFilters)} style={styles.filterToggleButton}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div style={styles.filtersContainer}>
          <div style={styles.filters}>
            <label style={styles.filterLabel}>
              Max Prep Time (mins):
              <input
                type="range"
                min="5"
                max="60"
                value={filters.maxPrepTime}
                onChange={(e) => setFilters({ ...filters, maxPrepTime: Number(e.target.value) })}
                style={styles.rangeInput}
              />
              <span style={styles.rangeValue}>{filters.maxPrepTime} mins</span>
            </label>
            <label style={styles.filterLabel}>
              Max Calories:
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={filters.maxCalories}
                onChange={(e) => setFilters({ ...filters, maxCalories: Number(e.target.value) })}
                style={styles.rangeInput}
              />
              <span style={styles.rangeValue}>{filters.maxCalories} cal</span>
            </label>
            {/* Replace the allergies filter section with this updated version */}
            <div style={styles.filterSection}>
              <h3 style={styles.filterSectionTitle}>Allergies:</h3>
              <div style={styles.allergenTags}>
                {commonAllergens.map((allergen) => {
                  const isSelected = allergyList.includes(allergen)

                  return (
                    <button
                      key={allergen}
                      onClick={() => {
                        const currentAllergies = allergyList

                        // Toggle the allergen
                        let newAllergies
                        if (isSelected) {
                          newAllergies = currentAllergies.filter((a) => a !== allergen)
                        } else {
                          newAllergies = [...currentAllergies, allergen]
                        }

                        setFilters({ ...filters, allergies: newAllergies.join(", ") })
                      }}
                      style={{
                        ...styles.allergenTag,
                        backgroundColor: isSelected ? "#fee2e2" : "#e0e7ff",
                        color: isSelected ? "#b91c1c" : "#1e3a8a",
                      }}
                    >
                      {allergen}
                    </button>
                  )
                })}
              </div>
              <div style={styles.customAllergyInput}>
                <label style={styles.customAllergyLabel}>
                  Allergies (comma separated):
                  <input
                    type="text"
                    value={filters.allergies}
                    onChange={(e) => setFilters({ ...filters, allergies: e.target.value })}
                    placeholder="e.g., dairy, gluten, shrimp, etc."
                    style={styles.textInput}
                  />
                </label>
              </div>
            </div>
            <div style={styles.filterSection}>
              <h3 style={styles.filterSectionTitle}>Dietary Preferences:</h3>
              <div style={styles.preferencesContainer}>
                {dietaryOptions.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      ...styles.preferenceLabel,
                      backgroundColor: filters.dietaryPreferences.includes(option.value) ? "#dbeafe" : "#f3f4f6",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.dietaryPreferences.includes(option.value)}
                      onChange={(e) => {
                        const newPreferences = e.target.checked
                          ? [...filters.dietaryPreferences, option.value]
                          : filters.dietaryPreferences.filter((p) => p !== option.value)
                        setFilters({ ...filters, dietaryPreferences: newPreferences })
                      }}
                      style={styles.preferenceCheckbox}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <label style={styles.toggleContainer}>
              <input
                type="checkbox"
                checked={wheelEnabled}
                onChange={(e) => setWheelEnabled(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.toggleLabel}>Enable Wheel</span>
            </label>
          </div>
        </div>
      )}

      {filteredRecipes.length > 0 ? (
        <>
          {wheelEnabled ? (
            <div style={styles.wheelSection}>
              <div style={styles.wheelContainer}>
                <SpinWheelClient
                  data={data}
                  prizeIndex={prizeIndex}
                  mustSpin={mustSpin}
                  onSpinStart={handleSpin}
                  onSpinEnd={(selectedName) => {
                    setMustSpin(false)
                    const selected = filteredRecipes.find((r) => r.name === selectedName)
                    if (selected) setSelectedRecipe(selected)
                  }}
                />
              </div>

              {selectedRecipe && (
                <div style={styles.selectedRecipePreview} onClick={() => openRecipeModal(selectedRecipe)}>
                  <h2 style={styles.selectedTitle}>🎉 You got: {selectedRecipe.name}</h2>
                  <p>Tap to see full recipe details!</p>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.recipesSection}>
              <h2 style={styles.sectionTitle}>Recipe Collection</h2>
              <div style={styles.recipeGrid}>
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p style={styles.noRecipesMessage}>⚠️ No recipes match your filters.</p>
      )}
    </div>
  )

  const renderFavoritesTab = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.tabTitle}>Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <div style={styles.emptyStateContainer}>
          <p style={styles.emptyMessage}>No favorites yet. Tap the heart icon on recipes to add them here!</p>
          <button onClick={() => setActiveTab("home")} style={styles.emptyStateButton}>
            Find Recipes
          </button>
        </div>
      ) : (
        <div style={styles.favoritesList}>
          {favorites.map((recipe, index) => (
            <div key={index} style={styles.favoriteItem} onClick={() => openRecipeModal(recipe)}>
              <div style={styles.favoriteItemContent}>
                <h3 style={styles.favoriteItemTitle}>{recipe.name}</h3>
                <p style={styles.favoriteItemDescription}>{recipe.description}</p>
                <div style={styles.favoriteItemInfo}>
                  <span>⏱️ {recipe.prepTime} mins</span>
                  <span>🔥 {recipe.calories} cal</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(recipe)
                }}
                style={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      <Head>
        <title>Recipe Spin Wheel</title>
      </Head>
      <div style={styles.mobileContainer}>
        <div style={styles.mobileFrame}>
          <div style={styles.statusBar}>
            <div style={styles.statusBarTime}>9:41</div>
            <div style={styles.statusBarIcons}>
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>

          <div style={styles.appHeader}>
            <h1 style={styles.appTitle}>🎡 Recipe Spin Wheel</h1>
          </div>

          <div style={styles.appContent}>{activeTab === "home" ? renderHomeTab() : renderFavoritesTab()}</div>

          <div style={styles.bottomNav}>
            <button
              style={activeTab === "home" ? styles.bottomNavItemActive : styles.bottomNavItem}
              onClick={() => setActiveTab("home")}
            >
              <Home size={24} />
              <span style={styles.bottomNavText}>Home</span>
            </button>
            <button
              style={activeTab === "favorites" ? styles.bottomNavItemActive : styles.bottomNavItem}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart size={24} />
              <span style={styles.bottomNavText}>Favorites</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default RecipeApp

const styles: { [key: string]: React.CSSProperties } = {
  mobileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "1rem",
  },
  mobileFrame: {
    width: "435px",
    height: "842px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    border: "10px solid #000",
  },
  statusBar: {
    height: "44px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #f0f0f0",
  },
  statusBarTime: {
    fontWeight: "bold",
  },
  statusBarIcons: {
    display: "flex",
    gap: "5px",
  },
  appHeader: {
    padding: "10px 16px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    textAlign: "center",
  },
  appTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  appContent: {
    height: "calc(812px - 44px - 43px - 60px - 20px)",
    overflow: "auto",
    padding: "0",
    backgroundColor: "#f8fafc",
  },
  tabContent: {
    padding: "16px",
    height: "100%",
    overflow: "auto",
  },
  tabTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1e3a8a",
  },
  bottomNav: {
    height: "60px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #f0f0f0",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  bottomNavItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
    width: "50%",
  },
  bottomNavItemActive: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#1e3a8a",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
    width: "50%",
  },
  bottomNavText: {
    fontSize: "0.7rem",
    marginTop: "4px",
  },
  filterToggle: {
    marginBottom: "10px",
  },
  filterToggleButton: {
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "0.9rem",
    cursor: "pointer",
    width: "100%",
  },
  filtersContainer: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  filterLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  rangeInput: {
    width: "100%",
    accentColor: "#1e3a8a",
  },
  rangeValue: {
    fontSize: "0.8rem",
    color: "#1e3a8a",
    fontWeight: "500",
  },
  filterSection: {
    marginTop: "4px",
  },
  filterSectionTitle: {
    fontSize: "0.9rem",
    marginBottom: "8px",
    color: "#4b5563",
  },
  allergenTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  allergenTag: {
    padding: "6px 10px",
    borderRadius: "16px",
    fontSize: "0.8rem",
    border: "none",
    cursor: "pointer",
  },
  customAllergyInput: {
    marginTop: "10px",
  },
  customAllergyLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  textInput: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    marginTop: "4px",
  },
  preferencesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  preferenceLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "16px",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  preferenceCheckbox: {
    width: "16px",
    height: "16px",
    accentColor: "#1e3a8a",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  toggleLabel: {
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#1e3a8a",
  },
  wheelSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
  },
  wheelContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "240px", // Reduced from 280px
    margin: "0 auto",
  },
  selectedRecipePreview: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "12px",
    marginTop: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "90%",
    textAlign: "center",
  },
  selectedTitle: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "8px",
  },
  recipesSection: {
    padding: "10px 0",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "12px",
    textAlign: "center",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    padding: "0 4px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "8px",
    flex: 1,
  },
  truncatedDescription: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    marginBottom: "8px",
    fontSize: "0.9rem",
    color: "#4b5563",
  },
  basicInfo: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
    color: "#4b5563",
    fontSize: "0.8rem",
  },
  dietaryTagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    marginBottom: "12px",
  },
  dietaryTag: {
    padding: "4px 8px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "12px",
    fontSize: "0.7rem",
    fontWeight: "500",
  },
  recipeButton: {
    padding: "10px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "auto",
    fontWeight: "500",
  },
  noRecipesMessage: {
    textAlign: "center",
    padding: "20px",
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    borderRadius: "8px",
    margin: "20px 0",
  },
  favoritesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  favoriteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  favoriteItemContent: {
    flex: 1,
  },
  favoriteItemTitle: {
    fontSize: "1rem",
    color: "#1e3a8a",
    marginBottom: "4px",
  },
  favoriteItemDescription: {
    fontSize: "0.8rem",
    color: "#4b5563",
    marginBottom: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  favoriteItemInfo: {
    display: "flex",
    gap: "12px",
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  removeButton: {
    backgroundColor: "#f3f4f6",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "0.9rem",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyMessage: {
    color: "#6b7280",
    fontSize: "0.9rem",
    marginBottom: "20px",
  },
  emptyStateButton: {
    padding: "10px 20px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  recipeModalContent: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "40px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    width: "430px",
    padding: "20px",
    zIndex: 1001,
  },
  recipeModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  recipeModalTitle: {
    fontSize: "1.5rem",
    color: "#1e3a8a",
    margin: 0,
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: "0.9rem",
    marginBottom: "12px",
    color: "#4b5563",
  },
  recipeBasicInfo: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px",
    color: "#4b5563",
  },
  recipeInfoItem: {
    fontSize: "0.9rem",
  },
  recipeDietaryTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "16px",
  },
  recipeDietaryTag: {
    padding: "4px 10px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "16px",
    fontSize: "0.8rem",
  },
  recipeDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    width: "100%",
    margin: "12px 0",
  },
  recipeSection: {
    marginBottom: "16px",
  },
  recipeSectionTitle: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "8px",
    fontWeight: "600",
  },
  recipeAllergenList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "12px",
  },
  recipeAllergenBadge: {
    padding: "4px 10px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "16px",
    fontSize: "0.8rem",
  },
  recipeList: {
    paddingLeft: "20px",
    marginTop: "8px",
    marginBottom: "12px",
  },
  recipeListItem: {
    marginBottom: "6px",
    fontSize: "0.9rem",
  },
  recipeFiltersSection: {
    backgroundColor: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
    marginTop: "16px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
  },
  recipeFilters: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "0.8rem",
  },
  closeRecipeButton: {
    padding: "12px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    width: "100%",
  },
  favoriteIcon: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0",
    marginLeft: "8px",
    lineHeight: 1,
  },
  favoriteIconLarge: {
    background: "transparent",
    border: "none",
    fontSize: "1.8rem",
    cursor: "pointer",
    padding: "0",
    lineHeight: 1,
  },
}
