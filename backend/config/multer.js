import cloudinary from "./cloudinary.js"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "auth-app/avatars",
        allowed_formats: ["jpg","jpeg","png","webp"],
        transformation: [{ width: 300, height: 300, crop: "fill" }],
    },
})

const upload = multer({storage})


export default upload