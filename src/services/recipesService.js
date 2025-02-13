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
     }
}