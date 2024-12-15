from pydantic import BaseModel, Field, field_validator


class FeedbackError(BaseModel):
    """
    FeedbackError represents an error related to feedback processing.

    Attributes:
        message (str): A descriptive message about the error.
        rating_deducted (int): The amount of rating deducted due to the error.
                            Must be between 1 and 10 (inclusive).
    """

    message: str
    rating_deducted: int = Field(..., ge=1, le=10)


class FeedbackResponse(BaseModel):
    """
    FeedbackResponse model for handling feedback responses.

    Attributes:
        thoughts (list[str]): A list of thoughts or comments.
        total_rating (int): The total rating provided, must be between 1 and 10.
        errors (list[FeedbackError]): A list of feedback errors.

    Methods:
        check_rating(cls, errors: list[FeedbackError], values) -> list[FeedbackError]:
            Validates that the sum of rating deducted from errors equals 10 minus the total rating.
            Raises:
                ValueError: If the sum of rating deducted does not equal 10 minus the total rating.
    """

    thoughts: list[str]
    total_rating: int = Field(..., ge=1, le=10)
    errors = list[FeedbackError]

    @field_validator("errors")
    def check_rating(cls, errors: list[FeedbackError], values) -> list[FeedbackError]:
        """
        Validates that the sum of rating deducted from all feedback errors is equal to 10 minus the total rating.

        Args:
            cls: The class this method is bound to.
            errors (list[FeedbackError]): A list of feedback errors, each containing a rating_deducted attribute.
            values (dict): A dictionary containing the total_rating key.

        Returns:
            list[FeedbackError]: The original list of feedback errors if validation passes.

        Raises:
            ValueError: If the sum of rating deducted does not equal 10 minus the total rating.
        """
        total_rating = values.get("total_rating")
        if total_rating is not None:
            rating_deducted_sum = sum(error.rating_deducted for error in errors)
            if 10 - total_rating != rating_deducted_sum:
                raise ValueError(
                    "The sum of rating deducted must be equal to 10 - total_rating"
                )
        return errors
