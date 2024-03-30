const {Schema, model} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280

    },
    username: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now,
        get:function(val){
            return val.toLocalString();
        }
        
    }
},{_id:false})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get:function(val){
            return val.toLocalString();
        }

    },
    username:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    reactions: [reactionSchema]
},{
    toJSON: {
        virtuals: true,
    }
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
    
})

/* reactionSchema.virtual('reactionId').get(function () {
    return this._id;
}) */

const Thought = model('thought', thoughtSchema);

module.exports = Thought;