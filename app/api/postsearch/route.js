
import HiveClient from "@/lib/hive-client"
import { DiscussionQueryCategory } from "@hiveio/dhive";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request) {
    const client = HiveClient

    // const filter = params.filter;
    // const tag = params.tag;

    const filter = request.nextUrl.searchParams.get("filter");
    const tag = request.nextUrl.searchParams.get("tag");

    // console.log(params)
    console.log(tag)


    const options = {
        limit: 100,
        ...(tag && { tag: tag }),
      }

      const result = await client.database.getDiscussions(
        filter ,
        options
      )
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
          const filteredData1 = removeObjectsWithoutImages(userImagesArray);

          function filterUniqueImages(filteredData1) {
            // Create an empty object to store unique usernames
            const uniqueUsernames = {};
          
            // Filter the data array
            const filteredData = filteredData1.filter(item => {
              // Check if the username already exists in the uniqueUsernames object
              if (!uniqueUsernames[item.username]) {
                // If not, add the username to the object and keep the item
                uniqueUsernames[item.username] = true;
                return true;
              }
              return false;
            });
          
            // Iterate through the filtered data to keep only one image per user
            const finalData = filteredData.map(item => {
              // Clone the item object to avoid mutating the original data
              const newItem = { ...item };
              // Keep only the first image from the images array
              newItem.images = [newItem.images[0]];
              return newItem;
            });
          
            return finalData;
          }
          
          // Usage example
          const filteredData = filterUniqueImages(filteredData1)

            return NextResponse.json(filteredData)

}