import { publicationData } from "@/components/authorized/PublicationMenu";

export default function isDataValid(data: publicationData) {
    const { title, author, category, image, description, messengerDescription } = data;

    const errors = {
        title: false,
        author: false,
        image: false,
        category: false,
        description: false,
        messengerDescription: false,
        hasErrors: false,
    };

    if (title.length < 2 || title.length > 55) errors.title = true;
    if (author.length < 2 || author.length > 55) errors.author = true;
    if (messengerDescription.length < 2 || messengerDescription.length > 55) errors.messengerDescription = true;
    if (description.length == 0) errors.description = true;

    if (!image || !image.size || image.size / (1024 * 1024) > 10 || !["image/png", "image/jpeg"].includes(image.type))
        errors.image = true;
    
    if (category.trim() == "") errors.category = true;


    Object.values(errors).forEach((error) => {
        if (error) {
            errors.hasErrors = true;
        }
    });

    return errors;
}
