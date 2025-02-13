import { Schema, model, Types } from "mongoose";

const recipeSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be at least 2 characters long!'],              
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required!'],
        minLength: [10, 'Ingredients should be at least 10 characters long!'],
        maxLength: [200, 'Ingredients should be max 200 characters long!']
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required!'],
        minLength: [10, 'Instructions should be at least 10 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!'],
        maxLength: [100, 'Description should be max 100 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'ImageURL is required!'],
        match: [/^https?:\/\//, 'ImageUrl should start with http://... or https://...!'] 
    },
    recommendList : [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;