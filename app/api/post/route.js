
import HiveClient from "@/lib/hive-client"
import { NextResponse } from "next/server";

export async function GET() {

    const client = HiveClient

        const result = await client.database.getDiscussions('trending', {
            tag: 'vihaan', // You can specify tags here if needed
            limit: 100, // Limit the number of posts to fetch per page
          })

            let userImages = {};
        
            result.forEach(post => {
                const author = post.author;
                const permalink = post.permlink;
        
                // Initialize user object if it doesn't exist
                if (!userImages[author]) {
                    userImages[author] = {
                        username: author,
                        permalink:permalink,
                        images: []
                    };
                }
    
                // Extracting image URLs from the body
                const bodyImages = post.body.match(/!\[.*?\]\((.*?)\)/g);
        
                if (bodyImages) {
                    bodyImages.forEach(image => {
                        // Extracting the URL from the markdown syntax
                        const imageURL = image.match(/\((.*?)\)/)[1];
                        // Check if the URL ends with .jpg or .png q
                        if (imageURL.toLowerCase().endsWith('.jpg') 
                        || imageURL.toLowerCase().endsWith('.png')
                        || imageURL.toLowerCase().endsWith('.webp')
                        || imageURL.toLowerCase().endsWith('.jpeg')
                    ) {
                            userImages[author].images.push(imageURL);
                        }
                    });
                }
            });
        
            // Convert object to array of user objects
           const userImagesArray = Object.values(userImages);
           
           const removeObjectsWithoutImages = (data) => {
            return data.filter(item => item.images.length > 0);
          };
          
          // Call the function to remove objects without images
          const filteredData = removeObjectsWithoutImages(userImagesArray);

            return NextResponse.json(filteredData)

}