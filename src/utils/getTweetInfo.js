import { USER_COLLECTION, RETWEET_COLLECTION, LIKE_COLLECTION } from "@/firebase";
import { doc, getDoc, getDocs, where, query } from "firebase/firestore";
import store from "@/store";

export default async (tweet, currentUser) => {
  // Adding user info
  const userDoc = await getDoc(doc(USER_COLLECTION, tweet.uid));
  // const { profile_image_url, email, username } = userDoc.data()
  // tweet.profile_image_url = profile_image_url
  // tweet.email = email
  // tweet.username = username
  tweet = { ...tweet, ...userDoc.data() };

  // Adding retweet info
  const q = query(
    RETWEET_COLLECTION,
    where("from_tweet_id", "==", tweet.id),
    where("uid", "==", currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    tweet.isRetweeted = false;
  } else {
    tweet.isRetweeted = true;
  }

  // Adding likes info
  const likesQuery = query(
    LIKE_COLLECTION,
    where("from_tweet_id", "==", tweet.id),
    where("uid", "==", currentUser.uid)
  );

  const likesQuerySnapshot = await getDocs(likesQuery);
  if (likesQuerySnapshot.empty) {
    tweet.isLiked = false;
  } else {
    tweet.isLiked = true;
  }

  return tweet;
};
