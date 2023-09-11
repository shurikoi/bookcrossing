import { publicationData } from "@/components/authorized/PublicationMenu";

export default function isPublicationDataValid(publicationData: publicationData) {
    const { title, author, category, image, description, messengerDescription } = publicationData;

    const errors = {
        title: false,
        author: false,
        image: false,
        category: false,
        description: false,
        messengerDescription: false,
        hasErrors: false,
    };

    if (title.trim().length < 2 || title.trim().length > 55) errors.title = true;
    if (author.trim().length < 2 || author.trim().length > 55) errors.author = true;
    if (messengerDescription.trim().length < 2 || messengerDescription.trim().length > 55) errors.messengerDescription = true;
    if (description.trim().length == 0) errors.description = true;

    if (!image || !image.size || image.size / (1024 * 1024) > 10 || !["image/png", "image/jpeg"].includes(image.type))
        errors.image = true;

    if (category.trim() == "") errors.category = true;

    if (Object.values(errors).includes(true)) errors.hasErrors = true;

    return errors;
}
