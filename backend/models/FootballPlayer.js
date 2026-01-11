import mongoose from "mongoose";

const footballPlayerSchema = mongoose.Schema({
    name: {type:String, required: true},
    
    position: {
        type: String,
        enum: ["ATTACKER","MIDFIELDER","DEFENDER","GOALKEEPER"],
        required: true
    },
    age: Number,
    goals: Number,
    assists: Number,
    matches: Number,

    rating:{
        type:Number,
        required: true
    },

    basePrice: Number,
    isSold:{
        type: Boolean,
        default: false
    },
    soldPrice: Number,
    soldTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }
})

export default mongoose.model("FootballPlayer", footballPlayerSchema)