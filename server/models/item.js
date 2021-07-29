import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    price: Number,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Item = mongoose.model('Item', itemSchema);

export default Item;