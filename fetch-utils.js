const SUPABASE_URL = 'https://noqvuvowvivqmjcdubua.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcXZ1dm93dml2cW1qY2R1YnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQzMDMzMDMsImV4cCI6MTk3OTg3OTMwM30.AcjsKT7-ZYiHk6FVNEMUu3MEjsAN6d43VZK-gUK030w';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}
console.log(getUser());
export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* user profiles */

export async function updateProfile(profile) {
    // > Part A: upsert into profiles table
    return await client.from('profiles').upsert(profile).single();
}

export async function getProfile(id) {
    // > Part B: get profile by id, maybe single row returned
    return await client.from('profiles').select('*').match({ id }).maybeSingle();
}

export async function getProfiles() {
    // > Part D: get all profiles (limit 100)
}

// TODO:
// export async function uploadImage(bucketName, imageName, imageFile) {
//     // we can use the storage bucket to upload the image,
//     // then use it to get the public URL
//     const bucket = client.storage.from(bucketName);

//     const response = await bucket.upload(imageName, imageFile, {
//         cacheControl: '3600',
//         // in this case, we will _replace_ any
//         // existing file with same name.
//         upsert: true,
//     });

//     if (response.error) {
//         // eslint-disable-next-line no-console
//         console.log(response.error);
//         return null;
//     }

//     // bug in supabase makes this return wrong value :(
//     // const url = bucket.getPublicUrl(data.Key);

//     // so we will make it ourselves.
//     // note that we exported the url from `./client.js`
//     const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

//     return url;
// }
