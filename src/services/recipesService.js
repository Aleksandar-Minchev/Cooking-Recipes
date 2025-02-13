import Recipe from "../models/Recipe.js";

export default {
     create (recipeData, ownerId) {
        const result = Recipe.create({
            ...recipeData,
            owner: ownerId
        });

        return result;
     },

     getLastThree (){
        return Recipe.find({}).sort({_id: 'desc'}).limit(3);
     }
}