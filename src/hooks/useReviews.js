import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReviews = () => {
  const [createReview, data] = useMutation(CREATE_REVIEW);
  console.log("useReviews", data);

  const createdReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = {
      ownerName,
      repositoryName,
      rating: Number(rating),
      text,
    };
    const { data } = await createReview({ variables: { review } });
    return data;
  };

  return [createdReview, data];
};

export default useReviews;
