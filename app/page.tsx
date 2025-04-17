"use client"
import { useState } from "react"
import type React from "react"

import Head from "next/head"
import dynamic from "next/dynamic"

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

export default function Home() {
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
  const [expandedRecipe, setExpandedRecipe] = useState<Recipe | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<Recipe[]>([])

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

  const RecipeCard = ({
    recipe,
    expanded = false,
    onClose,
  }: {
    recipe: Recipe
    expanded?: boolean
    onClose?: () => void
  }) => {
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
        {expanded && (
          <div style={styles.expandedContent}>
            <p style={styles.macros}>
              <strong>Macros:</strong> {recipe.macros}
            </p>

            {recipe.allergens.length > 0 && (
              <div style={styles.allergenInfo}>
                <h3>Contains:</h3>
                <div style={styles.allergenList}>
                  {recipe.allergens.map((allergen, index) => (
                    <span key={index} style={styles.allergenBadge}>
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.recipeSection}>
              <h3>Ingredients:</h3>
              <ul style={styles.list}>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div style={styles.recipeSection}>
              <h3>Instructions:</h3>
              <ol style={styles.list}>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div style={styles.currentFiltersSection}>
              <h3>Current Filters:</h3>
              <div style={styles.currentFilters}>
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

            <div style={styles.modalButtonsContainer}>
              <button onClick={() => (onClose ? onClose() : setExpandedRecipe(null))} style={styles.recipeButton}>
                Close Recipe
              </button>
            </div>
          </div>
        )}
        {!expanded && (
          <button onClick={() => openRecipeModal(recipe)} style={styles.recipeButton}>
            See Recipe
          </button>
        )}
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

  return (
    <>
      <Head>
        <title>Recipe Spin Wheel</title>
      </Head>
      <main style={styles.container}>
        <div style={styles.appLayout}>
          <div style={styles.sidebar}>
            <h2 style={styles.sidebarTitle}>Favorite Recipes</h2>
            {favorites.length === 0 ? (
              <p style={styles.emptyMessage}>No favorites yet. Click the heart icon on recipes to add them here!</p>
            ) : (
              <div style={styles.favoritesList}>
                {favorites.map((recipe, index) => (
                  <div key={index} style={styles.favoriteItem} onClick={() => openRecipeModal(recipe)}>
                    <span>{recipe.name}</span>
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
          <div style={styles.mainContent}>
            <h1 style={styles.title}>🎡 Recipe Spin Wheel</h1>

            <div style={styles.filters}>
              <label>
                Max Prep Time (mins):
                <input
                  type="number"
                  value={filters.maxPrepTime}
                  onChange={(e) => setFilters({ ...filters, maxPrepTime: Number(e.target.value) })}
                  style={styles.input}
                />
              </label>
              <label>
                Max Calories:
                <input
                  type="number"
                  value={filters.maxCalories}
                  onChange={(e) => setFilters({ ...filters, maxCalories: Number(e.target.value) })}
                  style={styles.input}
                />
              </label>
              <label>
                Allergies (comma-separated):
                <input
                  type="text"
                  value={filters.allergies}
                  onChange={(e) => setFilters({ ...filters, allergies: e.target.value })}
                  placeholder="e.g. dairy, peanuts"
                  style={styles.input}
                />
              </label>
              <div style={styles.allergenTags}>
                {commonAllergens.map((allergen) => {
                  const isSelected = filters.allergies
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean)
                    .includes(allergen)

                  return (
                    <button
                      key={allergen}
                      onClick={() => {
                        const currentAllergies = filters.allergies
                          .split(",")
                          .map((a) => a.trim())
                          .filter(Boolean)

                        // Toggle the allergen
                        const newAllergies = isSelected
                          ? currentAllergies.filter((a) => a !== allergen)
                          : [...currentAllergies, allergen]

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
              <div style={styles.dietaryPreferences}>
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
                Enable Wheel
              </label>
            </div>

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
                        <p>Click to see full recipe details!</p>
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
              <p style={{ marginTop: "1rem" }}>⚠️ No recipes match your filters.</p>
            )}

            {isModalOpen && selectedRecipe && (
              <RecipeModal recipe={selectedRecipe} onClose={() => setIsModalOpen(false)} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "sans-serif",
    backgroundColor: "#f0f4f8",
    padding: "0.75rem",
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
  },
  appLayout: {
    display: "flex",
    gap: "0.75rem",
    height: "calc(100vh - 1.5rem)",
    overflow: "hidden",
  },
  title: {
    fontSize: "1.5rem",
    color: "#1e3a8a",
    marginBottom: "0.25rem",
    textAlign: "center",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    maxWidth: "100%",
    margin: "0 auto 0.5rem auto",
    textAlign: "left",
  },
  input: {
    padding: "0.3rem",
    marginTop: "0.1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    height: "30px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    textAlign: "left",
    height: "100%",
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
    marginBottom: "0.5rem",
    flex: 1,
  },
  truncatedDescription: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
  },
  basicInfo: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "0.5rem",
    color: "#4b5563",
    fontSize: "0.75rem",
  },
  dietaryTagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem",
    marginBottom: "0.75rem",
  },
  dietaryTag: {
    padding: "0.15rem 0.3rem",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "0.25rem",
    fontSize: "0.65rem",
    fontWeight: 500,
  },
  expandedContent: {
    marginTop: "1rem",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "1rem",
    position: "relative",
  },
  macros: {
    marginBottom: "0.75rem",
    color: "#4b5563",
    fontSize: "0.875rem",
  },
  recipeSection: {
    marginTop: "0.75rem",
  },
  list: {
    paddingLeft: "1.25rem",
    marginTop: "0.25rem",
    fontSize: "0.875rem",
  },
  wheelContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.25rem",
    maxHeight: "calc(100vh - 300px)",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    marginTop: "0.3rem",
  },
  checkbox: {
    width: "16px",
    height: "16px",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    maxHeight: "calc(100vh - 300px)",
    overflow: "auto",
    padding: "0.5rem",
  },
  wheelSection: {
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  recipesSection: {
    marginTop: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#1e3a8a",
    marginBottom: "1rem",
    textAlign: "center",
  },
  selectedTitle: {
    fontSize: "1.2rem",
    color: "#1e3a8a",
    marginBottom: "0.5rem",
  },
  selectedRecipe: {
    maxWidth: "400px",
    margin: "1rem auto",
  },
  recipeButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "auto",
    transition: "background-color 0.2s",
  },
  selectedRecipePreview: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "300px",
    textAlign: "center",
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
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    width: "600px",
    zIndex: 1001,
  },
  recipeModalContent: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    width: "600px",
    padding: "1.5rem",
    zIndex: 1001,
  },
  recipeModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  recipeModalTitle: {
    fontSize: "2rem",
    color: "#1e3a8a",
    margin: 0,
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#4b5563",
  },
  recipeBasicInfo: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    color: "#4b5563",
  },
  recipeInfoItem: {
    fontSize: "1rem",
  },
  recipeDietaryTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  recipeDietaryTag: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "0.25rem",
    fontSize: "0.9rem",
  },
  recipeDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    width: "100%",
    margin: "1rem 0",
  },
  recipeSectionTitle: {
    fontSize: "1.2rem",
    color: "#1e3a8a",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  recipeAllergenList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  recipeAllergenBadge: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "0.25rem",
    fontSize: "0.9rem",
  },
  recipeList: {
    paddingLeft: "1.5rem",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  recipeListItem: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  recipeFiltersSection: {
    backgroundColor: "#f8fafc",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginTop: "1rem",
    marginBottom: "1.5rem",
    border: "1px solid #e2e8f0",
  },
  recipeFilters: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  closeRecipeButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "1rem",
    alignSelf: "flex-end",
    display: "block",
    marginLeft: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "0.5rem",
  },
  modalTitle: {
    fontSize: "1.8rem",
    color: "#1e3a8a",
    margin: 0,
  },
  modalActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  modalFavoriteButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    backgroundColor: "#f3f4f6",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#4b5563",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    zIndex: 1002,
    padding: 0,
  },
  allergenTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    marginTop: "0.3rem",
  },
  allergenTag: {
    padding: "0.15rem 0.3rem",
    backgroundColor: "#e0e7ff",
    color: "#1e3a8a",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.7rem",
  },
  allergenInfo: {
    marginBottom: "1rem",
  },
  allergenList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  allergenBadge: {
    padding: "0.2rem 0.5rem",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "4px",
    fontSize: "0.8rem",
  },
  filterSectionTitle: {
    fontSize: "0.9rem",
    marginBottom: "0.3rem",
    color: "#1e3a8a",
  },
  dietaryPreferences: {
    marginTop: "0.3rem",
  },
  preferencesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  preferenceLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    cursor: "pointer",
    padding: "0.15rem 0.3rem",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    fontSize: "0.7rem",
  },
  preferenceCheckbox: {
    width: "16px",
    height: "16px",
  },
  currentFiltersSection: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  currentFilters: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  sidebar: {
    width: "180px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "0.75rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarTitle: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "0.75rem",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "0.5rem",
    textAlign: "center",
  },
  mainContent: {
    flex: 1,
    overflow: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    maxHeight: "calc(100vh - 1.5rem)",
  },
  favoritesList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flex: 1,
    overflow: "auto",
  },
  favoriteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    border: "1px solid #e5e7eb",
    fontSize: "0.8rem",
  },
  removeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "0.8rem",
    padding: "0.2rem 0.4rem",
    borderRadius: "4px",
  },
  emptyMessage: {
    color: "#6b7280",
    fontSize: "0.9rem",
    fontStyle: "italic",
    textAlign: "center",
    padding: "1rem 0",
  },
  favoriteIcon: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0",
    marginLeft: "0.5rem",
    lineHeight: 1,
  },
  favoriteIconLarge: {
    background: "transparent",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    padding: "0",
    lineHeight: 1,
  },
  modalButtonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1.5rem",
    gap: "1rem",
  },
}
