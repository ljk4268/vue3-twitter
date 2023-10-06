import { TWEET_COLLECTION } from "@/firebase";
import { setDoc, doc } from "firebase/firestore";

export default (tweetBody, currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tweetDoc = doc(TWEET_COLLECTION);
      await setDoc(tweetDoc, {
        id: tweetDoc.id,
        tweet_body: tweetBody,
        uid: currentUser.uid,
        created_at: Date.now(),
        num_comments: 0,
        num_retweets: 0,
        num_likes: 0,
      });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
