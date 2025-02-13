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
     },

     getAll (filter = {}){
         let query = Recipe.find({});
 
         if (filter.title){
             query = query.find({title: filter.title});
         }

         return query;
     },
     getOne(recipeId) {
         const query = Recipe.findById(recipeId);

         return query;
     },

     async recommend(recipeId, ownerId){
         const recipe = await Recipe.findById(recipeId);
        
         if (recipe.owner?.equals(ownerId)){
            throw new Error ("You can't recommend your own recipes")
         }
         if (recipe.recommendList.includes(ownerId)){
            throw new Error ("You've already recommended this recipe")
         }

         recipe.recommendList.push(ownerId);                  
         
         return recipe.save();
     },

     async remove (recipeId){
         return Recipe.findByIdAndDelete(recipeId);
     },

      async update (recipeData, recipeId){
         return Recipe.findByIdAndUpdate(recipeId, recipeData);
     }
}