import sql from "../configs/db.js";

export const getUserController = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER by created_at DESC`
        res.json({ success: true, creations })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const getPublishedCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        // Try to get published creations, fallback to all images if publish column doesn't exist
        let creations;
        try {
            creations = await sql`SELECT * FROM creations WHERE type = 'image' AND publish = true ORDER BY created_at DESC`
        } catch (publishError) {
            // If publish column doesn't exist, get all image creations
            console.log('Publish column not found, showing all image creations');
            creations = await sql`SELECT * FROM creations WHERE type = 'image' ORDER BY created_at DESC`
        }
        res.json({ success: true, creations })
    } catch (error) {
        console.error('Error in getPublishedCreations:', error);
        res.json({ success: false, message: error.message })
    }
}
export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;
        const [creation] = await sql`SELECT * FROM creations WHERE id= ${id}`
        if (!creation) {
            return res.json({ success: false, message: "creation not found" })
        }
        
        // Handle null or undefined likes array
        const currentLikes = creation.likes || [];
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter((user) => user !== userIdStr);
            message = `Creation Unliked`
        }
        else {
            updatedLikes = [...currentLikes, userIdStr]
            message = `Creation Liked`
        }
        const formattedArray = `{${updatedLikes.join(',')}}`

        await sql`UPDATE creations SET likes =${formattedArray}::text[] WHERE id = ${id}`
        res.json({ success: true, message })
    } catch (error) {
        console.error('Error in toggleLikeCreation:', error);
        res.json({ success: false, message: error.message })
    }
}