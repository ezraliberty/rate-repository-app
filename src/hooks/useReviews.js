import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReviews = () => {
  const [addReview, {data, loading, error}] = useMutation(CREATE_REVIEW);
  console.log("useReviews", data);

  const newReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data: mutationData } = await addReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      return mutationData?.createReview;
    } catch (err) {
      console.error("Error in newReview:", err);
      throw err;
    }
  };

  return {newReview, loading, error};
};

export default useReviews;
