import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInContainer from "../../components/SignInContainer";

describe("SignInContainer", () => {
  it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      username: "",
      password: "",
    };
    render(
      <SignInContainer initialValues={initialValues} onSubmit={onSubmit} />
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signInButton = screen.getByText("Sign In");

    fireEvent.changeText(usernameInput, "kalle");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
