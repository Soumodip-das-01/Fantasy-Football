import mongoose from "mongoose";

const teamSchema = await mongoose.Schema({
    teamName:{
        type: String,
        required: true,
        unique: true,
    },
    purse:{
        type: Number,
        required: true, 
    },

    players:[
        {
            playerId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "FootballPlayer",
            },
            name: String,
            position:{
                type: String,
                enum: ["ATTACKER","MIDFIELDER","DEFENDER","GOALKEEPER"]
            },
            price: Number,
            rating: Number,
        },
    ],

    teamRating:{
        type: Number,
        default:0
    },
    locked:{
        type: Boolean,
        default: false
    },
},
    {timestamps: true}
)

export default mongoose.model("Team", teamSchema)