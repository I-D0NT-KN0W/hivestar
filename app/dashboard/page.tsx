// ndpoints', ['https://api.hive.blog', 'https://anyx.io']);


// function DashboardPage() {
//     return (
//       <div>DashboardPage</div>
//     )
//   }
  
//   export default DashboardPage

  // import Posts from "@/components/Posts";

 


//   export async function getStaticProps() {
//     // Perform the function hit here
    // await hive.api.getDiscussionsByTrending("", function(err, result) {
    //   function filterImagesByUser(result) {
    //     let userImages = {};
    
    //     data.forEach(post => {
    //         const author = post.author;
    
    //         // Initialize user object if it doesn't exist
    //         if (!userImages[author]) {
    //             userImages[author] = {
    //                 username: author,
    //                 images: []
    //             };
    //         }
    
    //         // Extracting image URLs from the body
    //         const bodyImages = post.body.match(/!\[.*?\]\((.*?)\)/g);
    
    //         if (bodyImages) {
    //             bodyImages.forEach(image => {
    //                 // Extracting the URL from the markdown syntax
    //                 const imageURL = image.match(/\((.*?)\)/)[1];
    //                 // Check if the URL ends with .jpg or .png
    //                 if (imageURL.toLowerCase().endsWith('.jpg') || imageURL.toLowerCase().endsWith('.png')) {
    //                     userImages[author].images.push(imageURL);
    //                 }
    //             });
    //         }
    //     });
    
    //     // Convert object to array of user objects
    //     const userImagesArray = Object.values(userImages);
    //     return userImagesArray;
    // }
    
    // // Test the function with your data
    // const userImagesArray = filterImagesByUser(result);
    // console.log(userImagesArray);
    // });
  
//     // Fetch additional data if needed
//     // const data = await fetchData();
  
//     return {
//       props: userImagesArray
//     }
//   }
  
//   function yourFunctionHit() {
//     // Make your function hit here
//     console.log("Function hit on page load");
//   }


import { PostsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="flex w-[70vw] h-full flex-grow">
          {/* <Posts /> */}
          <iframe src="https://hivestar-frontpage.vercel.app/" loading="lazy" width="100%" height="100%"></iframe> 

    </main>
  );
}

export default DashboardPage;

// pages/trending.tsx
// "use client"
// import React, { useEffect, useState } from 'react';
// import { Client } from '@hiveio/hive-js';

// const Dashboard: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);

//   useEffect(() => {
//     const client = new Client('https://api.hive.blog');

//     const fetchTrendingPosts = async (page: number) => {
//       try {
//         setLoading(true);
//         const result = await client.database.getDiscussions('trending', {
//           tag: '', // You can specify tags here if needed
//           limit: 10, // Limit the number of posts to fetch per page
//           start_author: '', // Use for pagination
//           start_permlink: '', // Use for pagination
//           truncate_body: 1,
//           observer: false,
//         });
//         setPosts(prevPosts => [...prevPosts, ...result]);
//         setPage(page + 1);
//       } catch (error) {
//         console.error('Error fetching trending posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrendingPosts(page);

//     // Cleanup function
//     return () => {
//       // Cleanup tasks if needed
//     };
//   }, [page]);

//   const handleScroll = () => {
//     const bottom =
//       Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
//     if (bottom && !loading) {
//       fetchTrendingPosts(page);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [page, loading]);

//   return (
//     <div>
//       
//       <ul>
//         {posts.map(post => (
//           <li key={post.permlink}>
//             <a href={`https://hive.blog${post.url}`}>{post.title}</a>
//           </li>
//         ))}
//       </ul>
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// };

// export default Dashboard;
