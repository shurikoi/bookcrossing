import { publicationData } from "@/components/authorized/PublicationMenu";

export interface errors {
    title: boolean;
    author: boolean;
    state: boolean;
    language: boolean;
    category: boolean;
    messengerDescription: boolean;
    hasErrors: boolean;
}

export default function isPublicationDataValid(publicationData: publicationData) {
    const { title, author, category, state, language, messengerDescription } = publicationData;

    const errors: errors = {
        title: false,
        author: false,
        state: false,
        language: false,
        category: false,
        messengerDescription: false,
        hasErrors: false,
    };

    if (title.trim().length < 2 || title.trim().length > 55) errors.title = true;
    if (author.trim().length < 2 || author.trim().length > 55) errors.author = true;
    if (category.trim().length == 0) errors.category = true;
    if (language.trim().length == 0) errors.language = true;
    if (state.trim().length == 0) errors.state = true;
    if (messengerDescription.trim().length < 2 || messengerDescription.trim().length > 55)
        errors.messengerDescription = true;
    // if (description.trim().length == 0) errors.description = true;

    // if (!image || !image.size || image.size / (1024 * 1024) > 10 || !["image/png", "image/jpeg"].includes(image.type))
    //     errors.image = true;

    if (Object.values(errors).includes(true)) errors.hasErrors = true;

    return errors;
}
