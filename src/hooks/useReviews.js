import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../graphql/mutations";
import { ME } from "../graphql/queries";

const useReviews = () => {
  const [addReview, { data, loading, error }] = useMutation(CREATE_REVIEW,  {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });
  const [
    deleteReviewMutation,
    {
      data: deleteReviewData,
      loading: deleteReviewLoading,
      error: deleteReviewError,
    },
  ] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });

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

  const deleteReview = async (id) => {
    try {
      const { data: mutationData } = await deleteReviewMutation({
        variables: {
          deleteReviewId: id,
        },
      });
      return mutationData?.deleteReview;
    } catch (err) {
      console.error("Error in deleteReview:", err);
      throw err;
    }
  };

  return { newReview, loading, error, deleteReview };
};

export default useReviews;
