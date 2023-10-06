import { LIKE_COLLECTION, TWEET_COLLECTION } from "@/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  where,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import store from "@/store";

export default async (tweet) => {
  try {
    // 이미 좋아요함
    // 좋아요한거 지우고, 좋아요 숫자 감소하기
    if (tweet.isLiked) {
      const q = query(
        LIKE_COLLECTION,
        where("from_tweet_id", "==", tweet.id),
        where("uid", "==", store.state.user.uid)
      );
      const querySnapshot = await getDocs(q);
      await deleteDoc(doc(LIKE_COLLECTION, querySnapshot.docs[0].id));
      const tweetsDoc = doc(TWEET_COLLECTION, tweet.id);
      await updateDoc(tweetsDoc, {
        num_likes: increment(-1),
      });
    } else {
      // 좋아요 하지 않음
      const retweetsDoc = doc(LIKE_COLLECTION);
      await setDoc(retweetsDoc, {
        id: retweetsDoc.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      });

      const tweetsDoc = doc(TWEET_COLLECTION, tweet.id);
      await updateDoc(tweetsDoc, {
        num_likes: increment(1),
      });
    }
  } catch (err) {
    console.log("handle likes error: ", err);
  }
};
