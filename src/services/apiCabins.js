import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}
export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return data;
}
export async function creatEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    // https://rwwrahdstdubttudqayz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}//storage/v1/object/public/cabin-images/${imageName}`;
    // 1.Create cabin
    let query = supabase.from("cabins");
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    if (id) {
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();
    }
    const { data, error } = await query.select().single();
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    // 2. Upload image
    if(hasImagePath)
    return data
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    //3. delete
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error("Cabins image could not be deleted");
    }
    return data;
}
