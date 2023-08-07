import { publicationData } from "@/components/PublicationForm";

export default function isDataValid(data: publicationData) {
    const { title, author, category, image, description } = data;

    const errors = {
        title: false,
        author: false,
        image: false,
        category: false,
        description: false,
        hasErrors: false,
    };

    if (title.length == 0 || title.length > 55) errors.title = true;
    if (author.length == 0 || author.length > 55) errors.author = true;
    if (description.length == 0) errors.description = true;
    if (!image.size || (image.size / (1024 * 1024)) > 10) errors.image = true;
    if (category.trim() == "") errors.category = true;

    Object.values(errors).forEach((error) => {
        if (error) {
            errors.hasErrors = true;
        }
    })
    
    return errors;
}