import { RETWEET_COLLECTION, TWEET_COLLECTION } from "@/firebase";
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
    // 이미 리트윗함
    // 리트윗한거 지우고, 리트윗 숫자 감소하기
    if (tweet.isRetweeted) {
      const q = query(
        RETWEET_COLLECTION,
        where("from_tweet_id", "==", tweet.id),
        where("uid", "==", store.state.user.uid)
      );
      const querySnapshot = await getDocs(q);
      await deleteDoc(doc(RETWEET_COLLECTION, querySnapshot.docs[0].id));
      const tweetsDoc = doc(TWEET_COLLECTION, tweet.id);
      await updateDoc(tweetsDoc, {
        num_retweets: increment(-1),
      });
    } else {
      // 리트윗 하지 않음
      const retweetsDoc = doc(RETWEET_COLLECTION);
      await setDoc(retweetsDoc, {
        id: retweetsDoc.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      });

      const tweetsDoc = doc(TWEET_COLLECTION, tweet.id);
      await updateDoc(tweetsDoc, {
        num_retweets: increment(1),
      });
    }
  } catch (err) {
    console.log("handle retweet error: ", err);
  }
};
